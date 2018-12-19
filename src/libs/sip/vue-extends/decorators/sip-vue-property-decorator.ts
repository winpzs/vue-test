import _ from 'lodash';
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';
import { VueClass } from 'vue-class-component/lib/declarations';
import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';
//https://github.com/vuejs/vue-class-component

//https://github.com/kaorun343/vue-property-decorator

export type SipMixin = ComponentOptions<Vue> | typeof Vue;

export interface SipVueComponentOptions<V extends Vue> extends ComponentOptions<V> {
}

export function SipVueComponent<V extends Vue>(options: SipVueComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC {
    return function (target: Function) {
        let prototype = target.prototype;
        options.mixins = (prototype._sip_mixins || []).concat(options.mixins || []);
        let componentFactory: any = Component(options);
        return componentFactory(target);
    };
    // return Component(options);
}

// export const SipVueComponent = Component;

export function SipGetMixins<V extends Vue>(target: any): SipVueComponentOptions<V>[] {
    return target._sip_mixins = (target._sip_mixins || []).slice();
}

let _lastTarget;
export function SipMixinLife(target: any, mixinkey: string, fn: Function) {
    let mixins = SipGetMixins(target);
    let newMixin: any = {};
    newMixin[mixinkey] = function () {
        let a = mixins;
        fn.apply(this, arguments);
    };
    if (_lastTarget !== target){
        mixins.push(newMixin);
        _lastTarget = target;
    }
    else {
        let len = mixins.length;
        if (len > 0) {
            let endMixin = mixins[len - 1];
            if (endMixin[mixinkey])
                mixins.push(newMixin);
            else
                Object.assign(endMixin, newMixin);
        } else
            mixins.push(newMixin);
    }
}

export function SipMixinExtend(target: any, propKey: string, mixinkey: string, content: any) {
    let mixins = SipGetMixins(target);
    let len = mixins.length;
    let newMixin = {};
    newMixin[mixinkey] = content;
    if (len == 0 || _lastTarget !== target) {
        mixins.push(newMixin);
        _lastTarget = target;
    } else {
        let endMixin = mixins[len - 1];
        Object.assign(endMixin, newMixin);
    }
}

export const SipVueProp = Prop;

export const SipVueModel = Model;

export const SipVueWatch = Watch;

export const SipVueEmit = Emit;

export const SipStoreState = State;

export const SipStoreGetter = Getter;

export const SipStoreAction = Action;

export const SipStoreMutation = Mutation;

export const SipVueProvide = Provide;

export const SipVueInject = Inject;


/**使用typescript的get set代替 */
// export function SipVueComputed(): PropertyDecorator {
//     return createDecorator(function(componentOptions, k) {
//         console.log('SipVueComputed', arguments);
//       (componentOptions.computed || (componentOptions.computed = {}) as any)[k] ={ get: function(){ return this[k].apply(this, arguments);} , set:function(){} }
//     })
//   }


/**
 * 
 * @param event 事件名称
 * @param el 是否绑定到el
 */
export function SipVueOn(event: string, el?: boolean): PropertyDecorator {
    let eventFnKey = ['_sip_vue_on', event].join('_');
    return function (target: any, propKey: string) {
        SipMixinLife(target, 'mounted', function () {
            let fn = function () {
                target[propKey].apply(this, arguments);
            }.bind(this);
            (this[eventFnKey] || (this[eventFnKey] = [])).push(fn);
            if (el === true) {
                this.$el.addEventListener(event, fn);
            } else {
                this.$on(event, fn);
            }
        });
        SipMixinLife(target, 'beforeDestroy', function () {
            let fns = this[eventFnKey];
            this[eventFnKey] = null;
            _.forEach(fns, function (fn) {
                if (el === true)
                    this.$el.removeEventListener(event, fn);
                else
                    this.$off(event, fn);
            }.bind(this));
        });
    };
}
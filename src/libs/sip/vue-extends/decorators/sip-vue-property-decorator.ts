import _ from 'lodash';
import Vue, { ComponentOptions } from 'vue';
import Component, { createDecorator } from 'vue-class-component';
import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';

//https://github.com/vuejs/vue-class-component

//https://github.com/kaorun343/vue-property-decorator


// export function SipVueComponent<V extends Vue>(options: SipVueComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC {
    
//     return Component(options);
// }

export type SipMixin = ComponentOptions<Vue> | typeof Vue;

export const SipVueComponent = Component;

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
    return createDecorator(function (componentOptions, k) {
        (componentOptions.mixins || (componentOptions.mixins = [])).push({
            mounted: function () {
                let fn = function () {
                    this[k].apply(this, arguments);
                }.bind(this);
                (this[eventFnKey] || (this[eventFnKey] = [])).push(fn);
                if (el === true) {
                    this.$el.addEventListener(event, fn);
                } else {
                    this.$on(event, fn);
                }
            },
            beforeDestroy() {
                let fns = this[eventFnKey];
                this[eventFnKey] = null;
                _.forEach(fns, function (fn) {
                    if (el === true)
                        this.$el.removeEventListener(event, fn);
                    else
                        this.$off(event, fn);
                }.bind(this));
            }
        });
    })
}
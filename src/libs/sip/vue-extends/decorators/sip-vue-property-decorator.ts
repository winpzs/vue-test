import { ComponentOptions } from 'vue';
import Component from 'vue-class-component';
import { VueClass } from 'vue-class-component/lib/declarations';
import { Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';
import { SipModule } from '../sip-module';

//https://github.com/vuejs/vue-class-component

//https://github.com/kaorun343/vue-property-decorator

export interface SipVueComponentOptions<V extends Vue> extends ComponentOptions<V> {
    modules?: SipModule[];
}

function mergeModuleOptions(options: SipVueComponentOptions<any>, modules: SipModule[]) {
    modules && modules.forEach(function (item) {
        Object.keys(item).forEach(function (prop) {
            if (prop == 'modules')
                mergeModuleOptions(options, item[prop]);
            else
                options[prop] = Object.assign({}, item[prop], options[prop]);
        });
    });

}

export function SipVueComponent<V extends Vue>(options: SipVueComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC {
    if (options.modules){
        mergeModuleOptions(options, options.modules);
        delete options.modules;
    }
    return Component(options);
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
import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation, State } from 'vuex-class';
//https://github.com/kaorun343/vue-property-decorator
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
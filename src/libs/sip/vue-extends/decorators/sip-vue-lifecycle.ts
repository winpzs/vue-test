import { $SipDoPreLoad } from "./sip-inject";
import { SipMixinLife } from "./sip-vue-property-decorator";

// const _vueHooks = [
//     'data',
//     'beforeCreate',
//     'created',
//     'beforeMount',
//     'mounted',
//     'beforeDestroy',
//     'destroyed',
//     'beforeUpdate',
//     'updated',
//     'activated',
//     'deactivated',
//     'render',
//     'errorCaptured' // 2.5
//   ];

// const _vueLifeHooks = [
//     'beforeCreate',
//     'created',
//     'beforeMount',
//     'mounted',
//     'beforeDestroy',
//     'destroyed',
//     'beforeUpdate',
//     'updated',
//     'activated',
//     'deactivated'
// ];

export function SipVueBeforeCreate() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'beforeCreate', target[propKey]);
    };
}

export function SipVueCreated() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'created', target[propKey]);
    };
}

export function SipVueBeforeMount() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'beforeMount', target[propKey]);
    };
}

export function SipVueMounted() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'mounted', target[propKey]);
    };
}


export function SipVueBeforeDestroy() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'beforeDestroy', target[propKey]);
    };
}
export function SipVueDestroyed() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'destroyed', target[propKey]);
    };
}
export function SipVueBeforeUpdate() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'beforeUpdate', target[propKey]);
    };
}
export function SipVueUpdated() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'updated', target[propKey]);
    };
}

export function SipVueActivated() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'activated', target[propKey]);
    };
}
export function SipVueDeactivated() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'deactivated', target[propKey]);
    };
}


let _promise;

export function SipInit() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'created', function () {
            _promise = Promise.all([_promise, $SipDoPreLoad(target, this)]);
            let component = this.$component;
            let fn = function(){
                _promise = null;
                component.$isInited = true;
                target[propKey].call(this);
                component.$emit('onInit');
            }.bind(this);
            _promise.then(fn, fn);
        });
    };
}


export function SipReady() {

    return function (target: any, propKey: string) {
        SipMixinLife(target, 'mounted', function () {
            let component = this.$component;
            component.$onInit(function(){
                component.$isReady = true;
                target[propKey].call(this);
                component.$emit('onReady');
            }.bind(this));
        });
    };
}
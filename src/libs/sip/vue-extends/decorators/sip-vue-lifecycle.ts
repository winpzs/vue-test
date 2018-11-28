import { SipDecorator } from "./sip-decorators";
import { $SipDoPreLoad } from "./sip-inject";

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

const _vueLifeHooks = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated'
];

function _hookTarget(target: any) {
    _vueLifeHooks.forEach(function (key) {
        if (key in target) target[key] = target[key];
    });
}

function _getVueLifeName(eventName: string, after?: boolean) {
    return ['_$sip_vuelife', eventName, after === true ? 'after' : ''].join('_')
};

/**_pushNgEvent(target, 'ngOnInit', target[propKey]) */
function _pushVueLife(target: any, eventName: string, newFn: Function, after?: boolean): any[] {
    _hookTarget(target);
    target[eventName] = function () {
        let args = Array.prototype.slice.call(arguments);
        _doLifecycle(target, this, eventName, args);
        _doLifecycle(target, this, eventName, args, true);
        if (eventName == 'destroyed') this.$isDestroyed = true;
    };
    let lifeName = _getVueLifeName(eventName, after);
    let lifeList = SipDecorator.getProp(target, lifeName) || [];
    lifeList = lifeList.concat(newFn);
    SipDecorator.setProp(target, lifeName, lifeList);
    return lifeList;
};

function _getVueLifes(target: any, eventName: string, after?: boolean): any[] {
    let lifeName = _getVueLifeName(eventName, after);
    return SipDecorator.getProp(target, lifeName);
};

function _doLifecycle(target: any, $this: any, eventName: string, args: any[], after?: boolean) {
    let evFns = _getVueLifes(target, eventName, after);
    evFns && evFns.forEach(function (fn) { return fn && fn.apply($this, args) });
}

export function SipVueBeforeCreate() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'beforeCreate', target[propKey]);
    };
}

export function SipVueCreated() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'created', target[propKey]);
    };
}

export function SipVueBeforeMount() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'beforeMount', target[propKey]);
    };
}

export function SipVueMounted() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'mounted', target[propKey]);
    };
}


export function SipVueBeforeDestroy() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'beforeDestroy', target[propKey]);
    };
}
export function SipVueDestroyed() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'destroyed', target[propKey]);
    };
}
export function SipVueBeforeUpdate() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'beforeUpdate', target[propKey]);
    };
}
export function SipVueUpdated() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'updated', target[propKey]);
    };
}

export function SipVueActivated() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'activated', target[propKey]);
    };
}
export function SipVueDeactivated() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'deactivated', target[propKey]);
    };
}


let _promise;

export function SipInit() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'created', function () {
            _promise = Promise.all([_promise, $SipDoPreLoad(target, this)]);
            let component = this.$component;
            let fn = function(){
                _promise = null;
                component.$isInited = true;
                target[propKey].call(this);
                component.$emit('onInit');
            }.bind(this);
            _promise.then(fn, fn);
        }, true);
    };
}


export function SipReady() {

    return function (target: any, propKey: string) {
        _pushVueLife(target, 'mounted', function () {
            let component = this.$component;
            component.$onInit(function(){
                component.$isReady = true;
                target[propKey].call(this);
                component.$emit('onReady');
            }.bind(this));
        }, true);
    };
}
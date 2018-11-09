import { SipDecorator } from "./sip-decorators";

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

let _hookTarget = function(target:any) {
    _vueLifeHooks.forEach(function(key){
        if (key in target) target[key] = target[key];
    });
}

let _getVueLifeName = function (eventName: string) {
    return ['_$sip_vuelife', eventName].join('_')
};

/**_pushNgEvent(target, 'ngOnInit', target[propKey]) */
let _pushVueLife = function (target: any, eventName: string, newFn: Function): any[] {
    _hookTarget(target);
    target[eventName] = function(){
        $SipDoLifecycle(target, this, eventName, Array.prototype.slice.call(arguments));
        if (eventName == 'destroyed') this.$isDestroyed = true;
    };
    let lifeName = _getVueLifeName(eventName);
    let lifeList = SipDecorator.getProp(target, lifeName) || [];
    lifeList = lifeList.concat(newFn);
    SipDecorator.setProp(target, lifeName, lifeList);
    return lifeList;
};

let _getVueLifes = function (target: any, eventName: string): any[] {
    let lifeName = _getVueLifeName(eventName);
    return SipDecorator.getProp(target, lifeName);
};

export function $SipDoLifecycle(target: any, $this:any, eventName: string, args?:any[]) {
    let evFns = _getVueLifes(target, eventName);
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
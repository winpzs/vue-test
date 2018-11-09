import { SipType } from "../../base/sip-type";

export interface SipInjectParams {
    /**注入组件(SipComponent) */
    component?: any;
    /**是否全局, 值为true时component属性无效 */
    global?: boolean;
}

export function SipInject(token: any, params?: SipInjectParams) {

    return function (target: any, propKey: string) {
        Object.defineProperty(target, propKey, {
            configurable: false,
            enumerable: true,
            get: function () {
                return this.$injector(token, params);
            }
        });
    };
}

/**可以注入 */
export interface SipInjectable {
    $injector: <T=any>(token: SipType<T>, params?: SipInjectParams) => T;
}

let _$sipInjectorKeys = [];
let _$sipInjectorCTs = [];

export function $SipInjectorGlobal<T=any>(token: SipType<T>): T {
    let index = _$sipInjectorKeys.indexOf(token);
    if (index >= 0)
        return _$sipInjectorCTs[index];
    else {
        let ct = new token();
        _$sipInjectorKeys.push(token);
        _$sipInjectorCTs.push(ct);
        return ct;
    }
}
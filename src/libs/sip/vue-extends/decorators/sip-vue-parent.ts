import Vue from "vue";
import { SipType } from "../../base/sip-type";

let undef;

export function $SipVueGetParent<T=any>(component: Vue, type: SipType<T>): T {
    let parent = component.$parent;
    return parent ? (parent instanceof type ? parent : $SipVueGetParent(parent, type)) : undef;
}

export function SipVueParent<T=any>(type: SipType<T>) {

    return function (target: any, propKey: string) {
        let caKey = '_$sip_parent_';
        Object.defineProperty(target, propKey, {
            configurable: false,
            enumerable: true,
            get: function () {
                let ca = this[caKey] || (this[caKey] = {});
                return ca[propKey] || (ca[propKey] = $SipVueGetParent(this, type));
            }
        });
    };
}

import { SipVueRouterLocation } from "./sip-vue-router-locaction";

export interface SipVueRouter {
    go: (index: number) => void;
    back:()=>void;
    forward:()=>void;
    push: (location: SipVueRouterLocation, onComplete?:Function, onAbort?:Function) => void;
    /**与push一样，但不产生 history 记录 */
    replace: (location: SipVueRouterLocation, onComplete?:Function, onAbort?:Function) => void;
    params: { [key: string]: any };
    onReady:(fn:Function, errorFn?:Function)=>void;
    onError:(errorFn:Function)=>void;
}
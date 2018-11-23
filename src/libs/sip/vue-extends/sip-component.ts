import Vue from "vue";
import { SipEventEmitter } from '../base/sip-event-emitter';
import { SipType } from "../base/sip-type";
import { SipHttpService } from "../http/sip-http.service";
import { SipVueCreated, SipVueDestroyed } from "./decorators";
import { $SipInjector } from "./decorators/sip-inject";
import { SipVueRouter } from "./sip-vue-router";

/**与vue交接 */
export class SipVue extends Vue {

    readonly $router: SipVueRouter;//VueRouter;

    readonly data: void;
    readonly props: void;
    readonly store: void;

    readonly beforeCreate: void;
    readonly created: void;
    readonly beforeMount: void;
    readonly mounted: void;
    readonly beforeDestroy: void;
    readonly destroyed: void;
    readonly beforeUpdate: void;
    readonly updated: void;
    readonly activated: void;
    readonly deactivated: void;

}

/**组件基础类 */
export class SipComponent extends SipVue {

    $isDestroyed = false;
    $isInited = false;
    $isCreated = false;

    get $component(): SipComponent {
        return this;
    };

    /**获取业务组件 */
    get $business(): SipBusinessComponent {
        return this.$injector(SipBusinessComponent);
        // let business = this instanceof SipBusinessComponent ? this : $SipVueGetParent(this, SipBusinessComponent);
        // return business;
    }

    $injector<T>(token: SipType<T>): T {
        return $SipInjector(this, token);
    }

    get $httpSrv(): SipHttpService {
        return this.$injector(SipHttpService);
    };

    //#region sipEvents


    get $sipEvents(): SipEventEmitter {
        return this['_$sipEvents'] || (this['_$sipEvents'] = new SipEventEmitter());
    }

    $onDestroyed(fn: () => void) {
        this.$sipEvents.once('$onDestroyed', fn);
    }

    $onCreated(fn: () => void) {
        if (this.$isCreated) return fn();
        this.$sipEvents.once('$onCreated', fn);
    }

    $onInit(fn: () => void) {
        if (this.$isInited) return fn();
        this.$sipEvents.once('$onInit', fn);
    }

    @SipVueCreated()
    private _sip_comp_Created() {
        this.$isCreated = true;
        this.$sipEvents.emit('$onCreated');
        //这里使用$httpSrv会出错？
        this.$httpSrv._preloadDone().then(() => {
            this.$isInited = true;
            this.$sipEvents.emit('$onInit');
        });
    }

    @SipVueDestroyed()
    private _sip_comp_destroyed() {
        this.$sipEvents.emit('$onDestroyed');
    }

    //#endregion sipEvents

}

/**业务组件基础类 */
export class SipBusinessComponent extends SipComponent {

}
import Vue from "vue";
import { SipHelper } from '../base/sip-helper';
import { SipType } from "../base/sip-type";
import { SipHttpService } from "../http/sip-http.service";
import { SipLoggerService } from '../logger/sip-logger.service';
import { SipVueDestroyed } from "./decorators";
import { $SipInjector } from "./decorators/sip-inject";
import { SipVueCurrentRoute } from './sip-vue-current-route';
import { SipVueRouter } from "./sip-vue-router";

let undef;

function _getComponentParent<T=any>(component: Vue, componentClass: SipType<T>): T {
    if (!component) return undef;
    let parent = component.$parent;
    return parent ? (parent instanceof componentClass ? parent : _getComponentParent(parent, componentClass)) : undef;
}

/**与vue交接 */
export class SipVue extends Vue {

    readonly $router: SipVueRouter;//VueRouter;

    get $currentRoute(): SipVueCurrentRoute {
        return this['$route'];
    }

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
    readonly computed: void;

}

/**组件基础类 */
export class SipComponent extends SipVue {

    readonly $isDestroyed = false;
    readonly $isInited = false;
    readonly $isReady = false;

    get $component(): SipComponent {
        return this;
    };

    /**获取业务组件 */
    get $business(): SipBusinessComponent {
        return this.$injector(SipBusinessComponent);
    }

    $closest<T=any>(componentClass: SipType<T>): T {
        return this instanceof componentClass ? this : (_getComponentParent(this, componentClass) as any);
    }

    $isComponentClass(componentClass: SipType) {
        return SipHelper.isClass(componentClass, SipComponent);
    }

    $injector<T>(token: SipType<T>): T {
        return $SipInjector(this, token);
    }

    get $http(): SipHttpService {
        return this.$injector(SipHttpService);
    };

    get $logger(): SipLoggerService {
        return this.$injector(SipLoggerService);
    };

    $open(path:string, params?:any, isMain?:boolean): Promise<any>{
        let root:any  = this.$root;
        if (root.$sipHome){
           return root.$sipHome.sipOpen(path);
        };
        return Promise.resolve();
    }

    //#region sipEvents

    $onDestroyed(fn: () => void) {
        if (this.$isDestroyed) return fn();
        this.$once('onDestroyed', fn);
    }

    $onInit(fn: () => void) {
        if (this.$isInited) return fn();
        this.$once('onInit', fn);
    }

    $onReady(fn: () => void) {
        if (this.$isReady) return fn();
        this.$once('onReady', fn);
    }

    @SipVueDestroyed()
    private _sip_comp_destroyed() {
        this.$emit('onDestroyed');
    }

    //#endregion sipEvents

}

/**业务组件基础类 */
export class SipBusinessComponent extends SipComponent {

    get $business(): SipBusinessComponent {
        return this;
    }

}
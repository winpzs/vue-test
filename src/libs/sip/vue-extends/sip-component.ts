import Vue from "vue";
import { SipHelper } from '../base/sip-helper';
import { SipType } from "../base/sip-type";
import { SipContextmenuItem } from "../components/contextmenu/sip-contextmenu-item";
import { SipHttpService } from "../http/sip-http.service";
import { SipLoggerService } from '../logger/sip-logger.service';
import { $SipInjector, $SipInjectorClear } from "./decorators/sip-inject";
import { SipVueBeforeDestroy, SipVueCreated, SipVueDestroyed, SipVueMounted } from './decorators/sip-vue-lifecycle';
import { SipAccessManager } from "./sip-access";
import { SipUiLink } from "./sip-ui-link";
import { SipVueCurrentRoute } from './sip-vue-current-route';
import { SipVueRouter } from "./sip-vue-router";

let undef;

function _getComponentParent<T=any>(component: Vue, componentClass: SipType<T>): T {
    if (!component) return undef;
    let parent = component.$parent;
    return parent ? (parent instanceof componentClass ? parent : _getComponentParent(parent, componentClass)) : undef;
}

export function SipClosestComponent<T=any>(owner: any, componentClass: SipType<T>): T {
    return owner instanceof componentClass ? owner : (_getComponentParent(owner, componentClass) as any);
}

/**与vue交接 */
export class SipVue extends Vue {

    readonly $router: SipVueRouter;//VueRouter;

    get $currentRoute(): SipVueCurrentRoute {
        return this['$route'];
    }

    get $vueName(): string {
        let vnode: any = this.$vnode;
        return vnode && vnode.componentOptions ? vnode.componentOptions.Ctor.options.name : '';
    }

    readonly data11: void;
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
        return SipClosestComponent(this, componentClass);
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

    $open(path: string, query?: any, params?: any): SipUiLink {
        let business = this.$business;
        if (business)
            return business.$open.apply(business, arguments);
        else {
            /**在navbar时没有business */
            let root: any = this.$root;
            root.$sipHome && root.$sipHome.sipOpen(this.$vueName, path, query, params, false);
        }
    }

    $send(...args: any[]) {
        this.$business && this.$business.$send(...args);
    }

    $close(...args: any[]) {
        this.$business && this.$business.$close(...args);
    }

    $showContextMenu(e:MouseEvent, items: SipContextmenuItem[]):boolean{
        let root: any = this.$root;
        return root.$sipHome && root.$sipHome.sipShowContextMenu(e, items);
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

    @SipVueBeforeDestroy()
    private _sip_comp_befordestroyed() {
        this.$emit('onDestroyed');
    }

    /**保留 */
    @SipVueDestroyed()
    private _sip_comp_destroyed() {
        $SipInjectorClear(this);
        this._$accessManager = null;
        let _this: any = this;
        _this.$isDestroyed = true;
    }

    @SipVueCreated()
    private _sip_comp_create() {

    }

    @SipVueMounted()
    private _sip_comp_monuted() {

    }

    // @SipInit()
    // private _sip_comp_init() {

    // }

    // @SipReady()
    // private _sip_comp_ready() {

    // }

    //#endregion sipEvents

    private _$accessManager: SipAccessManager;
    get $accessManager(): SipAccessManager {
        return this._$accessManager || (this._$accessManager = new SipAccessManager(this))
    }

}

export interface SipUiOpenOption {
    params?: any;
    query?: any;
    type?: 'page' | 'iframe' | 'modal';
    opener?: any;
}

/**业务组件基础类 */
export class SipBusinessComponent extends SipComponent {

    get $business(): SipBusinessComponent {
        return this;
    }

    $params<T=any>(defaultValue?: T): T {
        let route = this.$currentRoute;
        return Object.assign({}, defaultValue, route.params, route.query)
    }

    $uiLink: SipUiLink;

    get $page(): SipBusinessComponent {
        return this.$uiLink && this.$uiLink.page;
    }

    get $opener(): SipBusinessComponent {
        return this.$uiLink && this.$uiLink.opener;
    }

    $open(path: string, query?: any, options?: SipUiOpenOption): SipUiLink {
        return new SipUiLink(this);
    }

    $send(...args: any[]) {
    }

    $close(...args: any[]) {
    }

    $modal(path: string, params?: any, option?: SipUiOpenOption): SipUiLink {
        return new SipUiLink(this);
    }

}
import Vue from "vue";
import { SipVueRouter } from "./sip-vue-router";

/**与vue交接 */
export class SipVue extends Vue {

    readonly $router: SipVueRouter;//VueRouter;
    readonly $isDestroyed = false;

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

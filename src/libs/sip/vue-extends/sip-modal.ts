import { SipVueCreated, SipVueDestroyed } from "./decorators/sip-vue-lifecycle";
import { SipBusinessComponent, SipUiOpenOption } from "./sip-component";
import { SipPage } from "./sip-page";
import { SipGetModalLink, SipUiLink } from "./sip-ui-link";
import { SipVueCurrentRoute } from "./sip-vue-current-route";

export class SipModal extends SipBusinessComponent {

    get $page(): SipPage {
        return this.$uiLink && this.$uiLink.page;
    }

    get $currentRoute(): SipVueCurrentRoute {
        return this.$uiLink.route;
    }

    private _sip_modal_link: SipUiLink;
    public get $uiLink(): SipUiLink {
        return this._sip_modal_link || (this._sip_modal_link = SipGetModalLink());
    }

    @SipVueCreated()
    private _sip_modal_created() {
        this._sip_modal_link = SipGetModalLink();
    }

    @SipVueDestroyed()
    private _sip_modal_destroyed() {
        if (!this._sip_modal_closed) {
            this._sip_modal_closed = true;
            this._sip_modal_link && this.$send();
        };
        this._sip_modal_link = null;
    }


    $open(path: string, query?: any, option?: SipUiOpenOption): SipUiLink {
        return this.$page.$open(path, query, Object.assign({ opener: this }, option));
    }

    $send(...args: any[]) {
        let link = this._sip_modal_link;
        this._sip_modal_link && this._sip_modal_link.send(...args);
    }

    private _sip_modal_closed: boolean;
    $close(...args: any[]) {
        if (this._sip_modal_closed) return;
        this._sip_modal_closed = true;
        this._sip_modal_link && this.$send(...args);
        this.$emit('onClose');
    }

    $onClose(fn: () => void) {
        if (this._sip_modal_closed) return fn();
        this.$once('onClose', fn);
    }

    $modal(path: string, params?: any, option?: SipUiOpenOption): SipUiLink {
        return this.$page.$modal(path, params, Object.assign({ opener: this }, option));
    }

}
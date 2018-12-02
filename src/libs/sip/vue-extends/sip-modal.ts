import { SipBusinessComponent, SipUiOpenOption } from "./sip-component";
import { SipPage } from "./sip-page";
import { SipUiLink, SipGetLink, SipGetModalLink } from "./sip-ui-link";
import { SipVueCreated, SipVueDestroyed } from "./decorators/sip-vue-lifecycle";
import { SipVueCurrentRoute } from "./sip-vue-current-route";

export class SipModal extends SipBusinessComponent {
    
    
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
        this._sip_modal_link = null;
    }


    $open(path: string, query?: any, option?: SipUiOpenOption): SipUiLink {
        return this.$page.$open(path, query, option);
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
        this.$router.go(-1);
    }

    $modal(path: string, params?: any) : SipUiLink {
        return this.$page.$modal(path, params);
    }

}
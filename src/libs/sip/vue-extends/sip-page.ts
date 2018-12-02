import SipPageComponent from '../components/page/sip-page.component';
import { SipVueCreated, SipVueDestroyed } from './decorators/sip-vue-lifecycle';
import { SipBusinessComponent, SipUiOpenOption } from "./sip-component";
import { SipUiLink, SipGetLink, SipCreateLink, SipSetModalLink } from "./sip-ui-link";
import { SipVueCurrentRoute } from './sip-vue-current-route';


/**页面业务基础类 */
export class SipPage extends SipBusinessComponent {

    get $page(): SipPage {
        return this;
    }

    private _sip_page_link: SipUiLink;
    public get $uiLink(): SipUiLink {
        return this._sip_page_link;
    }

    @SipVueCreated()
    private _sip_page_created() {
        let query = this.$currentRoute.query;
        this._sip_page_link = SipGetLink(query && query._L);
    }

    @SipVueDestroyed()
    private _sip_page_destroyed() {
        this._sip_page_link = null;
    }

    get $pageComponent(): SipPageComponent {
        return this.$children[0] as any;
    }

    $open(path: string, query?: any, option?: SipUiOpenOption): SipUiLink {
        let root: any = this.$root;
        let link = SipCreateLink(this, this);
        query = Object.assign({
            _L: link.id
        }, option && option.query, query);
        root.$sipHome.sipOpen(this.$vueName, path, query, option && option.params, false);
        return link;
    }

    $send(...args: any[]) {
        let link = this._sip_page_link;
        this._sip_page_link && this._sip_page_link.send(...args);
    }

    private _sip_page_closed: boolean;
    $close(...args: any[]) {
        if (this._sip_page_closed) return;
        this._sip_page_closed = true;
        this._sip_page_link && this.$send(...args);
        this.$router.go(-1);
    }

    $modal(path: string, params?: any): SipUiLink {
        if (this.$modalLinkTemp) return new SipUiLink(this, this);
        return this.$modalLinkTemp = this.$open(path, params, { params: params, type: 'modal' });
    }

    $modalLinkTemp:any;
    $createModal(component: any, route: SipVueCurrentRoute) {
        if (component){
            let link = this.$modalLinkTemp;
            this.$modalLinkTemp = null;
            SipSetModalLink(link);
            link && link.setRoute(route);
            let pageComponent = this.$pageComponent;
            if (pageComponent) {
                pageComponent.setCompnent(component);
            }
        }
    }

}

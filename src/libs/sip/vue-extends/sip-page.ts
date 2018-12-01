import SipPageComponent from '../components/page/sip-page.component';
import { SipVueCreated, SipVueDestroyed } from './decorators/sip-vue-lifecycle';
import { SipBusinessComponent, SipPageOpenOption } from "./sip-component";
import { SipUiLink } from "./sip-ui-link";


let _links: SipUiLink[] = [];
function _createLink(opener: any, page?: any): SipUiLink {
    let link = new SipUiLink(opener, page);
    _links.push(link);
    return link;
}
function _getLink(id: number): SipUiLink {
    let index = _links.findIndex(function (item) {
        return item.id == id;
    });
    if (index >= 0) {
        let link = _links[index];
        if (_links.length == 1)
            _links = [];
        else {
            _links.splice(index, 1);
            _checkTimeoutLink();
        }
        return link;
    }
    return null;
}
function _checkTimeoutLink() {
    if (_links.length > 0) {
        let time = new Date().valueOf();
        _links = _links.filter(function (item) {
            return item.timeOut > time;
        });
    }
}

/**页面业务基础类 */
export class SipPage extends SipBusinessComponent {

    private _sip_page_link: SipUiLink;
    public get uiLink(): SipUiLink {
        return this._sip_page_link;
    }

    @SipVueCreated()
    private _sip_page_created() {
        let query = this.$currentRoute.query;
        this._sip_page_link = _getLink(query && query._L);
    }

    @SipVueDestroyed()
    private _sip_page_destroyed() {
        this._sip_page_link = null;
    }

    get $pageComponent(): SipPageComponent {
        return this.$children[0] as any;
    }

    $open(path: string, query?: any, option?: SipPageOpenOption): SipUiLink {
        let root: any = this.$root;
        let link = _createLink(this, this);
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

    $modal(component: any) {
        console.log('$modal', component);
        let pageComponent = this.$pageComponent;
        if (pageComponent) {
            pageComponent.setCompnent(component);
        }
    }


}

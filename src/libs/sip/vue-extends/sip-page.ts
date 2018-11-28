import { SipVueCreated } from "./decorators/sip-vue-lifecycle";
import { SipBusinessComponent } from "./sip-component";
import { SipPageLink } from "./sip-page-link";


let _links: SipPageLink[] = [];
function _createLink(): SipPageLink {
    let link = new SipPageLink();
    _links.push(link);
    return link;
}
function _getLink(id: number): SipPageLink {
    let index = _links.findIndex(function (item) {
        return item.id == id;
    });
    if (index >= 0) {
        let link = _links[index];
        if (_links.length == 1)
            _links = [];
        else{
            _links.splice(index, 1);
            _checkTimeoutLink();
        }
        return link;
    }
    return null;
}
function _checkTimeoutLink(){
    if (_links.length > 0){
        let time = new Date().valueOf();
        _links = _links.filter(function(item){
            return item.timeOut > time;
        });
    }
}

/**页面业务基础类 */
export class SipPage extends SipBusinessComponent {

    private $sipPageLink:SipPageLink;

    @SipVueCreated()
    private $sipPageCreated(){
        let query = this.$currentRoute.query;
        let _L = query && query._L;
        if (_L){
            this.$sipPageLink = _getLink(_L);
        }
    }

    $open(path: string, query?: any, params?: any): SipPageLink {
        let root: any = this.$root;
        let link = new SipPageLink();
        query = Object.assign({
            _L:link.id
        }, query);
        if (root.$sipHome) {
            return root.$sipHome.sipOpen(path, query, params, false);
        };
        return link;
    }

    $send(...args:any[]){
        let link = this.$sipPageLink;
        this.$sipPageLink.send(...args);
    }

    $close(...args:any[]) {
        this.$send(...args);
        this.$router.go(-1);
    }

}

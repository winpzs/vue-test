import _ from "lodash";
import { SipVueCurrentRoute } from "./sip-vue-current-route";

let _links: SipUiLink[] = [];
function _getId() {
    let i = 1;
    for (; i < 999; i++) {
        if (!_.find(_links, { id: i })) break;
    }
    return i;
}

export class SipUiLink {
    constructor(public readonly opener: any, public readonly page?: any) {
    }

    private _list = [];

    readonly id = _getId();

    readonly timeOut = new Date().valueOf() + 10000;

    private _route: SipVueCurrentRoute;
    get route(): SipVueCurrentRoute {
        return this._route;
    };

    setRoute(route: SipVueCurrentRoute) {
        if (this._route) return;
        this._route = route;
    }

    send(...args: any[]) {
        this._list.forEach(function (item) {
            item && item(...args);
        });
    }

    receive(callback: (...args: any[]) => void): SipUiLink {
        this._list.push(callback);
        return this;
    }
}

export function SipCreateLink(opener: any, page?: any): SipUiLink {
    let link = new SipUiLink(opener, page);
    _links.push(link);
    return link;
}

export function SipGetLink(id: number): SipUiLink {
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

let _modalLink: SipUiLink;
export function SipSetModalLink(uiLink: SipUiLink) {
    return _modalLink = uiLink;
}

export function SipGetModalLink() {
    let link = _modalLink;
    _modalLink = null;
    return link;
}


function _checkTimeoutLink() {
    if (_links.length > 0) {
        let time = new Date().valueOf();
        _links = _links.filter(function (item) {
            return item.timeOut > time;
        });
    }
}

import { SipHelper } from '../../base/sip-helper';
import { SipType } from "../../base/sip-type";
import { SipDecorator } from './sip-decorators';

export interface SipInjectableParams {
    /**
     * 注入到域，默认为business
     * root：根（全局）
     * business：业务组件（如page, modal）
     * component：组件
     * */
    scope?: 'business' | 'root' | 'component'
}

interface SipInjectableParamReturn extends SipInjectableParams {
    id?: number;
}

let _injectableKey = '_$SipInjectable';
function _getId() {
    let id = SipHelper.makeAutoId();
    return ['sipIJA', id].join('_');
}
function _makeinjectAbleParams(params?: SipInjectableParams): SipInjectableParamReturn {
    let p = Object.assign({
        id: _getId(),
        scope: 'business'
    }, params);
    return p;
}
function _checkInjectAbleParams(token: any): SipInjectableParamReturn {
    if (!(_injectableKey in token))
        token[_injectableKey] = _makeinjectAbleParams();
    return token[_injectableKey];
}

export function SipInjectable(params?: SipInjectableParams) {

    return function (constructor: any) {
        constructor[_injectableKey] = _makeinjectAbleParams(params);
    };

}
let _injectCPKey = '_$SipInjecComponent';

export function SipInject(token: any) {

    return function (target: any, propKey: string) {
        if (!SipHelper.isComponent(token) && _hasPreLoads(token)) {
            _pushPreLoad(target, propKey, token);
        }
        Object.defineProperty(target, propKey, {
            configurable: false,
            enumerable: true,
            get: function () {
                return $SipInjector(this, token);
            }
        });
    };
}

let undef;

function _getParentKey(id): string {
    return ['_$sip_parent_inject_', id].join('');
}

let _serviceKey = '_$SipInjectorServices';
export function $SipInjector<T=any>(owner: any, token: SipType<T>): T {

    let p = _checkInjectAbleParams(token);
    let id = p.id;
    let component: any;

    if (SipHelper.isComponent(token)) {
        component = owner.$component;
        if (component && component.$isComponentClass(token)) {
            let pKey = _getParentKey(id);
            if (pKey in component)
                return component[pKey];
            else {
                return component[pKey] = component.$closest(token);
            }
        }
        return undef;
    }

    switch (p.scope) {
        case 'component':
            component = owner.$component;
            break;
        case 'business':
            //如果没有business实例化到componet
            component = owner.$business || owner.$component;
            break;
        default:
            component = owner.$component && owner.$component.$root;
            break;
    }
    if (!component) component = owner;//如果没有component实例化到owner

    if (!component.hasOwnProperty(_serviceKey)) component[_serviceKey] = {};
    let _services = component[_serviceKey];
    return _services[id] || (_services[id] = new token(owner.$component));
}

export function $SipInjectorClear(owner:any){
    owner[_serviceKey] = {};
}

//#region PreLoad

interface PreLoadItem {
    type: 'preLoad' | 'service';
    propKey: string;
    token?: any;
}

let _preLoadName = '_$sip_preLoad';

function _pushPreLoad(target: any, propKey: string, token?: any): PreLoadItem[] {
    let proLoadList = SipDecorator.getProp(target, _preLoadName) || [];
    let item;
    if (!token)
        item = { type: 'preLoad', propKey: propKey };
    else {
        item = { type: 'service', propKey: propKey, token: token }
    }
    proLoadList = proLoadList.concat(item);
    SipDecorator.setProp(target, _preLoadName, proLoadList);
    return proLoadList;
};

function _getPreLoads(target: any): PreLoadItem[] {
    return SipDecorator.getProp(target, _preLoadName);
};

function _hasPreLoads(target: any): boolean {
    let list = _getPreLoads(target);
    return !!list && list.length > 0;
};

function _checkPreLoads(target: any): boolean {
    let key = '_$sip_preLoad_done';
    let isDone = target[key] === true;
    if (!isDone) target[key] = true;
    return isDone;
};


function _getPreLoadAll(target: any, $this: any): Promise<any>[] {
    let isDone = _checkPreLoads($this);
    if (isDone) return [];
    let preLoadList = _getPreLoads(target);
    if (preLoadList) {
        let list = [];
        preLoadList.forEach(function (item) {
            let propKey = item.propKey;
            switch (item.type) {
                case 'preLoad':
                    list.push($this[propKey]());
                    break;
                case 'service':
                    list = (_getPreLoadAll(item.token, $this[propKey]) || []).concat(list);
                    break;
            }
        });
        return list;
    }
}

export function $SipDoPreLoad(target: any, $this: any): Promise<any> {
    let preLoadList = _getPreLoadAll(target, $this) || [];
    return Promise.all(preLoadList);
}

export function SipPreload() {

    return function (target: any, propKey: string) {
        _pushPreLoad(target.constructor, propKey);
    };
}

    //#endregion region1542942549218

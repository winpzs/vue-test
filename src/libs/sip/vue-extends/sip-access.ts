import { SipHelper } from '../base/sip-helper';
import { SipPushVueLife } from "./decorators/sip-vue-lifecycle";


export interface SipAccessItemOption<T=any> {
    /**是否可以多个数据, 默认不处理 */
    multi?: boolean;
    /**是否要有数据, 默认false */
    hasData?: boolean;
    /**检查不通过时添加样式, 默认disabled */
    className?: string;
    /**
     * 检查数据
     * @param datas 传入的数据
     */
    check?: (data: T, target: any) => boolean;
}

export function SipAccessItem<T=any>(key: string, option: SipAccessItemOption<T>) {
    option = Object.assign({
        type: 'type',
        className: 'disabled'
    }, option);
    return function (target: any, propKey: string, descriptor: PropertyDescriptor) {
        let oldFn = target[propKey];
        descriptor.value = function () {
            let accessManager: SipAccessManager = this.$accessManager;
            if (accessManager) {
                if (accessManager.isAccess(key))
                    oldFn.apply(this, arguments);
            } else
                oldFn.apply(this, arguments);
        }
        SipPushVueLife(target, 'created', function () {
            let accessManager: SipAccessManager = this.$accessManager;
            if (accessManager) {
                accessManager.addAccessItem(key, option);
            }
        });
    };
}

export class SipAccessManager {

    constructor(private _component: any) {

    }

    private _data: any;
    public get data(): any {
        return this._data;
    }
    public set data(value: any) {
        this._data = value;
        this._component.$emit('_sip_access_manager_oncheck');
    }

    private _options: { [key: string]: SipAccessItemOption } = {};
    addAccessItem(key: string, option: SipAccessItemOption) {
        this._options[key] = option;
    }

    getAccessItem(key: string): SipAccessItemOption {
        return this._options[key];
    }

    isAccess(key: string): boolean {
        let option = this._options[key];
        if (option) {
            let has = true;
            let data = this._data;
            let isArray = SipHelper.isArray(data);
            if (option.hasData) {
                if (isArray) {
                    has = data && data.length > 0;
                    if (has && ('multi' in option)) {
                        has = data.length <= (option.multi ? Number.MAX_VALUE : 1)
                    }
                } else {
                    has = !!data;
                }
            }
            if (has && option.check)
                has = option.check(data, this._component);
            return has;
        } else
            return false;
    }


    onCheck(fn: () => void) {
        this._component.$on('_sip_access_manager_oncheck', fn);
    }

    removeCheck(fn: () => void) {
        this._component.$off('_sip_access_manager_oncheck', fn);
    }
}
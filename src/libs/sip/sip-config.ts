import { SipLoggerLevel } from "./logger/sip-logger-level";
import { SipLoggerOptions } from "./logger/sip-logger-options";

/** sip配置 */
export class SipConfig {

    /** 当前环境：开发 | 产品(发布) | 测试 */
    static readonly env: 'development' | 'production' | 'testing' = process.env.NODE_ENV as any;

    /** logger */
    static loggerOptions: SipLoggerOptions = {
        level: process.env.NODE_ENV == 'production' ? SipLoggerLevel.WARN : SipLoggerLevel.LOG,
        global: true,
        globalAs: "sipLogger"
    };

    /** sip-access 处理Dom */
    static accessDisabled(el: HTMLElement, type: 'disabled' | 'hide', disabled: boolean) {
        let className: string;
        if (type == 'hide') {
            className = 'sip-access-hide';
        } else {
            className = 'sip-access-disabled';
            el['disabled'] = disabled;
            // if (el.classList.contains('ivu-dropdown-item'))
            //     className = 'ivu-dropdown-item-disabled'
            // else
            //     className = 'disabled';
        }
        el.classList.toggle(className, disabled);
    }

    /** tableManager 默认配置 */
    static table = {
        /**页面记录数选择项 */
        pageSizeOpts: [10, 20, 30, 40, 50],
        /**页面记录数 */
        pageSize: 10,
        /**是否多选 */
        multipleSelection: true,
        /**选择方式, select：选择模式，normal正常操作 */
        selectMode: 'normal' //'select' | 'normal'
    };
}
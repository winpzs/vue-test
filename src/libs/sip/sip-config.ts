import { SipLoggerLevel } from "./logger/sip-logger-level";
import { SipLoggerOptions } from "./logger/sip-logger-options";


export class SipConfig {

    static readonly env: 'development' | 'production' | 'testing' = process.env.NODE_ENV as any;

    static loggerOptions: SipLoggerOptions = {
        level: process.env.NODE_ENV == 'production' ? SipLoggerLevel.WARN : SipLoggerLevel.LOG,
        global: true,
        globalAs: "sipLogger"
    };

    /** */
    static accessDisabled(el: HTMLElement, type: 'disabled' | 'hide', disabled: boolean) {
        let className:string;
        if (type == 'hide') {
            className = 'sip-access-hide';
        } else {
            // className = 'sip-access-disabled';
            el['disabled'] = disabled;
            if (el.classList.contains('ivu-dropdown-item'))
                className = 'ivu-dropdown-item-disabled'
            else
                className = 'disabled';
        }
        if (disabled)
            el.classList.add(className);
        else
            el.classList.remove(className);
    }
}
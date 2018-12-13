import _ from 'lodash';
import { SipValidatorDescriptor, SipValidatorDescriptorItem, SipValidatorFunction, SipValidatorRule } from './vue-extends/sip-validator-descriptor';

export class SipValidator {
    static createDescriptor(p: SipValidatorDescriptor, trigger: 'change' | 'blur' = 'change'): SipValidatorDescriptor {
        let descriptor = {};
        _.forEach(p, function (rule, key) {
            if (_.isArray(rule)) {
                let newRule: SipValidatorRule = {};
                let validators = [];
                _.forEach(rule, function (ruleItem: SipValidatorRule) {
                    if (_.isFunction(ruleItem))
                        validators.push(ruleItem);
                    else {
                        if (ruleItem.validator) validators.push(ruleItem.validator);
                        _.assign(newRule, ruleItem);
                    }
                });
                if (validators.length > 0) {
                    //合并处理validator
                    newRule.validator = SipValidator.mergeValidatorFunction(validators, newRule.message);
                }
                if (!newRule['trigger']) newRule['trigger'] = trigger;
                descriptor[key] = newRule;
            }
            else {
                if (!rule['trigger']) rule['trigger'] = trigger;
                descriptor[key] = rule;
            }
        });
        return descriptor;
    }

    static mergeValidatorFunction(args: any[], err?: string): SipValidatorFunction {
        let len = args.length;
        return function (rule, value, callback, source, options) {
            let pos = len;
            let errList = [];
            _.forEach(args, function (fn) {
                if (rule.cancel === true) return;
                fn(rule, value, function (errItem?: any) {
                    pos--;
                    !!errItem && errList.push(_.isString(errItem) ? errItem : errItem.message);
                    // console.log('rule', rule);
                    if (pos == 0 || rule.cancel === true) {
                        if (errList.length > 0)
                            callback.call(this, new Error(err || errList.join(', ')));
                        else
                            callback.call(this);
                    }
                }, source, options);
            });
        };
    }

    static required(err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (_.toString(value).length == 0)
                callback(err || `必填`);
            else
                callback();
        }
    }


    static min(min: number, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (!_.inRange(value, min))
                callback(err || `最小值${min}`);
            else
                callback();
        }
    }

    static max(max: number, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (!_.inRange(value, Number.MIN_VALUE, max))
                callback(err || `最大值${max}`);
            else
                callback();
        }
    }

    static range(min: number, max: number, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (!_.inRange(value, min, max))
                callback(err || `范围为${min}到${max}`);
            else
                callback();
        }
    }

    static minLen(min: number, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (len < min)
                callback(err || `最小长度${min}`);
            else
                callback();
        }
    }

    static maxLen(max: number, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (len > max)
                callback(err || `最大长度${max}`);
            else
                callback();
        }
    }

    static len(min: number, max: number, err?: string): SipValidatorDescriptorItem {
        return SipValidator.mergeValidatorFunction([
            SipValidator.minLen(min),
            SipValidator.maxLen(max)
        ], err || `长度为${min}到${max}`);
    }

    /** 设置验证失败提示内容 */
    static message(message: string): SipValidatorDescriptorItem {
        return {
            message: message
        };
    }

    /** 取消后面的验证 */
    static cancel(cancel: (value) => boolean): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            rule.cancel = cancel(value);
            callback();
        }
    }

    /** 等于 */
    static equal(fn: () => any, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            let newValue = fn();
            if (!_.isEqual(value, newValue))
                callback(err || '不等于' + newValue);
            else
                callback();
        }
    }

    static pattern(pattern: RegExp, err?: string): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (!pattern.test(value))
                callback(err || '配置' + pattern.source);
            else
                callback();
        }
    }

    static email(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"), err || '必须为Email');
    }

    /** 整数 */
    static integer(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/^[0-9]+(.[0-9]{1,})?$/, err || '必须为整数');
    }

    /** 数字 */
    static digit(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/^[0-9]+$/, err || '必须为数字');
    }

    /** 中文 */
    static chinese(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/^[\u0391-\uFFE5]+$/, err || '必须为中文');
    }

    static url(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i, err || '必须为URL');
    }

    
    /** 身份证 */
    static identity(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/\d{15}|\d{18}/, err || '必须为身份证');
    }
    
    /** 不允许输入字母和数字之外的特殊字符 */
    static password(err?: string): SipValidatorDescriptorItem {
        return SipValidator.pattern(/^[0-9a-zA-Z\-\.+!@#$%\^&*~]+$/, err || '不允许输入字母和数字之外的特殊字符');
    }

}

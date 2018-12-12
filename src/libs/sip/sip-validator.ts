import _ from 'lodash';
import { SipValidatorDescriptor, SipValidatorDescriptorItem, SipValidatorRule, SipValidatorType } from './vue-extends/sip-validator-descriptor';

export class SipValidator {
    static create(p: SipValidatorDescriptor, trigger:'change' | 'blur' = 'change'): SipValidatorDescriptor {
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
                    newRule.validator = function (rule, value, callback, source, options) {
                        let isError = false;
                        _.forEach(validators, function (fn) {
                            if (!isError) {
                                fn(rule, value, function (err?: any) {
                                    isError = !!err;
                                    callback.apply(this, arguments);
                                }, source, options);
                            }
                        });
                    };
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

    static required(): SipValidatorDescriptorItem {
        return {
            required: true
        };
    }

    static min(min: number): SipValidatorDescriptorItem {
        return {
            min: min
        };
    }

    static max(max: number): SipValidatorDescriptorItem {
        return {
            max: max
        };
    }

    static len(min: number, max: number): SipValidatorDescriptorItem {
        if (arguments.length <= 1) max = Number.MAX_VALUE;
        return function (rule, value, callback, source, options) {
            let len = _.toString(value).length;
            if (len < min || len > max)
                callback(new Error(rule.message || `长度为${min}到${max}`));
            else
                callback();
        }
    }

    static range(min: number, max: number): SipValidatorDescriptorItem {
        if (arguments.length <= 1) max = Number.MAX_VALUE;
        return function (rule, value, callback, source, options) {
            let num = _.toNumber(value);
            if (num < min || num > max)
                callback(new Error(rule.message || `范围为${min}到${max}`));
            else
                callback();
        }
    }

    static message(message: string): SipValidatorDescriptorItem {
        return {
            message: message
        };
    }

    static type(type: SipValidatorType): SipValidatorDescriptorItem {
        return {
            type: type
        };
    }

    static email(): SipValidatorDescriptorItem {
        return SipValidator.type('email');
    }

    static pattern(pattern: RegExp): SipValidatorDescriptorItem {
        return {
            pattern: pattern
        };
    }

    /** 整数 */
    static integer(): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (!/^[0-9]+(.[0-9]{1,})?$/.test(value))
                callback(new Error(rule.message || '必须为整数'));
            else
                callback();
        }
    }

    /** 数字 */
    static digit(): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (!/^[0-9]+$/.test(value))
                callback(new Error(rule.message || '必须为数字'));
            else
                callback();
        }
    }


    /** 中文 */
    static chinese(): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (!/^[\u0391-\uFFE5]+$/.test(value))
                callback(new Error(rule.message || '必须为中文'));
            else
                callback();
        }
    }
    
    static url(): SipValidatorDescriptorItem {
        return function (rule, value, callback, source, options) {
            if (!/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(value))
                callback(new Error(rule.message || '必须为URL'));
            else
                callback();
        }
    }
}
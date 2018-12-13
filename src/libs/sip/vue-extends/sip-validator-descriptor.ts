
export type SipValidatorType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';

export type SipValidatorFunction = (rule: SipValidatorRule, value: any, callback: (error?: Error | Error[] | string) => void, source?: any, options?: any) => void;

export interface SipValidatorRule {
    /** 类型，默认string */
    type?: SipValidatorType
    required?: boolean;
    pattern?: RegExp;
    /** 使用类型 string | array | number */
    min?: number;
    /** 使用类型 string | array | number */
    max?: number;
    /** 使用类型 string 或 array */
    len?: number;
    /** 取消验证 */
    cancel?:boolean;
    /** 使用类型 enum  */
    enum?: any[];
    /** 验证前转换值 */
    transform?: <T>(value: T) => T;
    /** 错误信息 */
    message?: string;
    /**
     * 自定义验证内容
     * @param rule 规则
     * @param value 值
     * @param callback 验证结果
     * @param source 数据源
     * @param options 参数
     */
    validator?: SipValidatorFunction;
}

export type SipValidatorDescriptorItem = SipValidatorRule | SipValidatorFunction;

export interface SipValidatorDescriptor {
    [key: string]: SipValidatorDescriptorItem | SipValidatorDescriptorItem[];
}
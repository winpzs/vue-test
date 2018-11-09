export interface SipType<T=any> extends Function {
    new (...args: any[]): T;
}
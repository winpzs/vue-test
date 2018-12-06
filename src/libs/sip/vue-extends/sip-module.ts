import { AsyncComponent, Component, DirectiveFunction, DirectiveOptions } from "vue";

export interface SipModuleOption {

    directives?: { [key: string]: DirectiveFunction | DirectiveOptions };
    components?: { [key: string]: Component<any, any, any, any> | AsyncComponent<any, any, any, any> };
    transitions?: { [key: string]: object };
    filters?: { [key: string]: Function };
    modules?: SipModule[];
}

export class SipModule implements SipModuleOption {

    constructor(option: SipModuleOption) {
        Object.assign(this, option);
    }
}
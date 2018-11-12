import { SipBusinessComponent, SipComponent } from './sip-component';

export class SipService {

    constructor(public readonly $componet:SipComponent){

    }

    /**获取业务组件 */
    get $business(): SipBusinessComponent {
        return this.$componet ? this.$componet.$business : null;
    }
    
}

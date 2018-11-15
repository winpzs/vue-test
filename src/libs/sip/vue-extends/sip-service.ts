import { SipBusinessComponent, SipComponent } from './sip-component';
import { SipType } from '../base/sip-type';
import { $SipInjector } from './decorators/sip-inject';

export class SipService {

    constructor(public readonly $componet: SipComponent) {

    }

    /**获取业务组件 */
    get $business(): SipBusinessComponent {
        return this.$componet ? this.$componet.$business : null;
    }

    $injector<T>(token: SipType<T>): T {
        return $SipInjector(this, token);
    }

}

import { SipInjectable } from "../vue-extends/decorators/sip-inject";
import { SipServiceBase } from "../vue-extends/sip-service-base";

@SipInjectable({ scope: 'root' })
export class SipLoggerService extends SipServiceBase {
}
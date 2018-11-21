import { SipHttpService } from '../http/sip-http.service';
import { SipInject } from './decorators/sip-inject';
import { SipServiceBase } from './sip-service-base';

export class SipService extends SipServiceBase {

    @SipInject(SipHttpService)
    $httpSrv:SipHttpService;

}

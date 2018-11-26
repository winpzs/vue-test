import { SipHttpService } from '../http/sip-http.service';
import { SipLoggerService } from '../logger/sip-logger.service';
import { SipServiceBase } from './sip-service-base';

export class SipService extends SipServiceBase {

    get $httpSrv(): SipHttpService {
        return this.$injector(SipHttpService);
    };

    get $logger(): SipLoggerService {
        return this.$injector(SipLoggerService);
    };
}

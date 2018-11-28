import { SipInject, SipPage, SipVueComponent, SipVueCreated } from '@libs/sip';
import { Service1 } from './shared/services/serivce1';

@SipVueComponent({})
export default class TestService extends SipPage {
    name = "TestService"

    @SipInject(Service1)
    srvs1:Service1

    @SipInject(Service1)
    srvs2:Service1

    @SipVueCreated()
    init(){
        this.$logger.debug('service1', this.srvs1);

    }
}
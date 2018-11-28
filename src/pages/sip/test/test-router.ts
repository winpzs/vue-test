import { SharedComponents, SipInit, SipPage, SipVueComponent, SipVueCreated } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SharedComponents
    }
})
export default class TestRouter extends SipPage {
    name = "TestRouter";

    @SipInit()
    private init() {
        this.$logger.debug('init', this.$router, this.$currentRoute, this);
    }

    @SipVueCreated()
    private testCreate() {
        // this.$logger.debug('created', this);
    }

    testOpen(){
        this.$open('/pages/sip/test/test-http', null, false);
    }

}
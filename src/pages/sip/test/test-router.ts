import { SipInit, SipPage, SipVueCreated } from '@libs/sip';
import { SharedComponents } from '@libs/sip/components';
import Component from 'vue-class-component';

@Component({
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
        this.$open('/pages/sip/test/test-http');
    }

}
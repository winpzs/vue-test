import { SipAccessItem, SipInit, SipLibComponents, SipLibDirectives, SipPage, SipVueComponent, SipVueCreated } from '@libs/sip';

@SipVueComponent({
    components: {
        ...SipLibComponents
    },
    directives: {
        ...SipLibDirectives
    }
})
export default class TestRouter extends SipPage {
    name = "TestRouter";

    access = false;

    @SipInit()
    private init() {
        setTimeout(() => {
            this.access = true;
        this.$accessManager.datas = [{}, {}];
        this.ok();
    }, 5000);
        this.$accessManager.datas = [{}];
        this.$logger.debug('init', this.$router, this.$currentRoute, this);
    }

    @SipVueCreated()
    private testCreate() {
        // this.$logger.debug('created', this);
    }

    testOpen() {

        this.$open('/pages/sip/test/test-http', null).receive((r) => {
            console.log('r', r);
        });
    }

    @SipAccessItem('ok', {
        hasData:true,
        multi:false,
        check(data, target) {
            console.log('ok', data)
            return true;
        }
    })
    ok() {
        this.$logger.debug('ok!!!!!!')
    }

}
import { SipLibComponents, SipModal, SipVueComponent, SipVueCreated } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SipLibComponents
    }
})
export default class TestModal1 extends SipModal {
    name = "TestModal1";
    desc = "TestModal1 Desc";

    @SipVueCreated()
    private create(){
        this.$logger.debug('create', this.$uiLink, this);
    }

    ok(){
        this.$close('ok !!!!');
    }

}
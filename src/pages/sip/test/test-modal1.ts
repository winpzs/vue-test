import { SharedComponents, SipVueComponent, SipModal, SipVueCreated } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SharedComponents
    }
})
export default class TestModal1 extends SipModal {
    name = "TestModal1";
    desc = "TestModal1 Desc";

    modal1 = false;

    @SipVueCreated()
    private create(){
        this.$logger.debug('create', this.$uiLink, this);
    }

    open(){
        this.modal1 = true;
    }

}
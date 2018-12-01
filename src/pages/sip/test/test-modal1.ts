import { SharedComponents, SipVueComponent, SipModal } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SharedComponents
    }
})
export default class TestModal1 extends SipModal {
    name = "TestModal";
    desc = "TestModal Desc";

    modal1 = false;

    open(){
        this.modal1 = true;
    }

}
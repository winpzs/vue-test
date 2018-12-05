import { SipPage, SipSharedComponents, SipVueComponent } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SipSharedComponents
    }
})
export default class TestModal2 extends SipPage {
    name = "TestModal";
    desc = "TestModal Desc";

    modal1 = false;

    open(){
        this.modal1 = true;
    }

}
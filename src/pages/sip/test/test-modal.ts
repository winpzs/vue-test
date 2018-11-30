import { SharedComponents, SipPage, SipVueComponent } from '@libs/sip';

@SipVueComponent({
    components:{
        ...SharedComponents
    }
})
export default class TestModal extends SipPage {
    name = "TestModal";
    desc = "TestModal Desc";

    modal1 = false;

    open(){
        this.modal1 = true;
    }

}
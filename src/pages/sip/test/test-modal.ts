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

    i = 1;
    open(){
        this.$logger.debug(this);
        // this.has = true;
        // this.modal1 = true;
        // console.log('open')
        this.$modal(require('./test-modal1.vue'));
        // if (this.i % 2 == 1)
        // this.$modal(require('./test-modal1.vue'));
        // else
        // this.$modal(require('./test-modal2.vue'));
        // this.i++
    }

    has = true;
    onClose(){
        setTimeout(()=>{
            console.log('onClose')
            this.has = false;
    
        }, 1000);
    }


}
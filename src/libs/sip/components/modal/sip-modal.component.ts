import { SipVueComponent, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';
import asyncLoadComp from '../asyncLoadComp.vue';


@SipVueComponent({
    components:{
        asyncLoadComp
    }
})
export default class SipModalComponent extends SipComponent {
    show = true;

    maskClosable = false;

    @SipVueProp({type:[Number, String], default: 700})
    width:number;

    onClose(){
        setTimeout(()=>{
            this.$destroy();

        }, 500);
    }

}
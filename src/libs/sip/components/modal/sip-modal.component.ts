import { SipVueCreated } from '../../vue-extends/decorators/sip-vue-lifecycle';
import { SipVueComponent, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class SipModalComponent extends SipComponent {
    show = true;

    maskClosable = false;

    @SipVueProp({type:[Number, String], default: 700})
    width:number;

    @SipVueCreated()
    private test(){
        this.$slots.test = [this.$createElement('div', {domProps:{innerText:'test'}})];
        this.$logger.debug(this);
    }
}
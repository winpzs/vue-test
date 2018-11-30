import { SipVueComponent, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class SipModalBodyComponent extends SipComponent {

    @SipVueProp({type:[Number, String], default: 300})
    height:number;
}
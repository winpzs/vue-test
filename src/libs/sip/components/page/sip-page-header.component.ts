import Component from 'vue-class-component';
import { SipVueProp } from '../../vue-extends';
import { SipComponent } from '../../vue-extends/sip-component';

@Component({})
export default class SipPageHeaderComponent extends SipComponent {

    @SipVueProp({
        type:Boolean,
        default:false
    })
    showBack:boolean;

    back(){
        this.$router.go(-1);
    }

}
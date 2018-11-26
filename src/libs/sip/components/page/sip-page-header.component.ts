import Component from 'vue-class-component';
import { SipInit } from '../../vue-extends/decorators/sip-vue-lifecycle';
import { SipComponent } from '../../vue-extends/sip-component';

@Component({
    props:{
        showBack:{
            type:Boolean,
            default:true
        }
    }
})
export default class SipPageHeaderComponent extends SipComponent {
    get title(){
        console.log(this.$slots);
        return this.$slots.default
    }

    
    @SipInit()
    private init() {
        this.$logger.debug('slot', this.$slots);
    }

}
import { SipVueComponent, SipVueWatch } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class SipModalFooterComponent extends SipComponent {

    @SipVueWatch('$slots.default', { immediate: true, deep: false })
    private change(val){
        this.$parent.$slots.footer = [this.$createElement('div',val)];
    }
}
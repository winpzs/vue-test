import { SipVueComponent, SipVueWatch } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class SipModalHeaderComponent extends SipComponent {

    @SipVueWatch('$slots.default', { immediate: true, deep: false })
    private change(val){
        this.$parent.$slots.header = [this.$createElement('div',{
            class:'ivu-modal-header-inner'
        }, val)];
    }

}
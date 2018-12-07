import { SipVueComponent, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class  SipTableFormatterComponent extends SipComponent {

    @SipVueProp(String) column:string;

    $sipTableSlotScope(params:any){
        return this.$scopedSlots.default(params);
    }

}
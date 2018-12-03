import { SipInject } from '../../vue-extends/decorators/sip-inject';
import { SipVueCreated } from '../../vue-extends/decorators/sip-vue-lifecycle';
import { SipVueComponent, SipVueProp, SipVueWatch } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';
import { SipModal } from '../../vue-extends/sip-modal';
import asyncLoadComp from '../asyncLoadComp.vue';


@SipVueComponent({
    components: {
        asyncLoadComp
    }
})
export default class SipModalComponent extends SipComponent {
    show = true;

    maskClosable = false;

    @SipVueProp({ type: [Number, String], default: 700 })
    width: number;

    @SipInject(SipModal)
    private _sipModal: SipModal;

    @SipVueCreated()
    private _create() {
        if (this._sipModal) {
            this._sipModal.$onClose(() => {
                this.show = false;
            });
        }
    }


    @SipVueWatch('show', { immediate: true })
    private _changeShow(value) {
        if (!value) {
            this.close();
        }
    }

    private _isClose = false;
    close() {
        if (this._isClose) return;
        this._isClose = true;
        setTimeout(() => {
            let modal = this._sipModal
            this.$destroy();
            modal && modal.$destroy();
        }, 500);
    }

    onClose() {
        this.close();
    }

}
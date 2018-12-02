import { SipVueComponent } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';
import asyncLoadComp from '../asyncLoadComp.vue';

@SipVueComponent({
    components: {
        asyncLoadComp
    }
})
export default class SipPageComponent extends SipComponent {

    components = [];

    setCompnent(component: any, params?: any) {
        this.components.push({ cp: component, params: params });
    }
}
import { SipVueComponent } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
export default class SipPageToolbarComponent extends SipComponent {

    components = [];

    setCompnent(component: any, params?: any) {
        this.components.push({ cp: component, params: params });
    }
}
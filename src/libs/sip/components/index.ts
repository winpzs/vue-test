import SipPageBodyComponent from './page/sip-page-body.component';
import SipPageBody from "./page/sip-page-body.component.vue";
import SipPageHeaderComponent from './page/sip-page-header.component';
import SipPageHeader from "./page/sip-page-header.component.vue";
import SipPageComponent from "./page/sip-page.component";
import SipPage from "./page/sip-page.component.vue";

export { SipPageComponent, SipPageHeaderComponent, SipPageBodyComponent };

export const SharedComponents = {
    'sip-page': SipPage,
    'sip-page-header': SipPageHeader,
    'sip-page-body': SipPageBody
};

import SipContextmenuComponent from "./contextmenu/sip-contextmenu.component";
import SipContextmenu from "./contextmenu/sip-contextmenu.component.vue";
import { SipHookModelRouter } from "./modal/sip-hook-model-router";
import SipModalBody from "./modal/sip-modal-body.component.vue";
import SipModalFooter from "./modal/sip-modal-footer.component.vue";
import SipModalHeader from "./modal/sip-modal-header.component.vue";
import SipModal from "./modal/sip-modal.component.vue";
import SipPageBodyComponent from './page/sip-page-body.component';
import SipPageBody from "./page/sip-page-body.component.vue";
import SipPageHeaderComponent from './page/sip-page-header.component';
import SipPageHeader from "./page/sip-page-header.component.vue";
import SipPageToolbar from "./page/sip-page-toolbar.component.vue";
import SipPageComponent from "./page/sip-page.component";
import SipPage from "./page/sip-page.component.vue";
import { SipTableComponents } from "./table";

export * from './contextmenu/sip-contextmenu-item';
export * from './table';
export { SipPageComponent, SipPageHeaderComponent, SipPageBodyComponent, SipHookModelRouter, SipContextmenuComponent };

export const SipLibComponents = {
    'sip-page': SipPage,
    'sip-page-toolbar': SipPageToolbar,
    'sip-page-header': SipPageHeader,
    'sip-page-body': SipPageBody,
    'sip-modal': SipModal,
    'sip-modal-header': SipModalHeader,
    'sip-modal-body': SipModalBody,
    'sip-modal-footer': SipModalFooter,
    'sip-contextmenu': SipContextmenu,
    ...SipTableComponents
};

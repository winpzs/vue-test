import { SipModule, SipSharedModule } from "@libs/sip";
// import g2Line from './components/g2-line.component.vue';

export const DemoSharedModule = new SipModule({
    modules: [SipSharedModule],
    components: {
        // 'g2-line':g2Line
    },
    directives: {

    }
});
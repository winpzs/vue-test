import { SipLibMixin, SipMixin } from "@libs/sip";
import g2Line from './components/g2-line.component.vue';

export const DemoSharedMixin: SipMixin = {
    mixins: [SipLibMixin],
    components: {
        'g2-line': g2Line
    },
    directives: {

    }
};
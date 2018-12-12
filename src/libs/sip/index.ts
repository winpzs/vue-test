import { SipSharedComponents } from './components';
import { SipSharedDirectives } from './directives';
import { SipModule } from './vue-extends/sip-module';
export * from './base';
export * from './components';
export * from './directives';
export * from './http';
export * from './sip-config';
export * from './sip-validator';
export * from './vue-extends';

export const SipSharedModule = new SipModule({
    components: {
        ...SipSharedComponents
    },
    directives:{
        ...SipSharedDirectives
    }
});

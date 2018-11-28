import { SipVueComponent } from '@libs/sip';
import { Vue } from 'vue-property-decorator';


@SipVueComponent({
})
export default class Test2 extends Vue {

    getName(){
        return "OK!!!!!"
    }
}
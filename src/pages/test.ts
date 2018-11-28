import { SipVueComponent } from '@libs/sip';
import { Emit, Vue, Watch } from 'vue-property-decorator';
import { Store } from 'vuex';
import { Action, State } from 'vuex-class';
import { TestService } from '../services/test.service';
import Test2 from "./test2.vue";
import Test3 from "./test3.vue";

@SipVueComponent({
    store: new Store({
        state: {
            count: 0,
            foo: 'state.foo'
        }
    }),
    components: {
        Test2,
        Test3
    }
})
export default class Test extends Vue {
    constructor() {
        super();
    }
    srv1: TestService = new TestService();
    aaa = 'aaaa1';
    @State('foo') stateFoo: any;
    @State(state => state.bar) bar: any;
    @Action('foo') actionFoo: any;

    mounted() {
        setTimeout(() => {
            this.aaa = 'bbbbb';
        }, 1000);
    }

    created() {
        console.log('created', this.$store, this.stateFoo)
    }

    beforeCreate() {
        console.log('beforeCreate')
    }

    @Watch('aaa')
    w1() {

    }

    @Emit('computed')
    ttttt() {
        console.log('computed');
    }

    getName() {
        return "OK!!!!!"
    }
}
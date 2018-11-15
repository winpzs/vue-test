import { SipInject, SipInjectable, SipPage, SipService, SipVueBeforeCreate, SipVueMounted, SipVueRef } from 'libs/sip';
import Component from 'vue-class-component';
import { Emit, Watch } from 'vue-property-decorator';
import { Store } from 'vuex';
import { SipStoreAction, SipStoreMutation, SipStoreState } from '../../../libs/sip/vue-extends/decorators/sip-vue-property-decorator';
import UserSelectComponent from './shared/components/user-select';
import UserSelect from "./shared/components/user-select.vue";
import { UserService } from './shared/services/user.service';

@SipInjectable()
class TestService extends SipService {
}


@Component({
    store: new Store({
        state: {
            count: 0,
            foo: 'state.foo'
        },
        mutations: {
            count(state, p) {
                state.count = p;
            }
        },
        actions: {
            count(context, p) {
                context.commit('count', p)
            }
        }
    }),
    components: {
        UserSelect: UserSelect
    }
})
export default class List extends SipPage {
    @SipInject(TestService)
    testSrv: TestService;
    constructor() {
        super();
        console.log('List', this);
        setTimeout(() => {
            //    this.aaa = 'bbbbbb'
            this.test();
        }, 1000)

    }

    @SipInject(UserService)
    useSrv: UserService;

    @SipStoreState('count') count: number;
    @SipStoreAction('count') actCount;
    @SipStoreMutation('count') mutCount;
    aaa = 'aaaa1';
    obj = {
        b: 'bdddddd'
    };
    test() {
        this.aaa = 'bbbBBB';
        this.obj.b = 'tttttttttttt';
        // console.log(this.$router);
        // setTimeout(() => {
        //     //    this.aaa = 'bbbbbb'
        //     this.$router.push({ path: '/pages/test' })
        // }, 3000)
    }

    @SipVueRef()
    userselect: UserSelectComponent;
    testRef() {
        let userselect: UserSelectComponent = this.userselect;
        console.log('refs', userselect.getName(), userselect instanceof UserSelectComponent, userselect);
    }


    @SipVueMounted()
    mounted1() {
        console.log('parent mounted1', this);
        // this.testRef();
    }

    @SipVueBeforeCreate()
    beforeCreate1() {
        console.log('beforeCreate List11111')
    }

    @Watch('aaa')
    w1() {

    }
    // created() {
    //     console.log('created');
    //     // $SipDoLifecycle(this, 'created');
    // };

    @Emit('computed')
    ttttt() {
        console.log('computed');
    }

    getName() {
        return "user-list OK!!!!!"
    }
}
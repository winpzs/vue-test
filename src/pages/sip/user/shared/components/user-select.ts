import { SipComponent, SipInject, SipPage, SipStoreAction, SipVueBeforeCreate, SipVueComponent, SipVueMounted, SipVueProp } from '@libs/sip';

@SipVueComponent({})
export default class UserSelect extends SipComponent {
    constructor() {
        super();
        console.log(this);
        setTimeout(() => {
            this.actCount(22222);
            console.log(this.title);
        }, 3000);
    }

    @SipVueProp(String) title;

    @SipStoreAction('count') actCount;

    @SipInject(SipPage)
    page: SipPage;
    testPage() {
        console.log('parent page', this.page);
    }

    @SipVueMounted()
    test2() {
        this.testPage();
        console.log('SipVueLifeMounted UserSelect', this.title)
    }

    @SipVueMounted()
    test3() {

        console.log('SipVueLifeMounted2 UserSelect', this.title)
    }

    @SipVueBeforeCreate()
    beforeCreate1() {
        console.log('UserSelect prop1');
    };

    @SipVueBeforeCreate()
    beforeCreate2() {
        console.log('beforeCreate2 UserSelect');
    };

    getName() {
        return "user-select OK!!!!!"
    }

    click() {
        console.log(this.title);
    }

    aaaa = 'aaaa';
}
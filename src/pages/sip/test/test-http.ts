import { SipPage, SipInject, SipVueCreated, SipHttpService } from 'libs/sip';
import Component from 'vue-class-component';

@Component({})
export default class TestHttp extends SipPage {
    name = "TestHttp"

    @SipInject(SipHttpService)
    http:SipHttpService

    @SipVueCreated()
    init(){
        this.http.post('static/config/menu.json',{id:1111}).then((rs)=>{
            console.log('menu', rs.isSucc, rs.isWarn, rs);
        });
        console.log('http', this.http);
    }
}
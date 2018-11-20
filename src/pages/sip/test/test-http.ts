import { SipInject, SipPage, SipVueCreated } from 'libs/sip';
import Component from 'vue-class-component';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@Component({})
export default class TestHttp extends SipPage {
    name = "TestHttp"

    @SipInject(RegionService)
    regionSrv:RegionService;

    regionList:RegionModel[] = [];
    @SipVueCreated()
    init(){
        // this.http.post('static/config/menu.json',{id:1111}).then((rs)=>{
        //     console.log('menu', rs.isSucc, rs.isWarn, rs);
        // });
        this.regionSrv.list().then((rs)=>{
            this.regionList = rs.isSucc ? rs.data : [];
        });
        this.regionSrv.list().then((rs)=>{
            console.log('region list rs', rs);
        });
        setTimeout(() => {
            this.regionSrv.list().then((rs)=>{
                console.log('region list rs', rs);
            });
        }, 2000);
        // console.log('http', this.http);
    }
}
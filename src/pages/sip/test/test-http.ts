import { SipInject, SipPage, SipReady, SipVueCreated } from 'libs/sip';
import Component from 'vue-class-component';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@Component({})
export default class TestHttp extends SipPage {
    name = "TestHttp";

    @SipInject(RegionService)
    regionSrv:RegionService;

    regionList:RegionModel[] = [];
    
    @SipReady()
    private init(){
        console.log('init')
        this.regionList = this.regionSrv.regionList;
        // this.regionSrv.list().then((rs)=>{
        //     this.regionList = rs.isSucc ? rs.data : [];
        //     console.log('region list rs', rs);
        // });
        // this.regionSrv.list().then((rs)=>{
        //     console.log('region list rs', rs);
        // });
        // setTimeout(() => {
        //     this.regionSrv.list().then((rs)=>{
        //         console.log('region list rs', rs);
        //     this.regionList = rs.isSucc ? rs.data : [];
        // });
        // }, 2000);
    }

    @SipVueCreated()
    private testCreate(){
console.log('created', this);
    }
}
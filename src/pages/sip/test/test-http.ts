import { SipInit, SipInject, SipPage, SipReady, SipVueCreated } from 'libs/sip';
import Component from 'vue-class-component';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@Component({})
export default class TestHttp extends SipPage {
    name = "TestHttp";

    @SipInject(RegionService)
    regionSrv:RegionService;

    regionList:RegionModel[] = [];
    
    @SipInit()
    private init(){
        console.log('init');
        this.regionList = this.regionSrv.regionList;
    }

    @SipReady()
    private ready(){
        console.log('ready');
    }

    @SipVueCreated()
    private testCreate(){
// console.log('created', this);
    }
}
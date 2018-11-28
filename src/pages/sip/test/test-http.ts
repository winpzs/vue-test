import { SipInit, SipInject, SipPage, SipReady, SipVueCreated } from '@libs/sip';
import { SharedComponents } from '@libs/sip/components';
import Component from 'vue-class-component';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@Component({
    components:{
        ...SharedComponents
    }
})
export default class TestHttp extends SipPage {
    name = "TestHttp";

    @SipInject(RegionService)
    regionSrv: RegionService;

    regionList: RegionModel[] = [];

    @SipInit()
    private init() {
        this.$logger.debug('init', this.$router, this.$currentRoute, this);
        this.regionList = this.regionSrv.regionList;
    }

    @SipReady()
    private ready() {
        this.$logger.debug('ready');
        this.regionSrv.list().then((rs) => {

        });
    }

    @SipVueCreated()
    private testCreate() {
        // this.$logger.debug('created', this);
    }
}
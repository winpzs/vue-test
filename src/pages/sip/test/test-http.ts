import { SipInit, SipInject, SipLibComponents, SipPage, SipReady, SipVueComponent, SipVueCreated } from '@libs/sip';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@SipVueComponent({
    components:{
        ...SipLibComponents
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
        // this.regionSrv.list().then((rs) => {

        // });
    }

    @SipVueCreated()
    private testCreate() {
        // this.$logger.debug('created', this);
    }
}
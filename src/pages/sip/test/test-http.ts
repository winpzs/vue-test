import { SipConfig, SipInit, SipInject, SipPage, SipReady, SipVueCreated } from '@libs/sip';
import Component from 'vue-class-component';
import { RegionModel } from './shared/models/region.model';
import { RegionService } from './shared/services/region.service';

@Component({})
export default class TestHttp extends SipPage {
    name = "TestHttp";

    @SipInject(RegionService)
    regionSrv: RegionService;

    regionList: RegionModel[] = [];

    @SipInit()
    private init() {
        this.$logger.debug('init', SipConfig.env);
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
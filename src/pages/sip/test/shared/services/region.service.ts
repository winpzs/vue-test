import { SipHttpDef, SipHttpDefFunction, SipHttpResult, SipHttpService, SipInject, SipService } from "libs/sip";
import { RegionModel } from "../models/region.model";

export class RegionService extends SipService {

    @SipInject(SipHttpService)
    http: SipHttpService

    list1(): Promise<SipHttpResult<RegionModel[]>> {
        return this.http.post('api/basicData/describeRegions', { test: 'aaa' }, {
            cache: false,
            conflictKey: 'conflictKey-describeRegions'
        });
    }

    @SipHttpDef({
        defMethod: 'get',
        url: 'api/basicData/describeRegions',
        model: RegionModel,
        cache: true
    })
    list: SipHttpDefFunction<RegionModel, RegionModel[]>;
}
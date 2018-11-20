import { SipHttpResult, SipHttpService, SipInject, SipService } from "libs/sip";
import { RegionModel } from "../models/region.model";

export class RegionService extends SipService {

    @SipInject(SipHttpService)
    http: SipHttpService

    list():Promise<SipHttpResult<RegionModel[]>> {
        return this.http.get('api/basicData/describeRegions');
    }
}
import { SipHttpDef, SipHttpDefFunction, SipPreload, SipService } from "libs/sip";
import { RegionModel } from "../models/region.model";

export class RegionService extends SipService {

    regionList:RegionModel[];

    @SipPreload()
    private load(){
        return this.list().then((rs) => {
            this.regionList = rs.isSucc && rs.data ? rs.data : [];
        });
    }

    @SipHttpDef({
        defMethod: 'get',
        url: 'api/basicData/describeRegions',
        model: RegionModel,
        cache: false,
        conflictKey:'tsetaa'
    })
    list: SipHttpDefFunction<RegionModel, RegionModel[]>;
}
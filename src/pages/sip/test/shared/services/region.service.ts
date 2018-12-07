import { SipHttpDef, SipHttpDefFunction, SipHttpSqlDef, SipHttpSqlDefFunction, SipPreload, SipService } from "@libs/sip";
import { RegionModel } from "../models/region.model";

export class RegionService extends SipService {

    regionList:RegionModel[];

    @SipPreload()
    private load(){
        console.log('region service preload')
        return this.list().then((rs) => {
            this.regionList = rs.isSucc && rs.data ? rs.data : [];
        });
    }

    @SipHttpDef({
        defMethod: 'get',
        url: 'api/basicData/describeRegions',
        cache: false,
        conflictKey:'tsetaa'
    })
    list: SipHttpDefFunction<RegionModel, RegionModel[]>;

    
    @SipHttpSqlDef({
        sqlId:'',
        connstr:'',
        sqlType:'PageList',
        cache: false,
        conflictKey:'tsetaa'
    })
    pageList: SipHttpSqlDefFunction<RegionModel, RegionModel[]>;
}
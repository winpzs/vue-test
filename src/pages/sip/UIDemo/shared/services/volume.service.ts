import { SipHttpSqlDef, SipHttpSqlDefFunction, SipService } from '@libs/sip';
import { VoumeModel } from '../models/voume.model';


export class VolumeService extends SipService{

    @SipHttpSqlDef<VoumeModel[]>({
        sqlId:'Iaas_Volume.List.GetByOwnerID',
        connstr: 'iaas',
        sqlType:'PageList'
    })
    pageList:SipHttpSqlDefFunction<VoumeModel, VoumeModel[]>;

}
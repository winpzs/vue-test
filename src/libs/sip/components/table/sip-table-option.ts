import { SipTableColumn } from './sip-table-column';

export class SipTableOption<T=any> {
    columns: SipTableColumn[];
    datas?: T[];
    loading?: boolean = true;
}
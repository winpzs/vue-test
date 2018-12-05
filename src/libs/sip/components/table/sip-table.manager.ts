import { Table } from 'iview';
import { SipTableColumn } from './sip-table-column';
import { SipTableOption } from "./sip-table-option";

export class SipTableManager {

    readonly option: SipTableOption;
    table: Table;

    constructor(option: SipTableOption) {
        this.option = option;
    }

    public get datas() {
        return this.option.datas;
    }
    public set datas(value) {
        this.option.datas = value;
    }

    public get columns():SipTableColumn[] {
        return this.option.columns;
    }
    public set columns(value:SipTableColumn[]) {
        this.option.columns = value;
    }

    public get loading():boolean {
        return this.option.loading;
    }
    public set loading(value:boolean) {
        this.option.loading = value;
    }

    $destroy(){
        this.table = null;
    }
}
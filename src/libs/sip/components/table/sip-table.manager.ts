import { Table } from 'iview';
import Vue from 'vue';
import { SipTableColumn } from './sip-table-column';
import { SipTableOption } from "./sip-table-option";

export class SipTableManager<T=any> {

    readonly option: SipTableOption<T>;

    private _table: any;
    public get table(): Table {
        return this._table;
    }
    public set table(value: Table) {
        this._table = value;
    }

    _init(table: Table) {
        if (!table || this._table) return;
        this._table = table;
        table.$on('on-row-click', (row: any, idx: number) => {
            console.log('on-row-click', row, idx);
            this._table.selectAll(false);
            this.setSelects([idx]);
        });
        table.$on('on-selection-change', (selection: any[]) => {
            this.$event.$emit('onSelectChanged', [selection]);
        });
    }

    constructor(option: SipTableOption<T>) {
        this.option = option;
    }

    public get datas() {
        return this.option.datas;
    }
    public set datas(value) {
        this.option.datas = value;
    }

    public get columns(): SipTableColumn[] {
        return this.option.columns;
    }
    public set columns(value: SipTableColumn[]) {
        this.option.columns = value;
    }

    public get loading(): boolean {
        return this.option.loading;
    }
    public set loading(value: boolean) {
        this.option.loading = value;
    }

    get rows(): any {
        return this._table && this._table.objData;
    }

    private _selectRows(indexs: any[], status?: boolean) {
        let rows = this.rows;
        if (rows) {
            status = status === false ? false : true;
            indexs.forEach(function (idx) {
                rows[idx] && (rows[idx]._isChecked = status);
            });
        }
    }

    setSelects(indexs: number[], status?: boolean) {
        this._selectRows(indexs, status);
        this.$event.$emit('onSelectChanged', [this.getSelects()]);
    }

    getSelects(): T[] {
        return (this._table && this._table.getSelection()) || [];
    }

    getFirstSelectRows(): T {
        let datas = this.getSelects();
        return datas[0]
    }

    private _selectAll(status?: boolean) {
        let rows = this.rows;
        if (rows) {
            this._selectRows(Object.keys(rows), status);
        }
    }
    selectAll(status?: boolean) {
        this._selectAll(status);
        this.$event.$emit('onSelectChanged', [this.getSelects()]);
    }

    $event = new Vue();

    onSelectChanged(fn: () => void) {
        this.$event.$on('onSelectChanged', fn);
    }

    $destroy() {
        let _this: any = this;
        _this.option = null;
        this._table = null;
    }
}
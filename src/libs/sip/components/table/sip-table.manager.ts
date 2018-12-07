import { Table } from 'iview';
import Vue from 'vue';
import { SipSortOrder } from '../../http/sip-http-base';
import { SipTableColumn } from './sip-table-column';
import { SipTableOption } from "./sip-table-option";
import { SipTableRow } from './sip-table-row';

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
        table.$on('on-row-click', (data: any, idx: number) => {
            this._event.$emit('onRowClick', data, idx);

            this._selectAll(false, [idx]);
            this.setSelects([idx]);
        });
        table.$on('on-row-dblclick', (data: any, idx: number) => {
            this._event.$emit('onRowDblclick', data, idx);
        });
        table.$on('on-expand', (data: any, status: boolean) => {
            this._event.$emit('onExpand', data, status);
        });
        table.$on('on-filter-change', (column: SipTableColumn) => {
            this._event.$emit('onFilterChange', column);
        });
        table.$on('on-sort-change', (column: SipTableColumn, key: string, order: SipSortOrder) => {
            this._event.$emit('onSortChange', column, key, order);
        });
        table.$on('on-selection-change', (datas: any[]) => {
            this._event.$emit('onSelectChanged', datas);
        });
    }

    constructor(option: SipTableOption<T>) {
        let temp = Object.assign({
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            pageIndex: 1,
            sortName: '',
            sortOrder: ''
        }, option);
        this.option = Object.assign(option, temp);
    }

    total: number = 0;

    private _loadRest() {
        if (!this.option) return;
        let rest = this.option.rest;
        if (rest) {
            rest({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                sortOrder: this.sortOrder,
                sortName: this.sortName
            })
        }
    }

    public get pageIndex(): number {
        return this.option.pageIndex;
    }
    public set pageIndex(value) {
        if (!this.option) return;
        this.option.pageIndex = value;
    }

    public get pageSizeOpts(): number[] {
        return this.option.pageSizeOpts;
    }
    public set pageSizeOpts(value) {
        if (!this.option) return;
        this.option.pageSizeOpts = value;
    }

    public get pageSize(): number {
        return this.option.pageSize;
    }
    public set pageSize(value) {
        if (!this.option) return;
        this.option.pageSize = value;
    }

    public get sortName(): string {
        return this.option.sortName;
    }
    public set sortName(value) {
        if (!this.option) return;
        this.option.sortName = value;
    }

    public get sortOrder(): SipSortOrder {
        return this.option.sortOrder;
    }
    public set sortOrder(value) {
        if (!this.option) return;
        this.option.sortOrder = value;
    }

    public get datas() {
        return this.option.datas;
    }
    public set datas(value) {
        if (!this.option) return;
        this.option.datas = value;
    }

    public get columns(): SipTableColumn[] {
        return this.option.columns;
    }
    public set columns(value: SipTableColumn[]) {
        if (!this.option) return;
        this.option.columns = value;
    }

    public get loading(): boolean {
        return this.option.loading;
    }
    public set loading(value: boolean) {
        if (!this.option) return;
        this.option.loading = value;
    }

    get rows(): { [key: string]: SipTableRow<T> } {
        return this._table && this._table.objData;
    }

    get rowList(): SipTableRow<T>[] {
        let rows = this.rows;
        return Object.keys(rows).map(function (key) { return rows[key]; });
    }

    private _selectRows(indexs: any[], status?: boolean, exclude?:number[]):boolean {
        let rows = this.rows;
        let change = false;
        if (rows) {
            status = status === false ? false : true;
            indexs.forEach(function (idx) {
                if (exclude && exclude.findIndex(function(item){ return item == idx; }) >= 0) return;
                if (rows[idx] && rows[idx]._isChecked != status){
                    change = true;
                    rows[idx]._isChecked = status;
                }
            });
        }
        return change;
    }

    setSelects(indexs: number[], status?: boolean) {
        if (this._selectRows(indexs, status))
            this._event.$emit('onSelectChanged', [this.getSelects()]);
    }

    getSelects(): T[] {
        return (this._table && this._table.getSelection()) || [];
    }

    getFirstSelectRows(): T {
        let datas = this.getSelects();
        return datas[0]
    }

    private _selectAll(status?: boolean, exclude?:number[]):boolean {
        let rows = this.rows;
        if (rows) {
            return this._selectRows(Object.keys(rows), status, exclude);
        } else
            return false;
    }

    selectAll(status?: boolean) {
        if (this._selectAll(status))
            this._event.$emit('onSelectChanged', [this.getSelects()]);
    }

    private _event = new Vue();

    onSelectChanged(fn: (datas: T[]) => void) {
        this._event.$on('onSelectChanged', fn);
    }

    onRowClick(fn: (data: T, index?: number) => void) {
        this._event.$on('onRowClick', fn);
    }

    onRowDblclick(fn: (data: T, index?: number) => void) {
        this._event.$on('onRowDblclick', fn);
    }
    onExpand(fn: (data: T, status?: boolean) => void) {
        this._event.$on('onExpand', fn);
    }
    onFilterChange(fn: (column: SipTableColumn) => void) {
        this._event.$on('onFilterChange', fn);
    }
    onSortChange(fn: (column: SipTableColumn, key?: string, order?: SipSortOrder) => void) {
        this._event.$on('onSortChange', fn);
    }

    $destroy() {
        let _this: any = this;
        _this.option = null;
        this._table = null;
    }
}
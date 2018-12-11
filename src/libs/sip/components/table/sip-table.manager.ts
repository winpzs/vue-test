import { Table, TableExportCsvParams } from 'iview';
import _ from 'lodash';
import Vue from 'vue';
import { SipSortOrder } from '../../http/sip-http-base';
import { SipTableColumn } from './sip-table-column';
import { SipTableOption, SipTableOptionRest } from "./sip-table-option";
import { SipTableRow } from './sip-table-row';

function _makeSipData(datas: any[]): any[] {
    _.forEach(datas, function (item, idx) {
        item._sipIndex = idx;
    });
    return datas;
}

export class SipTableManager<T=any> implements SipTableOption<T> {

    readonly option: SipTableOption<T>;

    private _table: any;
    public get table(): Table {
        return this._table;
    }
    public set table(value: Table) {
        this._table = value;
    }

    constructor(option: SipTableOption<T>) {

        this.option = option;

        option = Object.assign({
            pageSizeOpts: [10, 20, 30, 40],
            pageSize: 10,
            pageIndex: 1,
            sortName: '',
            sortOrder: '',
            loading: false,
            datas: [],
            filterMultiple: true,
            multipleSelection: true
        }, _.cloneDeep(option));
        option.columns = [];

        Object.assign(this, option);
    }

    private _columnSlots: { [key: string]: { $sipTableSlotScope: (params: any) => any } };

    private _makeColumns(columns: SipTableColumn[]) {
        columns = columns.map((item) => {
            item = Object.assign({
                filterMultiple: false,
                filterMethod: function () { return true; }
            }, item);

            if (!!item.filteredValue)
                this._pushFilter(item, item.filteredValue);
            if (!!item.sortType) {
                this.sortName = item.key;
                this.sortOrder = item.sortType;
            }

            /**处理render */
            if (!item.render) {
                let solt = this._columnSlots[item.key];
                item.render = function (h, params) {
                    let { row, column } = params as any;
                    let cellValue = row[column.key];
                    let fitler: any = (_.find(column.filters, { value: cellValue }) || { label: '' });
                    let cellText = fitler.label;
                    if (solt) {
                        let p = {
                            cellValue,
                            cellText,
                            ...params
                        };
                        return h('div', [solt.$sipTableSlotScope(p)]);

                    } else {
                        return h('div', cellValue);
                    }
                };
            }
            return item;
        });
        return columns;
    }

    private _isInited = false;
    _init(table: Table, columnSlots: any) {
        if (!table || this._table) return;
        this._isInited = true;
        this._table = table;
        this._columnSlots = columnSlots;
        this.columns = _.cloneDeep(this.option.columns);
        this._loadRest();

        table.$on('on-row-click', (data: any, idx: number) => {
            this._event.$emit('onRowClick', data, idx);

            // this.table.$nextTick(() => {
            //     this.setSelects([idx]);
            //     this._selectAll(false, [idx]);
            // });
            this.setSelects([idx]);
            this._selectAll(false, [idx]);

        });
        table.$on('on-row-dblclick', (data: any, idx: number) => {
            this._event.$emit('onRowDblclick', data, idx);
        });
        table.$on('on-expand', (data: any, status: boolean) => {
            this._event.$emit('onExpand', data, status);
        });
        table.$on('on-filter-change', (column: SipTableColumn, a, b, c) => {
            this._pushFilter(column, column._isFiltered ? _.cloneDeep(column._filterChecked) : null);
            this._event.$emit('onFilterChange', column);
            this.search();
        });
        table.$on('on-sort-change', (p: { column: SipTableColumn, key: string, order: SipSortOrder }) => {
            let { column, key, order } = p;
            this.sortName = key;
            this.sortOrder = order;
            this._event.$emit('onSortChange', column, key, order);
            this.search();
        });
        table.$on('on-selection-change', (datas: any[]) => {
            this._event.$emit('onSelectChanged', datas);
        });
    }

    private _pushFilter(column: SipTableColumn, values: any[]) {
        if (column.onFilter) {
            Object.assign(this._searchParams, column.onFilter(values || []));
        } else {
            let obj = {};
            obj[column.key] = values.join(',');
            Object.assign(this._searchParams, obj);
        }
    }

    total: number = 0;
    rest: SipTableOptionRest<T>;

    private _loadRest() {
        if (!this.option) return;
        let rest = this.rest;
        let params: any = _.cloneDeep(this._searchParams);
        if (rest) {
            this.loading = true;
            rest(params || {}, {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                sortOrder: this.sortOrder,
                sortName: this.sortName
            }).then((rs) => {
                this.datas = rs.data || [];
                this.total = rs.total || 0;
                // this.pageIndex = rs.pageIndex || 1;
                this.loading = false;
            });
        }
    }

    private _searchParams = {};
    /**
     * 搜索，累加参数
     * @param params 参数
     * @param reset 是否重置参数
     */
    search(params?: any, reset?: boolean) {
        if (reset === true)
            this._searchParams = params || {};
        else
            Object.assign(this._searchParams, params);
        this.pageIndex = 1
        this._loadRest();
    }

    refresh() {
        this._loadRest();
    }

    private _multipleSelection: boolean;
    /**多选 */
    public get multipleSelection(): boolean {
        return this._multipleSelection;
    }
    public set multipleSelection(value: boolean) {
        let change = (this._multipleSelection != value);
        this._multipleSelection = value;
        if (change) {
            let columns = this.option.columns;
            if (!columns) return;
            let selectCol = _.find(columns, { type: "selection" })
            if (value) {
                if (!selectCol) {
                    columns.unshift({
                        type: "selection",
                        width: 60,
                        align: "center"
                    });
                    if (this._isInited)
                        this.columns = columns;
                }
            } else if (selectCol) {
                this.option.columns = _.remove(columns, selectCol);
                if (this._isInited)
                    this.columns = this.option.columns;
            }
        }
    }

    pageIndex: number = 1;


    pageSizeOpts: number[];
    pageSize: number;

    sortName: string;
    sortOrder: SipSortOrder;

    private _datas: any[];
    public get datas(): any[] {
        return this._datas;
    }
    public set datas(value: any[]) {
        this._datas = _makeSipData(value);
    }

    private _columns: SipTableColumn[];
    public get columns(): SipTableColumn[] {
        return this._columns;
    }
    public set columns(value: SipTableColumn[]) {
        this._columns = this._makeColumns(value);
    }
    loading: boolean;

    get rows(): { [key: string]: SipTableRow<T> } {
        return this._table && this._table.objData;
    }

    get rowList(): SipTableRow<T>[] {
        let rows = this.rows;
        return Object.keys(rows).map(function (key) { return rows[key]; });
    }

    private _selectRows(indexs: any[], status?: boolean, exclude?: number[]) {
        let rows = this.rows;
        if (rows) {
            status = status === false ? false : true;
            indexs.forEach(function (idx) {
                if (exclude && exclude.findIndex(function (item) { return item == idx; }) >= 0) return;
                rows[idx]._isChecked = status;
            });
        }
    }

    setSelects(indexs: number[], status?: boolean) {
        let selectIndexs = _.map(this.getSelects(), '_sipIndex');
        this._selectRows(indexs, status);
        this.table.$nextTick(() => {
            let selectIndexs1 = _.map(this.getSelects(), '_sipIndex');
            let isSelectChange = !_.isEqual(selectIndexs, selectIndexs1);
            if (isSelectChange)
                this._event.$emit('onSelectChanged', this.getSelects());
        });
    }

    getSelects(): T[] {
        return (this._table && this._table.getSelection()) || [];
    }

    getSelectFirst(): T {
        let datas = this.getSelects();
        return _.first(datas);
    }

    private _selectAll(status?: boolean, exclude?: number[]) {
        let rows = this.rows;
        if (rows) {
            this._selectRows(Object.keys(rows), status, exclude);
        }
    }

    selectAll(status?: boolean) {
        let selectIndexs = _.map(this.getSelects(), '_sipIndex');
        this._selectAll(status);
        this.table.$nextTick(() => {
            let selectIndexs1 = _.map(this.getSelects(), '_sipIndex');
            let isSelectChange = !_.isEqual(selectIndexs, selectIndexs1);
            if (isSelectChange)
                this._event.$emit('onSelectChanged', this.getSelects());
        });
    }

    exportCsv(params: TableExportCsvParams) {
        this.table.exportCsv(params);
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
    onFilterChange(fn: (filters: { [column: string]: any[] }, column: SipTableColumn) => void) {
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
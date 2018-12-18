import { Table } from '*.vue';
import _ from 'lodash';
import { SipVueDestroyed, SipVueRef } from '../../vue-extends';
import { SipVueMounted } from '../../vue-extends/decorators/sip-vue-lifecycle';
import { SipVueComponent, SipVueOn, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';
import { SipTableColumn } from './sip-table-column';
import { SipTableManager } from './sip-table.manager';

@SipVueComponent({})
export default class SipTableComponent extends SipComponent {

    @SipVueProp(Object)
    manager: SipTableManager;

    get datas(): any[] {
        return this.manager.datas;
    }

    get columns(): SipTableColumn[] {
        return this.manager.columns;
    }
    get loading(): boolean {
        return this.manager.loading;
    }


    public get pageIndex(): number {
        return this.manager.pageIndex;
    }

    public get pageSizeOpts(): number[] {
        return this.manager.pageSizeOpts;
    }

    public get pageSize(): number {
        return this.manager.pageSize;
    }

    public get total(): number {
        return this.manager.total;
    }

    public get showPageBar(): boolean {
        return this.manager.showPageBar;
    }

    pageChangePage(pageIndex) {
        this.manager.pageIndex = pageIndex;
        this.manager.refresh();
    }

    pageChangeSize(pageSize) {
        this.manager.pageSize = pageSize;
        this.manager.search();
    }


    @SipVueRef('table1')
    table: Table;

    private _getColumnSlotScopes() {
        let slots = {};
        _.forEach(this.$children, function (item: any) {
            if (item.column && _.isFunction(item.$sipTableSlotScope)) {
                slots[item.column] = item;
            }
        });
        return slots;
    }

    @SipVueMounted()
    private _sip_table_created() {
        this.manager._init(this.table, this._getColumnSlotScopes());
    }

    @SipVueDestroyed()
    private _sip_table_destroy() {
        this.manager.$destroy();
    }

    @SipVueOn('contextmenu', true)
    private _contextmenu(e: MouseEvent) {
        let contextmenus = this.manager.contextmenu();
        if (contextmenus && contextmenus.length <= 0) return;
        let datas = this.manager.getSelects();
        let menus = _.cloneDeep(contextmenus || []);
        _.forEach(menus, function (item) {
            item.datas = datas;
        });
        return this.$showContextMenu(e, menus);
    }
}
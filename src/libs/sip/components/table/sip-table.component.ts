import { Table } from '*.vue';
import { SipVueCreated, SipVueDestroyed, SipVueRef } from '../../vue-extends';
import { SipVueComponent, SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
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
    @SipVueRef('table1')
    table: Table;

    @SipVueCreated()
    private _sip_table_created(){
        this.manager.table = this.table;
    }

    @SipVueDestroyed()
    private _sip_table_destroy() {
        this.manager.$destroy();
        this.manager = this.table = null;
    }

}
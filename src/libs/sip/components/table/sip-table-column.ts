import { TableColumn } from 'iview';
import { SipSortOrder } from '../../http/sip-http-base';

export interface SipTableColumn extends TableColumn {
    _filterMultiple?: boolean;
    _filterVisible?: boolean;
    _index?: number;
    _isFiltered?: boolean;
    _sortType?: SipSortOrder;
    __id?: string;
    _columnKey?: number;
    _filterChecked?: any[];
    onFilter?:(values:any[])=>void;
}
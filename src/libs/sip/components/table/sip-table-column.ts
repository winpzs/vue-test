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
    /**
     * 过滤事件，并返回过渡查询内容, 默认为当前列值
     * @example onFilter: (values:any[]) => { return { status: values.join(',')}; }
     */
    onFilter?: (values: any[]) => { [key: string]: any };
}
import { SipHttpSqlResult, SipSortOrder } from '../../http/sip-http-base';
import { SipContextmenuItem } from '../contextmenu/sip-contextmenu-item';
import { SipTableColumn } from './sip-table-column';

export type SipTableOptionRest<T=any> = (params: any, option: {
    /**请求记录数量 */
    pageSize?: number;
    /**当前页面 */
    pageIndex?: number;
    /**排序字段 */
    sortName?: string;
    /**排序方向 */
    sortOrder?: SipSortOrder;
    /**过滤值 */
    filters?: {
        [column: string]: any[];
    };
}) => Promise<SipHttpSqlResult<T[]>>;

export class SipTableOption<T=any> {
    /**多选 */
    multipleSelection?: boolean;
    /**选择方式, select：选择模式，normal正常操作 */
    selectMode?: 'select' | 'normal';
    columns: SipTableColumn[];
    datas?: T[];
    loading?: boolean = true;
    /**请求记录数量下拉项, [10, 20, 30, 40] */
    pageSizeOpts?: number[];
    /**请求记录数量 */
    pageSize?: number;
    /**当前页面 */
    pageIndex?: number;
    /**排序字段 */
    sortName?: string;
    /**排序方向 */
    sortOrder?: SipSortOrder;
    total?: number;
    rest?: SipTableOptionRest<T>;
    /** 是否显示页面栏，默认 true */
    showPageBar?: boolean;
    contextmenu?:()=>SipContextmenuItem<T[]>[];
}
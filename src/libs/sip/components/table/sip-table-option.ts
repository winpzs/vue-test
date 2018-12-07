import { SipHttpSqlResult, SipSortOrder } from '../../http/sip-http-base';
import { SipTableColumn } from './sip-table-column';

export class SipTableOption<T=any> {
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
    rest?: (p: {
        /**请求记录数量 */
        pageSize?: number;
        /**当前页面 */
        pageIndex?: number;
        /**排序字段 */
        sortName?: string;
        /**排序方向 */
        sortOrder?: SipSortOrder;
    }) => Promise<SipHttpSqlResult<T>>;
}
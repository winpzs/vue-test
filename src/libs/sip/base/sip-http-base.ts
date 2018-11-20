import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface SipHttpConfig extends AxiosRequestConfig {
    /**post的类型 form | payload */
    postType?: 'form' | 'payload';
    /**定义rest结果提示通知 */
    notifis?: { success?: boolean | string; warn?: boolean | string; error?: boolean | string; };
    /**接口描述 */
    desc?: string;
    /**缓存到... */
    cacheTo?: 'component' | 'business' | 'root' | 'this';
}

export interface SipHttpResult<T=any> {
    /**数据 */
    data: T;
    /**是否成功 */
    isSucc: boolean;
    /**是否warn */
    isWarn: boolean;
    /**提示信息 */
    message: string;
    /**状态码 */
    status: number;
    /**状态信息 */
    statusText: string;
    /**后台出错信息 */
    error: string;
    /**原来http的response */
    response: AxiosResponse<T>;
}

export interface SipHttpSqlConfig extends SipHttpConfig {
    /**库 */
    connstr?: string;
    sqlId?: string;
    /**请求记录数量 */
    pageSize?: number;
    /**当前页面 */
    pageIndex?: number;
    /**排序字段 */
    sortName?: string;
    /**排序方向 */
    sortOrder?: '' | 'asc' | 'desc';
    /**搜索参数 */
    searchparam?: any;
}

export interface SipHttpSqlResult<T=any> extends SipHttpResult<T> {
    /**当前页面 */
    pageIndex: number;
    /**请求记录数量 */
    pageSize: number;
    /**总页面数量 */
    totalPages: number;
    /**总记录数量 */
    total: number;
}

export interface SipHttpDictResult {
    "code": string,
    "text": string,
    "status": string,
    "description": string
}


export const SipHttpHelper = {
    /**字典地址 */
    dictUrl: function (params: { dictionaryCode: string, conStr: string }, config: SipHttpConfig) {
        return 'api/basicData/getDictionaryItems';
    },
    /**sql字典地址 */
    sqlUrl: {
        /**
         * sql数据，有分页
         */
        pageList: function (config: SipHttpSqlConfig) { return 'api/basicData/loadGridData'; },
        /**
         * sql数据，无分页
         */
        list: function (config: SipHttpSqlConfig) { return 'api/basicApi/getList'; },
        /**
         * sql数据，返回实体
         */
        entity: function (config: SipHttpSqlConfig) { return 'api/basicApi/getEntity'; },
        /**
         * sql原始数据，返回实体， 如boolean会返回0|1
         */
        entityEx: function (config: SipHttpSqlConfig) { return 'api/basicApi/getEntityEx'; },
        /**
         * 执行sql
         */
        execute: function (config: SipHttpSqlConfig) { return 'api/basicApi/execute'; },
        /**
         * 新增sql记录，返回新增的实体
         */
        insert: function (config: SipHttpSqlConfig) { return 'api/basicApi/insert'; }
    },

    /**统一处理url路径 */
    handleUrl: function (url: string): string {
        return ['/', url].join('').replace(/[\\/]{2,}/, '/');
    },

    /**统一处理config数据 */
    handleConfig: function (config: SipHttpConfig): SipHttpConfig {
        if (config) {
            if (config.url) config.url = SipHttpHelper.handleUrl(config.url);
        }
        return config;
    },

    /**
     * 统一处理成功的response
     * @param response 
     */
    handleResult: function <T=any>(url: string, config: SipHttpConfig): (response: AxiosResponse<T>) => SipHttpResult<T> {
        return function <T>(response: AxiosResponse<T>): SipHttpResult<T> {
            let rs, data: any = response.data;
            let status = response.status
            if (status == 200 && data && ('version' in data) && ('returnValue' in data)) {
                let returnStatus = data.returnStatus;
                rs = {
                    data: data.returnValue,
                    isSucc: returnStatus === 'OK',
                    isWarn: returnStatus === 'WARNING',
                    message: data.returnDesc,
                    status: data.returnCode,
                    statusText: data.statusText,
                    error: data.error,
                    response: response
                };
            } else {
                rs = {
                    data: response.data,
                    isSucc: true,
                    isWarn: false,
                    message: '',
                    status: status,
                    statusText: response.statusText,
                    error: '',
                    response: response
                };
            }
            return rs;
        }
    },

    /**统一处理sql config数据 */
    handleSqlConfig: function (config: SipHttpSqlConfig): SipHttpSqlConfig {
        config.url = config.url || SipHttpHelper.handleUrl(config.url);
        config.params = Object.assign({
            connstr: config.connstr || '',
            sqlId: config.sqlId || '',
            rows: config.pageSize || 10,
            page: config.pageIndex || 1,
            sidx: config.sortName || '',
            sord: config.sortOrder || '',
            searchparam: config.searchparam
        }, config.params);
        return config;
    },

    /**
     * 统一处理成功的response
     * @param response 
     */
    handleSqlResult: function <T=any>(url: string, config: SipHttpConfig): (rs: SipHttpResult<T>) => SipHttpSqlResult<T> {
        return function <T>(rs: SipHttpResult<T>): SipHttpSqlResult<T> {
            if (url) {
                if (url.indexOf(SipHttpHelper.sqlUrl.pageList(config)) < 0) {
                    return rs as any;
                }
            }
            let sqlData = rs.data as any;
            let retData: any = Object.assign(rs, {
                pageIndex: sqlData ? sqlData.PageIndex : 0,
                pageSize: sqlData ? sqlData.PageSize : 10,
                totalPages: sqlData ? sqlData.TotalPages : 0,
                total: sqlData ? sqlData.TotalRecords : 0
            });
            retData.datas = sqlData && sqlData.Data;

            return retData;
        }
    },
    /**
     * 统一处理打败的response
     * @param response 
     */
    handleErrorResult: function <T=any>(url: string, config: SipHttpConfig): (reason: AxiosError) => SipHttpResult<T> {

        return function <T>(reason: AxiosError): SipHttpResult<T> {
            let response = reason.response
            let rs = {
                data: null,
                isSucc: false,
                isWarn: false,
                message: '',
                status: response ? response.status : 0,
                statusText: response && response.statusText,
                error: response && response.data,
                response: response
            };
            return rs;
        }
    }

};
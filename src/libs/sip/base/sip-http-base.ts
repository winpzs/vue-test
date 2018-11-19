import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface SipHttpConfig extends AxiosRequestConfig {
    /**post的类型 form | payload */
    postType?: 'form' | 'payload';
    /**定义rest结果提示通知 */
    notifis?: { success?: boolean | string; warn?: boolean | string; error?: boolean | string; };
    /**接口描述 */
    desc?: string;
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

export interface ISipHttpDictResult {
    "code": string,
    "text": string,
    "status": string,
    "description": string
}


export const SipHttpHelper = {

    /**统一处理url路径 */
    handleUrl: function (url: string): string {
        return url;
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
            let rs = {
                data: response.data,
                isSucc: true,
                isWarn: false,
                message: '',
                status: response.status,
                statusText: response.statusText,
                error: '',
                response: response
            };
            return rs;
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
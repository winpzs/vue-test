import { AxiosPromise, AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import mvueCore from 'mvue-core';
import { SipInjectable, SipInjectableScope } from '../vue-extends';
import { SipService } from "../vue-extends/sip-service";

export interface SipHttpResult<T=any> {
    data: T;
    isSucc: boolean;
    isWarn: boolean;
    message: string;
    status: number;
    statusText: string;
    error: string;
    response: AxiosResponse<T>;
}

/**
 * 处理成功的response
 * @param response 
 */
function _handleResult<T=any>(response: AxiosResponse<T>): SipHttpResult<T> {
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

/**
 * 处理打败的response
 * @param response 
 */
function _handleErrorResult<T=any>(reason: any): SipHttpResult<T> {
    let response = reason.response
    let rs = {
        data: null,
        isSucc: false,
        isWarn: false,
        message: '',
        status: response ? response.status : 0,
        statusText: response && response.statusText,
        error: response && response.stack,
        response: response
    };
    return rs;
}

@SipInjectable({ scope: SipInjectableScope.root })
export class SipHttpService extends SipService {

    private _http: AxiosInstance;
    constructor(component: any) {
        super(component);
        this._http = mvueCore.http;
    }

    request<T = any>(config: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.request(config).then(_handleResult, _handleErrorResult);
    }
    get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        if (params) {
            config || (config = {});
            config.params = params;
        }
        return this._http.get(url, config).then(_handleResult, _handleErrorResult);
    }
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.delete(url, config).then(_handleResult, _handleErrorResult);
    }
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.head(url, config).then(_handleResult, _handleErrorResult);
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.post(url, data, config).then(_handleResult, _handleErrorResult);

    }
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.put(url, data, config).then(_handleResult, _handleErrorResult);
    }
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<SipHttpResult<T>> {
        return this._http.patch(url, data, config).then(_handleResult, _handleErrorResult);
    }

}
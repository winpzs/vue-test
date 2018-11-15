import { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import mvueCore from 'mvue-core';
import { SipInjectable, SipInjectableScope } from '../vue-extends';
import { SipService } from "../vue-extends/sip-service";

export interface SipRequestConfig extends AxiosRequestConfig {
    
}

/**统一处理url路径 */
function _handleUrl(url: string): string {
    return url;
}

/**统一处理config数据 */
function _handleConfig(config: SipRequestConfig): SipRequestConfig {
    if (config) {
        if (config.url) config.url = _handleUrl(config.url);
    }
    return config;
}

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
 * 统一处理成功的response
 * @param response 
 */
function _handleResult<T=any>(url:string, config:SipRequestConfig): (response: AxiosResponse<T>) => SipHttpResult<T> {
    return function<T>(response: AxiosResponse<T>): SipHttpResult<T> {
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
}

/**
 * 统一处理打败的response
 * @param response 
 */
function _handleErrorResult<T=any>(url:string, config:SipRequestConfig): (reason: AxiosError)=> SipHttpResult<T> {

    return function<T>(reason: AxiosError): SipHttpResult<T> {
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

@SipInjectable({ scope: SipInjectableScope.root })
export class SipHttpService extends SipService {

    private _http: AxiosInstance;
    constructor(component: any) {
        super(component);
        this._http = mvueCore.http;
    }

    request<T = any>(config: SipRequestConfig): Promise<SipHttpResult<T>> {
        config = _handleConfig(config);
        return this._http.request(config).then(_handleResult('', config), _handleErrorResult('', config));
    }

    get<T = any>(url: string, params?: any, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        if (params) {
            config || (config = {});
            config.params = params;
        }
        config = _handleConfig(config);
        return this._http.get(url, config).then(_handleResult(url, config), _handleErrorResult(url, config));
    }

    delete<T = any>(url: string, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        config = _handleConfig(config);
        return this._http.delete(url, config).then(_handleResult(url, config), _handleErrorResult(url, config));
    }

    head<T = any>(url: string, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        config = _handleConfig(config);
        return this._http.head(url, config).then(_handleResult(url, config), _handleErrorResult(url, config));
    }

    post<T = any>(url: string, data?: any, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        config = _handleConfig(config);
        return this._http.post(url, data, config).then(_handleResult(url, config), _handleErrorResult(url, config));

    }

    put<T = any>(url: string, data?: any, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        config = _handleConfig(config);
        return this._http.put(url, data, config).then(_handleResult(url, config), _handleErrorResult(url, config));
    }

    patch<T = any>(url: string, data?: any, config?: SipRequestConfig): Promise<SipHttpResult<T>> {
        url = _handleUrl(url);
        config = _handleConfig(config);
        return this._http.patch(url, data, config).then(_handleResult(url, config), _handleErrorResult(url, config));
    }

}
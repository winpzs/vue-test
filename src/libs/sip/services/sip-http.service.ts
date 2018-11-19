import { AxiosInstance } from 'axios';
import mvueCore from 'mvue-core';
import { SipHttpConfig, SipHttpHelper, SipHttpResult } from '../base/sip-http-base';
import { SipInjectable, SipInjectableScope } from '../vue-extends/decorators/sip-inject';
import { SipService } from "../vue-extends/sip-service";

@SipInjectable({ scope: SipInjectableScope.root })
export class SipHttpService extends SipService {

    private _http: AxiosInstance;
    constructor(component: any) {
        super(component);
        this._http = mvueCore.http;
    }

    request<T = any>(config: SipHttpConfig): Promise<SipHttpResult<T>> {
        config = SipHttpHelper.handleConfig(config);
        return this._http.request(config).then(SipHttpHelper.handleResult('', config), SipHttpHelper.handleErrorResult('', config));
    }

    get<T = any>(url: string, params?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        if (params) {
            config || (config = {});
            config.params = params;
        }
        config = SipHttpHelper.handleConfig(config);
        return this._http.get(url, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

    delete<T = any>(url: string, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._http.delete(url, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

    head<T = any>(url: string, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._http.head(url, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

    post<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._http.post(url, data, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

    put<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._http.put(url, data, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

    patch<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._http.patch(url, data, config).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
    }

}
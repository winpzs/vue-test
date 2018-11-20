import { AxiosInstance } from 'axios';
import mvueCore from 'mvue-core';
import { SipHttpConfig, SipHttpDictResult, SipHttpHelper, SipHttpResult, SipHttpSqlConfig, SipHttpSqlResult } from '../base/sip-http-base';
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

    /**
     * 字典
     * @param code 
     * @param conStr 
     * @param config 
     */
    dict(code: string, conStr?: string, config?: SipHttpConfig): Promise<SipHttpResult<SipHttpDictResult[]>> {
        let params = { dictionaryCode: code, conStr: conStr };
        let url = SipHttpHelper.dictUrl(params, config || {});
        return this.get(url, params, config);
    }

    /**
     * 发送sql请求
     * @param config 
     */
    sql<T=any[]>(config: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        config = SipHttpHelper.handleSqlConfig(config);
        let url = config.url;
        config.url = undefined;
        return this.get(url, null, config).then(SipHttpHelper.handleSqlResult(url, config));
    }
     /**
     * 返回 sqlList数据
     */
    sqlList<T=any[]>(p: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        p = Object.assign({ url: SipHttpHelper.sqlUrl.list(p), pageSize: 999999 }, p);
        return this.sql(p);
    }

    /**
     * 通过sql形式，返回实体, 实体的boolean类型为true|false
     */
    sqlEntity<T=any>(p: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        p = Object.assign({ url: SipHttpHelper.sqlUrl.entity(p) }, p);
        return this.sql(p);
    }

    /**
     * 通过sql形式，返回原始的sql实体, 实体的boolean类型为1|0
     */
    sqlEntityEx<T=any>(p: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        p = Object.assign({ url: SipHttpHelper.sqlUrl.entityEx(p) }, p);
        return this.sql(p);
    }

    /**
     * 执行sql
     * @param p 
     */
    sqlExecute<T=any>(p: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        p = Object.assign({ url: SipHttpHelper.sqlUrl.execute(p) }, p);
        return this.sql(p);
    }

    /**
     * 插入sql, 返回新的实体
     * @param p 
     */
    sqlInsert<T=any>(p: SipHttpSqlConfig): Promise<SipHttpSqlResult<T>> {
        p = Object.assign({ url: SipHttpHelper.sqlUrl.insert(p) }, p);
        return this.sql(p);
    }
}
import { AxiosInstance } from 'axios';
import mvueCore from 'mvue-core';
import { SipHelper } from '../base/sip-helper';
import { SipMap } from '../base/sip-map';
import { SipHttpConfig, SipHttpDictResult, SipHttpHelper, SipHttpResult, SipHttpSqlConfig, SipHttpSqlResult } from '../http/sip-http-base';
import { SipInjectable } from '../vue-extends/decorators/sip-inject';
import { SipServiceBase } from '../vue-extends/sip-service-base';

@SipInjectable()
export class SipHttpService extends SipServiceBase {

    private _http: AxiosInstance = mvueCore.http;
    /**缓存 */
    private _cache: SipMap;
    private _cacheLoading: SipMap;
    /**防止冲突, 获取最后一次请求的数据 */
    private _conflict: SipMap;

    private _getHttpMethod(method: 'request' | 'get' | 'post' | 'delete' | 'head' | 'put' | 'patch', url: string, data: any, config: SipHttpConfig, args: any[]): Promise<any> {
        let isCache = config && config.cache === true;
        let key;
        if (isCache) {
            if (!this._cache) {
                this._cache = new SipMap();
                this._cacheLoading = new SipMap();
            }
            let keyObj = {
                method: method,
                url: url,
                datas: Object.assign({}, config && config.data, data),
                param: config && config.params
            };
            key = JSON.stringify(keyObj);
            let loading = this._cacheLoading.get(key);
            if (loading) {

            };
            let cache = this._cache.get(key);
            if (cache) return Promise.resolve(SipHttpHelper.deserializeResult(cache));
        }

        // Promise.resolve(isCache && this._cacheLoading.get(key)).then(function(loading){
        //     return isCache ? (!loading ? this._cache.get(key) : null) : null;
        // }).then(function(cache){
        //     let promise = !!cache ? Promise.resolve(SipHttpHelper.deserializeResult(cache)) : this._http[method].apply(this._http, args);
        //     return promise.then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
        // });

        let conflictKey = config && config.conflictKey;
        let isLast;
        if (conflictKey) {
            if (!this._conflict) this._conflict = new SipMap();
            let conflictId = SipHelper.makeAutoId();
            this._conflict.set(conflictKey, conflictId);
            isLast = function () {
                return this._conflict.get(conflictKey) == conflictId
            }.bind(this);
        }

        // return httpSubject.then()

        return new Promise((resolve, reject) => {

            let promise = this._http[method].apply(this._http, args).then(SipHttpHelper.handleResult(url, config), SipHttpHelper.handleErrorResult(url, config));
            promise.then((rs) => {
                if (isCache) this._cache.set(key, SipHttpHelper.serializeResult(rs));
                if (!isLast || isLast()) resolve(rs);
            }, (rs) => {
                if (isCache) this._cache.set(key, rs);
                if (!isLast || isLast()) reject(rs);
            });
        });

    }

    request<T = any>(config: SipHttpConfig): Promise<SipHttpResult<T>> {
        config = SipHttpHelper.handleConfig(config);
        return this._getHttpMethod('request', '', null, config, [config]);
    }

    get<T = any>(url: string, params?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        if (params) {
            config || (config = {});
            config.params = Object.assign({}, config.params, params);
        }
        config = SipHttpHelper.handleConfig(config);
        return this._getHttpMethod('get', url, null, config, [url, config]);
    }

    delete<T = any>(url: string, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._getHttpMethod('delete', url, null, config, [url, config]);
    }

    head<T = any>(url: string, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);
        return this._getHttpMethod('head', url, null, config, [url, config]);
    }

    post<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);

        let sendType = config && config.sendType;
        let formData = Object.assign({}, config.data, data);
        if (sendType == 'form') {
            formData = SipHttpHelper.makeFormData(formData, config);
        }

        return this._getHttpMethod('post', url, formData, config, [url, formData, config]);
    }

    put<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);

        let sendType = config && config.sendType;
        let formData = Object.assign({}, config.data, data);
        if (sendType == 'form') {
            formData = SipHttpHelper.makeFormData(formData, config);
        }

        return this._getHttpMethod('put', url, formData, config, [url, formData, config]);
    }

    patch<T = any>(url: string, data?: any, config?: SipHttpConfig): Promise<SipHttpResult<T>> {
        url = SipHttpHelper.handleUrl(url);
        config = SipHttpHelper.handleConfig(config);

        let sendType = config && config.sendType;
        let formData = Object.assign({}, config.data, data);
        if (sendType == 'form') {
            formData = SipHttpHelper.makeFormData(formData, config);
        }

        return this._getHttpMethod('patch', url, formData, config, [url, formData, config]);
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
        config.url || (config.url = SipHttpHelper.sqlUrl.pageList(config));
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

    private _preloads: Promise<any>[];

    _preloadPush(promise: Promise<any>) {
        (this._preloads || (this._preloads = [])).push(promise);
    }

    _preloadDone(): Promise<any> {
        let promise = Promise.all(this._preloads || []);
        this._preloads = null;
        return promise;
    }
}
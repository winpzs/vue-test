import { SipHelper } from "../base/sip-helper";
import { SipType } from "../base/sip-type";
import { SipHttpConfig, SipHttpDictResult, SipHttpResult, SipHttpSqlConfig, SipHttpSqlResult } from "./sip-http-base";
import { SipHttpService } from './sip-http.service';


export interface SipHttpDefConfigBase<T=any> extends SipHttpConfig {
    //改造数据
    handle?: (rs: SipHttpResult<T>, target?: any) => SipHttpResult<T>;
    //数据模型
    model?: SipType<any>;
}

export interface SipHttpDefConfig<T=any> extends SipHttpDefConfigBase<T> {
    defMethod?: 'post' | 'get' | 'delete' | 'put' | 'request' | 'head' | 'patch';
}

export interface SipHttpDefFunction<Input, Output> {
    (data?: Input, config?: SipHttpDefConfig<Output>): Promise<SipHttpResult<Output>>;
}

export function SipHttpDef<T=any>(defConfig: SipHttpDefConfig<T>) {
    return function (target: any, propKey: string) {

        Object.defineProperty(target, propKey, {
            configurable: false,
            get: function () {
                return function (p?: any, config?: any): any {
                    let tempConfig: SipHttpDefConfig<T> = Object.assign({}, defConfig, config);
                    let datas = Object.assign({}, defConfig.data, p);
                    let url = tempConfig.url;
                    tempConfig.data = tempConfig.url = null;
                    let http: SipHttpService = this.$http;
                    let method = tempConfig.defMethod;
                    let obs: Promise<SipHttpResult<any>>;
                    switch (method) {
                        case 'post':
                            obs = http.post(url, datas, tempConfig);
                            break;
                        case 'patch':
                            obs = http.patch(url, datas, tempConfig);
                            break;
                        case 'delete':
                            obs = http.delete(url, tempConfig);
                            break;
                        case 'put':
                            obs = http.put(url, datas, tempConfig);
                            break;
                        case 'head':
                            obs = http.head(url, tempConfig);
                            break;
                        case 'request':
                            obs = http.request(tempConfig);
                            break;
                        case 'get':
                        default:
                            obs = http.get(url, datas, tempConfig);
                            break;
                    }
                    let model = tempConfig.model;
                    let handleFn = tempConfig.handle;
                    if (handleFn || model) {
                        obs = obs.then((rs) => {
                            let data = rs.data;
                            if (model && data) {
                                if (SipHelper.isArray(data))
                                    data = data.map(function (item) { return new model(item); });
                                else
                                    data = new model(data);
                                rs.data = data;
                            }
                            return handleFn ? handleFn(rs, this) : rs;;
                        });
                    }
                    return obs;
                }.bind(this);
            }
        });
    };
}

export interface SipHttpSqlDefConfig<T=any> extends SipHttpSqlConfig, SipHttpDefConfigBase<T> {
    sqlType?: 'PageList' | 'List' | 'Execute' | 'Insert' | 'Entity' | 'EntityEx';
}

export interface SipHttpSqlDefFunction<Input, Output> {
    (data?: Input, config?: SipHttpSqlDefConfig<Output>): Promise<SipHttpSqlResult<Output>>;
}

export function SipHttpSqlDef<T=any>(defConfig: SipHttpSqlDefConfig<T>) {
    return function (target: any, propKey: string) {

        Object.defineProperty(target, propKey, {
            configurable: false,
            get: function () {
                return function (p?: any, config?: any): any {
                    let tempParams: SipHttpSqlDefConfig<T> = Object.assign({}, defConfig, config);
                    tempParams.searchparam = Object.assign({}, tempParams.searchparam, p);
                    let http: SipHttpService = this.$http;
                    let sqlType = tempParams.sqlType;
                    let obs: Promise<SipHttpSqlResult<any>>;
                    switch (sqlType) {
                        case 'PageList':
                            obs = http.sql(Object.assign({ pageSize: 10 }, tempParams));
                            break;
                        case 'Entity':
                            obs = http.sqlEntity(tempParams);
                            break;
                        case 'EntityEx':
                            obs = http.sqlEntityEx(tempParams);
                            break;
                        case 'Execute':
                            obs = http.sqlExecute(tempParams);
                            break;
                        case 'Insert':
                            obs = http.sqlInsert(tempParams);
                            break;
                        case 'List':
                        default:
                            obs = http.sqlList(Object.assign({ pageSize: 999 }, tempParams));
                            break;
                    }
                    let model = tempParams.model;
                    let handleFn = tempParams.handle;
                    if (handleFn || model) {
                        obs = obs.then((rs) => {
                            let data = rs.data;
                            if (model && data) {
                                if (SipHelper.isArray(data))
                                    data = data.map(function (item) { return new model(item); });
                                else
                                    data = new model(data);
                                rs.data = data;
                            }
                            let ret:any = handleFn ? handleFn(rs, this) : rs;
                            return ret;
                        });
                    }
                    return obs;
                }.bind(this);
            }
        });
    };
}

export interface SipHttpDictDefConfig extends SipHttpDefConfigBase<SipHttpDictResult[]> {
    code?: string;
    conStr?: string;
}

export interface SipHttpDictDefFunction {
    (config?: SipHttpDictDefConfig): Promise<SipHttpResult<SipHttpDictResult[]>>;
}

export function SipHttpDictDef<T=any>(defConfig: SipHttpDictDefConfig) {
    return function (target: any, propKey: string) {

        Object.defineProperty(target, propKey, {
            configurable: false,
            get: function () {
                return function (config?: any): any {
                    let tempParams: SipHttpDictDefConfig = Object.assign({}, defConfig, config);
                    let tempCode: string = tempParams.code || defConfig.code;
                    let tempConStr: string = tempParams.conStr || defConfig.conStr;
                    tempParams.code = tempParams.conStr = null;

                    let http: SipHttpService = this.$http;
                    let obs: Promise<any> = http.dict(tempCode, tempConStr, tempParams);;
                    return obs;
                }.bind(this);
            }
        });
    };
}

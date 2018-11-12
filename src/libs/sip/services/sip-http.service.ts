import { AxiosPromise, AxiosRequestConfig } from 'axios';
import mvueCore from 'mvue-core';
import { SipInjectable, SipInjectableScope } from '../vue-extends';
import { SipService } from "../vue-extends/sip-service";

@SipInjectable({ scope: SipInjectableScope.root })
export class SipHttpService extends SipService {

    http(p?: AxiosRequestConfig): AxiosPromise {
        console.log('mvueCore.http', mvueCore.http);
        return mvueCore.http(p);
    }

}
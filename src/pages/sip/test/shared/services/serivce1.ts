import { SipInject, SipInjectable, SipService } from "@libs/sip";
import { Service2 } from "./serivce2";

let _id = 0;

@SipInjectable()
export class Service1 extends SipService {
    constructor(componet:any){
        super(componet);
        _id++;
        this.name = ['Sevice1', _id].join('-');
    }

    name:string;

    @SipInject(Service2)
    srvs2:Service2;

    get name2(){
        return this.srvs2.name;
    }
}
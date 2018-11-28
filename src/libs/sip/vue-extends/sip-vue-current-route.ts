export interface SipVueCurrentRoute {
    "name": string;
    "meta": { [key: string]: any };
    "path": string;
    "hash": string;
    "query": { [key: string]: any };
    "params": { [key: string]: any };
    "fullPath": string;
    "matched": any[];
}
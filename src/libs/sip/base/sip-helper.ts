import querystring from 'querystring';

let stringEmpty = "",
    toString = Object.prototype.toString,
    core_hasOwn = Object.prototype.hasOwnProperty,
    slice = Array.prototype.slice;

function testObject(obj: any) {
    if (obj.constructor &&
        !core_hasOwn.call(obj, "constructor") &&
        !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
    }
}

export class SipHelper {
    static stringEmpty = stringEmpty;

    static noop() { }

    static hasOwnProp(obj: any, prop: string) {
        return core_hasOwn.call(obj, prop);
    }

    static trace(e: any) {
        console.error && console.error(e.stack || e.message || e + '');
    }

    static isType(typename: string, value: any) {
        //typename:String, Array, Boolean, Object, RegExp, Date, Function,Number //兼容
        //typename:Null, Undefined,Arguments    //IE不兼容
        return toString.apply(value) === '[object ' + typename + ']';
    }

    static toStr(p: any): string {
        return SipHelper.isNull(p) ? '' : p.toString();
    }

    static isUndefined(obj: any) {
        ///<summary>是否定义</summary>

        return (typeof (obj) === "undefined" || obj === undefined);
    }

    static isNull(obj: any) {
        ///<summary>是否Null</summary>

        return (obj === null || SipHelper.isUndefined(obj));
    }

    static isBoolean(obj: any) {
        return SipHelper.isType("Boolean", obj);
    }

    static isNullEmpty(s: any) {
        return (SipHelper.isNull(s) || s === stringEmpty);
    }

    static isFunction(fun: any) {
        return SipHelper.isType("Function", fun);
    }

    static isNumeric(n: any) {
        //return cmpx.isType("Number", n) && !isNaN(n) && isFinite(n);;
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    static isString(obj: any) {
        return SipHelper.isType("String", obj);
    }

    static isObject(obj: any) {
        return obj && SipHelper.isType("Object", obj)
            && !SipHelper.isElement(obj) && !SipHelper.isWindow(obj);//IE8以下isElement, isWindow认为Object
    }

    static isPlainObject(obj: any) {
        if (!SipHelper.isObject(obj)) return false;

        try {
            if (testObject(obj) === false) return false;
        } catch (e) {
            return false;
        }

        var key;
        for (key in obj) { }

        return key === undefined || core_hasOwn.call(obj, key);
    }

    static isArray(value: any) {
        return Array.isArray ? Array.isArray(value) : SipHelper.isType("Array", value);
    }

    static isWindow(obj: any) { return !!(obj && obj == obj.window); }

    static isElement(obj: any) { var t = obj && (obj.ownerDocument || obj).documentElement; return t ? true : false; }

    static trim(str: string, newline?: boolean) {
        if (str) {
            return newline ? str.replace(/^(?:\s|\u3000|\ue4c6|\n|\r)*|(?:\s|\u3000|\ue4c6|\n|\r)*$/g, '') :
                str.replace(/^(?:\s|\u3000|\ue4c6)*|(?:\s|\u3000|\ue4c6)*$/g, '');
        } else {
            return '';
        }
    }

    static replaceAll(s: string, str: string, repl: string, flags: string = "g") {
        if (SipHelper.isNullEmpty(s) || SipHelper.isNullEmpty(str)) return s;
        str = str.replace(/([^A-Za-z0-9 ])/g, "\\$1");
        s = s.replace(new RegExp(str, flags), repl);
        return s;
    }

    static inArray(list: Array<any>, p: any, thisArg: any = null): number {
        var isF = SipHelper.isFunction(p),
            index = -1;
        SipHelper.each(list, (item, idx) => {
            var ok = isF ? p.call(thisArg, item, idx) : (item == p);
            if (ok) {
                index = idx;
                return false;
            }
        }, thisArg);
        return index;
    }

    static toArray(p: any, start: number = 0, count: number = Number.MAX_VALUE): Array<any> {
        return p ? slice.apply(p, [start, count]) : p;
    }

    static arrayToObject<T>(array: Array<T>, fieldName: string): { [name: string]: T } {
        var obj: { [name: string]: T } = {};
        SipHelper.each(array, function (item: any, index: number) {
            obj[item[fieldName]] = item;
        });
        return obj;
    }

    static each(list: any, fn: (item: any, idx: number) => any, thisArg: any = null) {
        if (!list) return;
        var len = list.length;
        for (let i = 0, len = list.length; i < len; i++) {
            if (fn.call(thisArg, list[i], i) === false) break;
        }
    }

    static eachProp(obj: any, callback: (item: any, name: string) => void, thisArg: any = null) {
        if (!obj) return;
        var item;
        for (var n in obj) {
            if (SipHelper.hasOwnProp(obj, n)) {
                item = obj[n];
                if (callback.call(thisArg, item, n) === false) break;
            }
        }
    }

    /**
     * 扩展obj, 返回obj
     * @param obj 扩展到Obj
     * @param args 扩展源
     */
    static extend(obj: object, ...args: object[]): object {
        if (obj) {
            SipHelper.each(args, function (p: object) {
                p && SipHelper.eachProp(p, function (item: string, name: string) { obj[name] = item; });
            });
        }
        return obj;
    }

    static makeAutoId() {
        var t = new Date().valueOf();
        if ((++_tick) > 100000) _tick = 0;
        return [t, _tick].join('_');
    }

    /**
     * 是否属于类或基类
     * @param p 参数
     * @param cls 类
     */
    static isClass(p, cls) {
        return p ? (p == cls || (p.prototype && p.prototype instanceof cls)) : false;
    }

    static isComponent(cls: any): boolean {
        return !!cls && ('cid' in cls && 'options' in cls);
    }

    static offset(element: HTMLElement, offset?: { top: number; left: number; }): { top: number; left: number; } {
        if (offset) {
            let curOffset = SipHelper.offset(element);
            return {
                top: offset.top - curOffset.top,
                left: offset.left - curOffset.left
            }
        } else {
            let box;
            if (element.getBoundingClientRect)
                box = element.getBoundingClientRect();
            let win = window, docElem = document.documentElement;
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }
        }
    }

    /**
     * setQuerystring
     * @param url 
     * @param p 
     * @param json 如果为true , 属性内容 Array 或 Object 转为JSON
     */
    static setQuerystring(url: string, p: object, json?: boolean): string {
        if (!p) return url;
        let [href, queryStr] = _querystring(url || '');
        let query = queryStr ? querystring.parse(queryStr) : {};
        SipHelper.eachProp(p, function (item, name) {
            item || (item = '');
            query[name] = json === true && (SipHelper.isArray(item) || SipHelper.isObject(item)) ? JSON.stringify(item) : item
        });
        return [href || '', querystring.stringify(query)].join('?');
    }

    static getQuerystring(url: string, name?: string): string {
        if (!url) return '';
        let [href, queryStr] = _querystring(url);
        if (!name) return queryStr || '';
        let query: object = queryStr ? querystring.parse(queryStr) : {};
        return query[name] || '';
    }
}
let _tick = 0;

function _querystring(url: string): string[] {
    return url ? url.split('?') : ['', ''];
}

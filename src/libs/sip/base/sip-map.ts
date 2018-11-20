
export class SipMap<T=any> {
    datas: Array<[string, T]> = [];
    private _index(key: string): number {
        return this.datas.findIndex(function (item) {
            return item[0] == key;
        });
    }
    private _getItem(key: string) {
        let index = this._index(key);
        return index > -1 ? this.datas[index] : null;
    }
    set(key: string, value: any) {
        let item = this._getItem(key);
        if (item) {
            item[1] = value;
        } else {
            this.datas.push([key, value]);
        }
    }
    get(key: string): T {
        let item = this._getItem(key);
        return item && item[1];
    }
    has(key: string): boolean {
        let index = this._index(key);
        return index > -1;
    }
    remove(key: string): T {
        let index = this._index(key);
        if (index > -1) {
            let item = this.datas.splice(index, 1)[0]
            return item && item[1];
        }
    }
    removeAll() {
        this.datas = [];
    }
}
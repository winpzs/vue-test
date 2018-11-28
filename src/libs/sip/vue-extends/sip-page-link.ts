
let _id = 0;
function _getId() {
    _id++;
    if (_id > 99)
        _id = 1;
    return _id;
}

export class SipPageLink {
    private _list = [];

    readonly id = _getId();

    readonly timeOut = new Date().valueOf() + 10000;

    send(...args: any[]) {
        this._list.forEach(function (item) {
            item && item(...args);
        });
    }

    receive(callback: (...args: any[]) => void): SipPageLink {
        this._list.push(callback);
        return this;
    }
}

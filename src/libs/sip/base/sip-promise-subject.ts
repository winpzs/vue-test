
/**Promise 主题 */
export class SipPromiseSubject<T=any> {
    private _resolve: (p: any) => void;
    private _reject: (p: any) => void;
    private _promise = new Promise<T>((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
    });

    private _clear() {
        this._reject = this._resolve = null;
    }

    toPromise(): Promise<T> {
        return this._promise;
    }

    /**
     * 同意(决定)， 只能使用一次
     * @param p 
     */
    resolve(p: any) {
        this._resolve && this._resolve(p);
        this._clear();
    }

    /**
     * 拒绝， 只能使用一次
     * @param p 
     */
    reject(p: any) {
        this._reject && this._reject(p);
        this._reject = null;
        this._clear();
    }

    complete() {
        this._clear();
    }

    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this._promise = this._promise.then.apply(this._promise, arguments);
    }
}
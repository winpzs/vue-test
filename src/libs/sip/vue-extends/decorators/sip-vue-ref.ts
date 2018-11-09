
export function SipVueRef(ref?:string) {

    return function (target: any, propKey: string) {
        Object.defineProperty(target, propKey, {
            configurable: false,
            enumerable: true,
            get: function () {
                return this.$refs[ref || propKey];
            }
        });
    };
}

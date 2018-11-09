
const _decTargetKey = '_$sip_dec_object_';

/**获取target描述对象, isInit默认为true(如果不存在自己初始化对象) */
function _getTargetDecorator(target: any, isInit?: boolean) {
    if (isInit === false) {
        return target[_decTargetKey];
    }
    let decObject = target[_decTargetKey];
    if (decObject) {
        // console.log('target.hasOwnProperty(_decTargetKey)', target.hasOwnProperty(_decTargetKey), _decTargetKey);
        if (!target.hasOwnProperty(_decTargetKey))
            decObject = target[_decTargetKey] = Object.assign({}, decObject);
    } else
        decObject = target[_decTargetKey] = {};
    return decObject
}

export const SipDecorator = {
    getProp: function (target: any, propKey: string) {
        let decObject = _getTargetDecorator(target, false);
        return decObject && decObject[propKey];
    },
    setProp: function (target: any, propKey: string, value: any) {
        _getTargetDecorator(target)[propKey] = value;
    },
    initProp: function (target: any, propKey: string, defaultValue?: any) {
        let decObject = _getTargetDecorator(target);
        return decObject[propKey] || (decObject[propKey] = defaultValue);
    }
    // checkVueExtend:function(target:any, key:string):boolean{
    //     if (!target.hasOwnProperty(key)){
    //         target[key] = target[key];
    //         return false;
    //     }
    //     return true;
    // }
};

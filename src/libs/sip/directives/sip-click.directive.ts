import _ from "lodash";

// function _getDownList(comp) {
//     if (!comp) return null;
//     let el = comp.$el;
//     if (el && el.classList) {
//         if (el.classList.contains('ivu-dropdown'))
//             return comp;
//     }
//     return _getDownList(comp.$parent);
// }

export const sipClickDirective = {
    inserted(el, binding, vnode, oldVnode) {
        // let downList = _getDownList(vnode.componentInstance);
        let value = binding.value;
        if (value) {
            if (_.isFunction(value)) {
                value = {
                    fn: value
                };
            }
            let fn = function () {
                setTimeout(function(){
                    value.fn.apply(vnode.context, value.params || []);
                }, 1);
            };
            el.addEventListener('click', fn);

            el._sip_click_1212 = fn;
            // downList.$on('on-click', fn);
        }
    },
    unbind(el, binding, vnode) {
        let fn = el._sip_click_1212;
        fn && el.removeEventListener('click', fn);
        // p && p.downList.$off('on-click', p.fn);
        el._sip_click_1212 = null;
    }
};
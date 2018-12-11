
function _getDownList(comp) {
    if (!comp) return null;
    let el = comp.$el;
    if (el && el.classList) {
        if (el.classList.contains('ivu-dropdown'))
            return comp;
    }
    return _getDownList(comp.$parent);
}

export const sipDropdownClickDirective = {
    inserted(el, binding, vnode, oldVnode) {
        let downList = _getDownList(vnode.componentInstance);
        if (downList) {
            let value = binding.value;
            if (value && value.fn) {
                let fn = function () {
                    value.fn.apply(vnode.context, value.params);
                };
                el._sip_dropwown_click = {
                    fn:fn,
                    downList:downList
                };
                downList.$on('on-click', fn);
            }
        }
    },
    unbind(el, binding, vnode) {
        let p = el._sip_dropwown_click;
        p && p.downList.$off('on-click', p.fn);
        el._sip_dropwown_click = null;
    }
};
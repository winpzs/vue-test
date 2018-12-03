import { SipBusinessComponent, SipClosestComponent } from '../vue-extends/sip-component';

function getBusiness(vnode: any): SipBusinessComponent {
    let owner: any = vnode.context;
    let business = SipClosestComponent(owner, SipBusinessComponent);
    return business;
}

function func(el, binding, vnode, oldVnode) {

    let business = getBusiness(vnode);
    let accessManager = business && business.$accessManager;
    if (accessManager) {
        let key = binding.value;
        let accessItem = accessManager.getAccessItem(key);
        let check = function () {
            let isAccess = accessManager.isAccess(key);

            let disabled = !isAccess;

            el.disabled = disabled;
            let className = accessItem ? accessItem.className : 'disabled';
            if (disabled)
                el.classList.add(className);
            else
                el.classList.remove(className);
        };
        el._sip_access_check = check;
        accessManager.onCheck(check);
    }

}

export const sipAccessDirective = {
    bind() {
        func.apply(this, arguments);
    },
    update() {
        func.apply(this, arguments);
    },
    unbind(el, binding, vnode) {
        let business = getBusiness(vnode);
        let accessManager = business && business.$accessManager;
        accessManager && accessManager.removeCheck(el._sip_access_check);
    }
};
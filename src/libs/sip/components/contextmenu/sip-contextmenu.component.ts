import _ from "lodash";
import { SipHelper } from '../../base/sip-helper';
import { SipLibDirectives } from "../../directives";
import { SipVueComponent } from "../../vue-extends/decorators/sip-vue-property-decorator";
import { SipVueRef } from "../../vue-extends/decorators/sip-vue-ref";
import { SipComponent } from "../../vue-extends/sip-component";
import { SipContextmenuItem } from "./sip-contextmenu-item";

@SipVueComponent({
    directives:{
        ...SipLibDirectives
    }
})
export default class SipContextmenuComponent extends SipComponent {

    @SipVueRef('contextMenu')
    private contextMenu: any;

    show(p: { left: number; top: number }, items: SipContextmenuItem[])
    show(p: MouseEvent, items: SipContextmenuItem[])
    show(p: any, items: SipContextmenuItem[]) {
        let pos;
        if ('target' in p || 'srcElement' in p) {
            p.preventDefault();
            p.stopPropagation();
            let offset = document.documentElement.getBoundingClientRect();
            let left = p.pageX + offset.left;
            let top = p.pageY + offset.top;

            pos = { left: left, top: top };
        } else {
            pos = Object.assign({}, p);
        }
        pos.left += 'px';
        pos.top += 'px';

        if (this.contextMenu.currentVisible) {
            this.contextMenu.currentVisible = false;
        }
        this.styles = pos;
        _.forEach(items, function(item){
            item.id || (item.id = SipHelper.makeAutoId());
        });
        this.items = items || [];

        this.$nextTick(() => {
            this.contextMenu.currentVisible = true;
        });


        return false;
    }

    click(item:SipContextmenuItem){
        item.click && item.click(item);
    }

    items: SipContextmenuItem[] = [];

    styles = {};
}
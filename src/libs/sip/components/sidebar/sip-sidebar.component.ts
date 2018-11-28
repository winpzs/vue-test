import Component from 'vue-class-component';
import { SipVueProp } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@Component({})
export default class SipSidebarComponent extends SipComponent {

    @SipVueProp({
        type: Array,
        default: function () {
            return [];
        }
    }) menus: any[];

    @SipVueProp({
        type: Boolean,
        default: true,
    }) accordion: any[];

    isCollapsed = false;
    isShow = true;
    localMenus = null;//  _.cloneDeep(this.menus);
    openNames = [];
    activeName = "";
    menuMappings = {};

    scrollOps = {
        vuescroll: {
            mode: 'native'
        },
        scrollContent: {
            padding: true
        },
        bar: {
            onlyShowBarOnScroll: false,
            delayTime: 3000,
            vBar: {
                background: "#ccc",
                keepShow: false,
                hover: true
            }
        }
    };

    get menuitemClasses() {
        return [
            'menu-item',
            this.isCollapsed ? 'collapsed-menu' : ''
        ]
    }

}
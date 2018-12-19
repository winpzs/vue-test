import cloneDeep from 'lodash/cloneDeep';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import { SipVueMounted } from '../../vue-extends/decorators/sip-vue-lifecycle';
import { SipVueComponent, SipVueProp, SipVueWatch } from '../../vue-extends/decorators/sip-vue-property-decorator';
import { SipComponent } from '../../vue-extends/sip-component';

@SipVueComponent({})
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
    localMenus = cloneDeep(this.menus);
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

    @SipVueMounted()
    private mounted1() {
        const that = this;
        // lodash.debounce 是一个通过 lodash 限制操作频率的函数。
        // window.onresize = lodash.debounce(() => {
        //     //that.mainHeight = document.documentElement.clientHeight - 48;
        // }, 400);
        this.prepare();
        this.setActiveMenu();

    }

    @SipVueWatch('menus', { immediate: true, deep: true })
    private watchMenus(value: string, oldValue: string) {
        this.localMenus = cloneDeep(this.menus);
        this.prepare();
    }

    setActiveMenu() {//设置导航菜单选中
        let _this = this;
        let matchedMenu = null;
        for (var i = this.$currentRoute.matched.length - 1; i >= 0; i--) {
            if (matchedMenu != null) {
                break;
            }
            var curRouter = this.$currentRoute.matched[i];
            forEach(this.menuMappings as any[], function (menu, key) {
                if (curRouter.name == menu.id
                    || curRouter.name == menu.name
                    || curRouter.path == menu.path) {
                    matchedMenu = menu;
                    return false;
                }
                if (curRouter.meta && !isEmpty(curRouter.meta["menu"])) {
                    var routerMenu = curRouter.meta["menu"];
                    if (routerMenu == menu.id
                        || routerMenu == menu.name) {
                        matchedMenu = menu;
                        return false;
                    }
                }
            });
        }

        if (matchedMenu != null) {
            _this.activeName = matchedMenu.id;
            _this.openNames = [];
            var parentMenu = this.menuMappings[matchedMenu.parentId];
            while (parentMenu != null) {
                _this.openNames.push(parentMenu.id);
                parentMenu = this.menuMappings[parentMenu.parentId];
            }
            _this.$nextTick(function () {
                let leftMenus:any = _this.$refs.leftMenus;
                leftMenus.updateOpened();
                leftMenus.updateActiveName();
            });
        }
    }
    onMenuSelected(name) {
        if (name) {
            var selectedMenu = this.menuMappings[name];
            if (isEmpty(selectedMenu) || isEmpty(selectedMenu.url)) {
                alert("菜单定义数据有误");
                return;
            }
            var toPath = selectedMenu.url;
            if (toPath.indexOf("#") >= 0) {
                toPath = toPath.substring(toPath.indexOf("#") + 1);
            } else {
                toPath = "/";
            }
            console.log('toPath', toPath, this.localMenus);
            this.$open(toPath);
            // if (context.getWebContext().inSamePage(selectedMenu.url)) {
            //     var toPath = selectedMenu.url;
            //     if (toPath.indexOf("#") > 0) {
            //         toPath = toPath.substring(toPath.indexOf("#") + 1);
            //     } else {
            //         toPath = "/";
            //     }
            //     this.$open(toPath);
            // } else {
            //     window.location = selectedMenu.url;
            // }
        }
    }
    onSubMenuOpened(name) {

    }
    prepare() {
        var _this = this;
        if (!(_this.localMenus && _this.localMenus.length)) {//如果菜单为空
            return;
        }
        _this.visitTree(_this.localMenus, function (menu) {
            var menuId = menu.id;
            if (menu.url && menu.url.indexOf("#") > 0) {
                menu["path"] = menu.url.substring(menu.url.indexOf("#") + 1);
            } else {
                menu["path"] = "/";
            }
            _this.menuMappings[menuId] = menu;
        });
        _this.setActiveMenu();
    }
    visitTree(tree, processor) {
        var self = this;
        forEach(tree, function (node, index) {
            if (processor) {
                processor(node, tree, index);
            }
            if (node.children) {
                self.visitTree(node.children, processor);
            }
        });
    }


}
<style lang="scss">
@import "./home.scss";
</style>
<template>
  <div
    class="layout"
    v-bind:class="{'layout-header-hide': hide('top') , 'layout-hide-menu' :hide('left') }"
  >
    <b-header v-if="!hide('top')">
      <template slot="right">
        <ul class="topbar-menu">
          <li>
            <Tooltip content="首页" placement="bottom">
              <router-link :to="{name:'default'}">
                <Button type="text" icon="ios-home"></Button>
              </router-link>
            </Tooltip>
          </li>
        </ul>
      </template>
    </b-header>
    <Layout :class="'ivu-layout-has-sider'" class="layout-content">
      <b-menu v-if="!hide('left')" :menus="menu"></b-menu>
      <Content>
        <b-router-tab></b-router-tab>
        <div class="bvue-page-tabcontent" v-if="hasRouter">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
import { menuService } from "mvue-components";
import mvueCore from "mvue-toolkit";
export default {
  data: function() {
    return {
      hasRouter: true,
      menu: [
        {
          title: "test-http",
          id: "test-2222",
          children: [
            {
              title: "test-http",
              id: "test-http11111",
              url: "#/pages/sip/test/test-http"
            },
            {
              title: "test-router",
              id: "test-router-11111",
              url: "#/pages/sip/test/test-router"
            }
          ]
        }
      ]
    };
  },
  computed: {
    keepAlive: function() {
      console.log("this.$route", this.$route);
      return this.$route.meta.keepAlive;
    }
  },
  created: function() {
    /**sip 使用 */
    this.$root.$sipHome = this;
  },
  mounted: function() {},
  methods: {
    sipOpen(path, params, isMain) {
      return new Promise((resolve) => {
        isMain = isMain !== false;
        // params = Object.assign({}, params);
        /**
         * 如果为main， 删除原来的router-view（复用），释放内存
         * 思维：每个功能的列表管理页面为(main), 由其打开页面为子页面（如：详情页面）
         * 即当切换功能时，释放内存， 每个功能里所有页面(列表，详情，修改...)为一次内存复用
         */
        this.hasRouter = !isMain;
        setTimeout(() => {
          this.hasRouter = true;/** 重做 router-view */
          this.$router.push(
            { path: path, params:params, query:params },
            route => resolve(route),
            route => resolve(route)
          );
        }, 1);
      });
    },
    hide(type) {
      var types = this.$route.query._hide;
      if (!types) {
        return false;
      }
      types = types.split(",");
      return _.includes(types, type);
    },
    isAutoPages() {
      return false;
      var key = this.$route.path;
      if (_.startsWith(key, "/pages/")) {
        return true;
      }
      return false;
    }
  }
};
</script>

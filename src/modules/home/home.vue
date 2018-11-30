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
      <sip-sidebar v-if="!hide('left')" :menus="menu"></sip-sidebar>
      <Content>
        <b-router-tab></b-router-tab>
        <div class="bvue-page-tabcontent">
          <keep-alive :include="keepAlives">
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
import sipSidebar from "@libs/sip/components/sidebar/sip-sidebar.component.vue";
export default {
  components:{
    'sip-sidebar': sipSidebar
  },
  data: function() {
    return {
      /**缓存母页（这里指有子页面，即由此页打开子页面） */
      keepAlives: [],
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
              title: "test-router1",
              id: "test-router-11111",
              url: "#/pages/sip/test/test-router"
            },
            {
              title: "test-modal",
              id: "test-modal-11111",
              url: "#/pages/sip/test/test-modal"
            }
          ]
        }
      ]
    };
  },
  render(h){
        console.log('render111 ')
        return h('div', {})

    },
  computed: {
    // keepAlive: function() {
    //   return this.$route.meta.keepAlive;
    // }
  },
  // beforeRouteUpdate (to, from, next) {
  //   // this.post = null
  //   // console.log('beforeRouteUpdate', to, from);
  //   next();
  // },
  created: function() {
    /**sip 使用 */
    this.$root.$sipHome = this;
  },
  mounted: function() {

  },
  methods: {
    setKeepAlives:function(name){
      var keepAlives = this.keepAlives;
      var index = keepAlives.indexOf(name);
      if (index>=0){
        this.keepAlives = keepAlives.slice(0, index + 1)
      } else {
        this.keepAlives = [name];
      }
    },
    sipOpen(vueName, path, query, params) {
      return new Promise((resolve) => {
      this.setKeepAlives(vueName);
        setTimeout(() => {
          this.$router.push(
            { path: path, params:params, query:query },
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

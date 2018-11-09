<style lang="scss">
  @import "./home.scss";
</style>
<template>
  <div class="layout" v-bind:class="{'layout-header-hide': hide('top') , 'layout-hide-menu' :hide('left') }">
    <b-header v-if="!hide('top')">
      <template slot="right">
        <ul class="topbar-menu">
          <li>
            <Tooltip content="首页" placement="bottom">
              <router-link :to="{name:'default'}">
                <Button type="text" icon="ios-home" ></Button>
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
        <!--自动生成的页面不缓存组件-->
        <div class="bvue-page-tabcontent" v-if="isAutoPages()">
          <router-view :key="$route.fullPath"></router-view>
        </div>
        <div class="bvue-page-tabcontent" v-else>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
  import { menuService } from "mvue-components";
  import  mvueCore from 'mvue-toolkit';
  export default {
    data: function () {
      return {
        menu: [],
      }
    },
    mounted: function () {
      const self = this;
      if(mvueCore.config.getConfigVal("settings.menu.remote")){
        menuService().published({ orderby: "displayOrder asc" }).then(function ({ data }) {
          self.menu = data;
        });
      }else{
        menuService().local({ orderby: "displayOrder asc" }).then(function ({ data }) {
          self.menu = data;
        });
      }
    },
    methods:{
      hide(type){
        var types=this.$route.query._hide;
        if(!types){
          return false;
        }
        types=types.split(",");
        return _.includes(types,type);
      },
      isAutoPages(){
        var key=this.$route.path;
        if(_.startsWith(key,"/pages/")){
          return true;
        }
        return false;
      }
    }
  }
</script>

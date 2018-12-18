//这几个工具类必须在最前面引用，不得删除和更改
import  $lodash from "./lodash_loader";
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import newStore from '../store';
import mvueToolkit from "mvue-toolkit";
import vuescroll from 'vuescroll';
import context from 'libs/context';
window.$ = require('libs/zepto');

import 'vuescroll/dist/vuescroll.css';
import 'mvue-design/dist/index.css';
import "vue-multiselect/dist/vue-multiselect.min.css" ;
import '../../static/styles/sip.css';
function appStart(initFunc,postStarted) {
  require("babel-polyfill");
  mvueToolkit.config.loadServerConfig().then(()=>{
    Promise.all([
      import('iview')
    ]).then(function ([iview]) {
      var VueRouter = require("vue-router").default;
      var mvueComponents=require('mvue-components').default;
      Vue.use(mvueToolkit,{
        baseUrlForResource:mvueToolkit.config.getApiBaseUrl()
      });
      Vue.use(VueRouter);
      Vue.use(iview);
      Vue.use(mvueComponents,{mvueToolkit:mvueToolkit});
      Vue.use(vuescroll);
      context.setMvueToolkit(mvueToolkit);
      var globalComponentsInit=require('./global_components').default;
      globalComponentsInit(Vue);
      //路由引入
      var routesData=null,appEntry=null;
      var store = newStore(Vuex);
      //将vuex store对象设置到全局上下文
      context.setStore(store);
      var result=initFunc(context);
      if(result&&result.then){
        result.then(function(res){
          routesData=res.routesData;
          appEntry=res.appEntry;
          doStart()
        });
      }else{
        routesData=result.routesData;
        appEntry=result.appEntry;
        doStart()
      }
      function doStart(){
        var router = new VueRouter({
          routes: routesData
        });
        //将路由对象设置到全局上下文中
        context.setRouter(router);
        //将路由对象设置到组件上下文中
        mvueComponents.context.setRouter(router);
        var session=mvueToolkit.session;
        router.beforeEach(function(to, from, next) {
          session.doFilter(to,from,next);
        });
        router.afterEach(function (transition) {
          // console.log('-----------------Router Start');
          // console.log(transition);
          // console.log('-----------------Router End');
          if(window.parent && window.parent!=window){
              context.resizeParentIframeHeight();
          }
        });
        var App = appEntry;
        var vueApp=new Vue({
          el: '#app',
          router: router,
          store:store,
          template: '<App/>',
          components: {App},
          created:function () {
            context.setIframeId(this.$route.query["_iframeId"]);
          }
        });
        context.setVue(vueApp);
        if(postStarted){
          postStarted(context);
        }
      }
    }).catch(function (err) {
      console.error('Failed to load vue vue-router iview', err);
    });
  });
}

export default{
    appStart:appStart
}

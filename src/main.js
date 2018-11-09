import indexBase from 'libs/index_base'
import Vue from 'vue';
import mvueCore from 'mvue-core';
import autoPageConfs from './pages/auto-page-confs';


//每一个模块的入口，必须在init时初始化路由和应用入口组件
indexBase.appStart(function (ctx) {
  var routesData = require('./router/index').default;
  var appEntry = require('./app.vue');
  window.Utils=ctx.getMvueToolkit().utils;
  //将core模块注册到全局store中，必须在这里初始化，后续才可以操作store的core模块
  mvueCore.context.setStore(ctx.getStore());
  //设置当前系统所有动态页面组件的配置集合
  ctx.getStore().commit("core/setAutoPageConfs",autoPageConfs);
  Vue.use(mvueCore,{mvueToolkit:ctx.getMvueToolkit()});
  var result=mvueCore.metaBase.initMetabase(null,true);
  if(result&&result.then){
    return result.then(function(){
      return {
        routesData: routesData,
        appEntry: appEntry
      }
    });
  }else{
    return {
      routesData: routesData,
      appEntry: appEntry
    }
  }
},function (ctx) {
    mvueCore.context.setRouter(ctx.getRouter());
    mvueCore.context.setVue(ctx.getVue());
  }
);

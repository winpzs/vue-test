import routesBase from "./routes-base";
import mvueToolkit from "mvue-toolkit";
import autoRoutes from '../pages/auto-routes';
var routersData = mvueToolkit.router.toRealRoutes(routesBase,function (component) {
  return require('src/modules/' + component);
});
var propsResolve = function (router) {
  if (!_.isEmpty(router.params.menu)) {
    router.meta["menu"] = router.params.menu;
  }
};
//将自动生成的路由附加到根路由上
routersData[0].children=routersData[0].children.concat(autoRoutes);
routersData[0].children.push({
  meta: {
    requireAuth: true
  },
  name: "defaultEntityList",
  component: require('src/templates/list'),
  path: "entities/:entityName/list",
  beforeEnter: function (to, from, next) {
    propsResolve(to);
    next();
  }
});
routersData[0].children.push({
  meta: {
    requireAuth: true
  },
  name: "defaultCreateForm",
  component: require('src/templates/form'),
  path: "entities/:entityName/create",
  beforeEnter: function (to, from, next) {
    propsResolve(to);
    next();
  }
});
routersData[0].children.push({
  meta: {
    requireAuth: true
  },
  name: "defaultEditForm",
  component: require('src/templates/form'),
  path: "entities/:entityName/edit/:id",
  beforeEnter: function (to, from, next) {
    propsResolve(to);
    next();
  }
});

export default routersData;

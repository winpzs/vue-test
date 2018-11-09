import  mvueCore from "mvue-toolkit";

var $resource=null;
var customActions = {
  funcList: {method: 'GET', url: 'perm_scope/functions'},
};

export  default function () {
  if($resource!=null){
    return $resource;
  };
  var root=mvueCore.config.getConfigVal("service.base.endpoint");
  $resource=mvueCore.resource('perm_scope{/id}',customActions,{root:root});
  return $resource;
};


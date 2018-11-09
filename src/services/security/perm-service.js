import  mvueCore from "mvue-toolkit";

var $resource=null;
var customActions = {
  batchDetele: {method: 'POST', url: 'perm/batch_del'},
  queryPrivilegeSet: {method: 'GET', url: 'perm/privilege_set'}
};

export  default function () {
  if($resource!=null){
    return $resource;
  };
  /*var root=mvueCore.config.getConfigVal("service.base.endpoint");
  $resource=mvueCore.resource('perm{/id}',customActions,{root:root});*/
  $resource=mvueCore.resource('perm{/id}',customActions);
  return $resource;
};

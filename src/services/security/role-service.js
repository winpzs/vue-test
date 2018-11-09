import  mvueCore from "mvue-toolkit";

var $resource=null;
var customActions = {
  getGlobalUserRole: {method: 'GET', url: 'uasRole/getGlobalUserRole'}
};

export  default function () {
  if($resource!=null){
    return $resource;
  };
  /*var root=`${mvueCore.config.getGatewayUrl()}/approle`;
  $resource=mvueCore.resource('uasRole{/id}',customActions,{root:root});*/
  $resource=mvueCore.resource('role{/id}',customActions);
  return $resource;
};

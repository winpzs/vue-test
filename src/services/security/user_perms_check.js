var permResource = require("./permission_service").$resource;
var permsDataCached = null;
//定义基本的权限对象
var permsList = {
  addApi: {  //  允许在我的API模块中创建API
    val: 1,
    scopeId: "func00002"
  },
  editRole: {  // 对角色进行管理，包括查询、编辑、删除角色基本信息、编辑角色成员
    val: 4,
    scopeId: "func00001"
  },
  editPerms: {  // 允许修改所有角色的权限信息
    val: 2,
    scopeId: "func00001"
  },
  ApiApproval:{ //访问权限管理模块，允许对API的各种申请进行审批
    val: 4,
    scopeId: "func00002"   //Application approval
  }


};
//根据用户权限数据permsData，传入的权限scopeId和权限val判断用户是否具有权限，如果有执行回调cb
//如果不传回调cb直接返回是否具有权限的结果true或者false
function checkWithPermsData(permsData, scopeId, val, cb) {
  if(!val){
    val=1;//默认为1
  }
  var hasPemission=false;
  for (var i = 0; i < permsData.length; i++) {
    var item = permsData[i];
    //这里直接比较scopeId，然后用val和mergedOps做'二进制与'判断是否具有操作权限
    if (item.scopeId == scopeId) {
      if ((item.mergedOps & val) == val) {
        hasPemission=true;
        cb && cb(true);
        return hasPemission;
      }
    }
  }
  if(!hasPemission){
    cb&&cb(false);
  }
  return hasPemission;
}
//获取当前用户的所有权限,缓存5秒
function getCurUserPermissions(callback){
  if(permsDataCached){
      callback&&callback(permsDataCached);
  }else{
    permResource.currentUserPerms().then(function ({data}) {
        var permsData = data.data;
        permsDataCached=permsData;
        callback&&callback(permsData);
    });
    setTimeout(function () {
      permsDataCached = null;
    }, 5000);
  }
}
//obj:来自上面定义的基本的权限对象permsList的子项
//校验用户是否具有obj权限，如果有执行回调cb
function userPermsCheck(obj, cb) {
  var scopeId = obj.scopeId;
  var val = obj.val;
  getCurUserPermissions(function(permsData){
    checkWithPermsData(permsData, scopeId, val, cb);
  });
}
module.exports = {
  check: userPermsCheck,
  list : permsList,
  getCurUserPermissions:getCurUserPermissions,
  checkWithPermsData:checkWithPermsData
};
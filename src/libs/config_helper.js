//你可以添加自己项目的特殊配置
var mvueCore=require('mvue-toolkit').default;

module.exports = _.merge({
  config1:function () {
    return mvueCore.config.getConfigVal("key1");
  }
},mvueCore.config);

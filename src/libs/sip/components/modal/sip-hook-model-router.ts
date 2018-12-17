import { SipHelper } from "@libs/sip/base/sip-helper";
import { SipModal } from "@libs/sip/vue-extends/sip-modal";


//hookModelRouter

function getRouterMatched(info) {
    let name = info.name;
    let matched =
      info.matched &&
      info.matched.find(function(item) {
        return item.name == name;
      });
    return matched;
  }
  function isModal(cmpDef) {
    let temp = cmpDef && cmpDef.extendOptions;
    temp && (temp = temp._Ctor);
    temp && (temp = temp[0]);
    temp && (temp = temp.super);
    return SipHelper.isClass(temp, SipModal) ? true : false;
  }
  function getModalDef(info) {
    let matched = getRouterMatched(info);
    let components = matched && matched.components;
    return Promise.resolve(components && components.default).then(function(cmpDef) {
      if ("_Ctor" in cmpDef || "cid" in cmpDef) {
        return isModal(cmpDef) ? cmpDef : null;
      } else {
        /**可能动态加载 */
        return new Promise(function(resolve){
          cmpDef(function(cmpDef){
            resolve(isModal(cmpDef) ? cmpDef : null);
          });
        });
        // return cmpDef(function(){}).then(function(cmpDef) {
        //   return isModal(cmpDef) ? cmpDef : null;
        // });
      }
    });
  }
  function getInstance(info) {
    let matched = getRouterMatched(info);
    if (matched) {
      return matched.instances && matched.instances.default;
    }
  }
  
  export function SipHookModelRouter(to, from, next) {
    getModalDef(to).then(function(modelDef) {
      let inst = getInstance(from);
      inst && inst.$createModal && inst.$createModal(modelDef, to);
      if (modelDef) {
        next(false);
      } else {
        next();
      }
    });
  }
<template>
<div>
                <Row >
                    <Select :placeholder="placeholder" v-model="currentRole" style="width:200px">
                        <Option v-for="item in roles" :value="item.id" :key="item.id"></Option>
                    </Select>
                    <Button type="primary" :disabled="mustStopRepeatedClick" @click="saveCurrentRolePerms">保存</Button>
                </Row>
                <Row v-if="expandNames" class="mt-sm">
                  <Collapse  :simple="true" :value="expandNames">
                    <Panel v-for="(func,index) in funcPermScopes" :key="index" :name="func.scopeId" hide-arrow>
                      <div class="func-title"></div>
                      <div slot="content">
                        <CheckboxGroup v-model="currentRolePermsMark[func.scopeId]">
                          <template v-for="(item,itemIndex) in func.operations">
                            <Checkbox    :label="item.val"><span class="item-title"></span></Checkbox>
                            <div class="item-desc"></div>
                          </template>
                        </CheckboxGroup>
                      </div>
                    </Panel>
                  </Collapse>
                </Row>
</div>
</template>
<style scoped>
  .item-desc{
    margin-left: 22px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .func-title{
    font-weight: bolder;
    font-size: 14px;
  }
  .item-title{
    font-weight: bolder;
    margin-left: 5px;
  }

</style>
<script>
  import permService from 'services/security/perm-service';
  import roleService from 'services/security/role-service';
  import permScopeService from 'services/security/perm-scope-service';
export default {
  data() {
    return {
      mustStopRepeatedClick: false,//阻止点击操作重复触发
      placeholder: "请选择角色",
      roles: [],
      currentRole: null,
      currentRolePerms: [],
      currentRolePermsMark: {},//当前角色的所有菜单权限标记map，可用来计算需要删除的菜单权限
      funcPermScopes: [{'operations': []}, {'operations': []}],
      expandNames: null
    };
  },
  watch: {
    currentRole: {//角色变化重新获取角色权限
      handler() {
        //获取当前角色的菜单权限
        //并设置树节点的菜单选中checked=true
        this.getCurrentRolePerms();
      }
    }
  },
  mounted() {
    roleService().query().then(({data})=>{
      return new Promise((resolve, reject) => {
        if(data){
          this.roles=data;
          //设置当前角色为第一个
          this.currentRole=this.roles[0].id;
          resolve(this.currentRole, this.roles);
        } else {
          reject(data);
        }
      });
    }).then(() => {
      return new Promise((resolve, reject) => {
        permScopeService().funcList().then(({data}) => {
          this.funcPermScopes = data;
          this.expandNames = [];
          _.each(data, func => {
            this.expandNames.push(func.scopeId);
          });
          resolve(data);
        });
      });
    }).then(() => {
      this.getCurrentRolePerms();
    });
  },
  methods: {
    getCurrentRolePerms() {//获取当前角色的菜单权限
      permService().query({
        joins: 'permScope ps',
        filters: `principalId eq ${this.currentRole} and ps.resourceType eq 'FUNCTION'`,
        limit: 1000
      }).then(({data}) => {
        this.currentRolePerms = data;
        var rolePermsMark = {};
        _.each(data, p => {
          var mergedOps = p["mergedOps"];
          var rolePermMark = [];
          rolePermsMark[p.scopeId] = rolePermMark;

          var selectedFunc = this.findFunc(p.scopeId);
          if (selectedFunc == null) {
            rolePermMark = [mergedOps];
          } else {
            _.each(selectedFunc["operations"], op => {
              var opVal = op["val"];
              if (opVal == (opVal & mergedOps)) {
                rolePermMark.push(opVal);
              }
            });
          }
        });
        this.currentRolePermsMark = rolePermsMark;
      });
    },
    findFunc(scopeId) {
      var selectedFunc = null;
      _.each(this.funcPermScopes, func => {
        if (func.scopeId == scopeId) {
          selectedFunc = func;
          return false;
        }
      });
      return selectedFunc;
    },
    saveCurrentRolePerms() {//保存当前角色的权限
      this.mustStopRepeatedClick = true;
      var permList = [];
      _.forIn(this.currentRolePermsMark, (permArr, scopeId) => {
        var mergedOps = 0;
        _.each(permArr, permVal => {
          mergedOps = mergedOps + permVal;
        });
        permList.push({
          principalId: this.currentRole,
          principalType: 'R',
          scopeId: scopeId,
          mergedOps: mergedOps
        });
      });
      permService().save(permList).then(({data}) => {
        this.mustStopRepeatedClick = false;
        var hasError=false;
        _.each(data,item=>{
          if(_.isEmpty(item.id)){
            hasError=true;
            return false;
          }
        });
        if(hasError){
          this.$Message.error({content: "修改失败，请确认您是否有权进行权限管理!"});
        }else{
          this.$Message.success({content: "修改成功"});
        }
      }, () => {
        this.mustStopRepeatedClick = false;
      });
    }
  }
}
</script>

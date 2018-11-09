<template>
  <div>
    <Row >
      <Select :placeholder="placeholder" v-model="currentRole" style="width:200px">
        <Option v-for="item in roles" :value="item.id" :key="item.id"></Option>
      </Select>
      <Button type="primary" :disabled="mustStopRepeatedClick" @click="saveCurrentRoleMenus">保存</Button>
    </Row>
    <Row v-if="currentRole">
      <i-col v-for="(menu,index) in splittedMenu" :key="index" span="6">
        <Tree ref="menuTree" :data="menu" show-checkbox></Tree>
      </i-col>
    </Row>

  </div>
</template>
<script>
import { menuService } from "mvue-components";
import permService from 'services/security/perm-service';
import roleService from 'services/security/role-service';
export default {
    data(){
        return{
            mustStopRepeatedClick:false,//阻止点击操作重复触发
            placeholder:"请选择角色",
            roles:[],
            currentRole:null,
            currentRoleMenuPermsMark:{},//当前角色的所有菜单权限标记map，可用来计算需要删除的菜单权限
            splittedMenu:[],
            splittedMenuBackup:[],
            //flattedMenu里边存储的是和splittedMenuBackup一样的最原始的菜单数据，
            // 数据结构不一样，所以改变一个另外一个也会变化
            flattedMenu:[],
            privilegeSetId:null
        };
    },
    watch:{
        currentRole:{//角色变化重新获取角色权限
            handler(){
                //获取当前角色的菜单权限
                //并设置树节点的菜单选中checked=true
                this.getCurrentRolePerms();
            }
        }
    },
    mounted(){
        //获取权限集
        permService().queryPrivilegeSet().then(({data})=>{
            _.each(data,d=>{
                if(d.name=='guest'){
                    this.privilegeSetId=d.id;
                    return false;
                }
            })
            if(!this.privilegeSetId){
                this.$Modal.warning({
                    content:"权限集初始化失败"
                });
            }
            //获取所有菜单
            menuService().published({ orderby: "displayOrder asc" },null,{headers:{"x-impersonate-sudo":"1"}}).then(({data}) =>{
                //将原始菜单顶级按照每两个分组，这样可以分成多棵树展示，避免一棵树太长，不好操作
                var splittedMenu= this.splitMenu(data);
                this.splittedMenu =splittedMenu;
                this.splittedMenuBackup=splittedMenu;
                //将菜单所有的的子children展平标记
                var flattedMenu={};
                this.flatMenu(data,flattedMenu);
                this.flattedMenu=flattedMenu;
                //获取所有角色
                roleService().query().then(({data})=>{
                  if(data){
                    this.roles=data;
                    //设置当前角色为第一个
                    this.currentRole=this.roles[0].id;
                  }
                });
            });
        });
    },
    methods:{
        setCurrentRoleCheckedPerms(){
            //flattedMenu里边存储的是和splittedMenuBackup一样的最原始的菜单数据，数据结构不一样，所以改变一个另外一个也会变化
            _.forIn(this.flattedMenu,(v,k)=>{
                //只对叶子节点操作
                if(_.isEmpty(v.children)){
                    if(this.currentRoleMenuPermsMark[k]){
                        v.checked=true;
                    }else{
                        v.checked=false;
                    }
                }
            });
            //复制一份出来激发树组件重新渲染
            this.splittedMenu=_.cloneDeep(this.splittedMenuBackup);
        },
        getCurrentRolePerms(){//获取当前角色的菜单权限
            permService().query({
                joins:'permScope ps',
                filters:`principalId eq ${this.currentRole} and ps.module eq menu`,
                limit:1000
            }).then(({data})=>{
                //当前角色的所有菜单权限标记map，可用来计算需要删除的菜单权限
                var currentRoleMenuPermsMark={};
                _.each(data,p=>{
                    //如果权限对应的scopeId等于菜单的id，则认为这个权限是菜单权限
                    currentRoleMenuPermsMark[p.scopeId]={permId:p.id};
                });
                this.currentRoleMenuPermsMark=currentRoleMenuPermsMark;
                this.setCurrentRoleCheckedPerms();
            });
        },
        getSelectedNodesParents(checkedNodes){
            var checkedNodesMap=_.keyBy(checkedNodes,o=>{
                return o.id;
            });
            var parents={};
            _.each(checkedNodes,cn=>{
                var parent=cn;
                while(parent.parentId){
                    parent=this.flattedMenu[parent.parentId];
                    //如果父菜单已经选中，不重复加入
                    if(!checkedNodesMap[parent.id]){
                        parents[parent.id]=true;
                    }
                }
            });
            var pids=[];
            _.forIn(parents,(v,k)=>{
                pids.push(
                    {
                        id:k
                    }
                );
            });
            return pids;
        },
        saveCurrentRoleMenus(){//保存当前角色的权限
            this.mustStopRepeatedClick=true;
            var menuTree= this.$refs.menuTree;
            var checkedNodes=[];
            if(!menuTree){
                this.mustStopRepeatedClick=false;
                return;
            }
            if(_.isArray(menuTree)){
                _.each(menuTree,mt=>{
                    var cns=mt.getCheckedNodes();
                    if(!_.isEmpty(cns)){
                        checkedNodes=checkedNodes.concat(cns);
                    }
                });
            }else{
                let cns=menuTree.getCheckedNodes();
                if(!_.isEmpty(cns)){
                    checkedNodes=checkedNodes.concat(cns);
                }
            }
            //将选中菜单的所有父节菜单也加入进来
            if(!_.isEmpty(checkedNodes)){
                let psnodes=this.getSelectedNodesParents(checkedNodes);
                if(!_.isEmpty(psnodes)){
                    checkedNodes=checkedNodes.concat(psnodes);
                }
            }
            //需要删除的菜单权限id集合
            var toDeleted=[];
            var checkedMap=_.keyBy(checkedNodes,cn=>{
                return cn.id;
            });
            //如果已选择的菜单中，没有包含在初始菜单权限标记中，则表示已删除
            _.forIn(this.currentRoleMenuPermsMark,(v,k)=>{
                if(!checkedMap[k]){
                    //permId是权限的id
                    toDeleted.push(v.permId);
                }
            });
            //待保存的菜单权限
            var toSaved=[];
            _.each(checkedNodes,cn=>{
                toSaved.push(
                    {
                        principalId:this.currentRole,
                        principalType:'R',
                        scopeId:cn.id,
                        privilegesetId:this.privilegeSetId
                    }
                );
            });
            //先保存再删除
            permService().save(toSaved).then(({data})=>{
                //如果有需要删除的权限，批量删除
                if(!_.isEmpty(toDeleted)){
                    permService().batchDetele(toDeleted).then(({data})=>{
                        this.mustStopRepeatedClick=false;
                    },()=>{
                        this.mustStopRepeatedClick=false;
                    });
                }else{
                    this.mustStopRepeatedClick=false;
                }
            },()=>{
                this.mustStopRepeatedClick=false;
            });
        },
        expandMenu(menu){//将菜单树全部展开
            if(menu){
                _.each(menu,(m)=>{
                    if(!_.isEmpty(m.children)){
                        m.expand=true;
                        this.expandMenu(m.children);
                    }
                });
            }
        },
        splitMenu(menu){//将原始菜单顶级按照每两个分组，这样可以分成多棵树展示，避免一棵树太长，不好操作
            var splittedMenu=[];
            if(!menu){
                return splittedMenu;
            }
            this.expandMenu(menu);
            var len=menu.length;
            var splitNum=Math.ceil(len/2);
            for(let i=0;i<splitNum;++i){
                let start=i*2;
                splittedMenu[i]=[menu[start]];
                if((start+1)<len){
                    splittedMenu[i].push(menu[start+1])
                }
            }
            return splittedMenu;
        },
        flatMenu(menu,flattedMenu){//将菜单所有的的子children展平标记
            if(!menu){
                return flattedMenu;
            }
            _.each(menu,m=>{
                flattedMenu[m.id]=m;
                if(!_.isEmpty(m.children)){
                    this.flatMenu(m.children,flattedMenu);
                }
            })
        }
    }
}
</script>

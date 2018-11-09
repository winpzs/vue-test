<template>
  <div class="bvue-page">
    <b-childheader :title="header.title" :subtitle="header.description" :showBack="header.showBack" ></b-childheader>
    <meta-grid ref="gridList"
               entity-name="Menu"
               :query-options="queryOptions"
               :columns="columns"
               :toolbar="toolbar">
    </meta-grid>
  </div>
</template>
<script>
  import { leapQueryConvertor } from "mvue-components";
  export default{
    data:function(){
      return {
        queryOptions:{
          "x-impersonate-sudo":1,
          filters:"status eq 1"
        },
        header: {
          title: "菜单管理",
          description: "显示及维护系统内的所有菜单",
          showBack: false
        },
        columns:[
          {key:"title"},
          {key:"name",width:100},
          {key:"url",width:100},
          {key:"displayOrder",width:50},
          {key:"status",width:100,filterMultiple:true,metaParams:{autoFilterable:true}},
          {key:"parentId",width:50},
          {key:"createdAt",width:100}
        ],
        toolbar:{
          btnSizeBeforeMore: 2,
          advanceSearchFields:['title'],
          btns:[{name:"create",to:"/system/menu/create"},"batchDelete","export","import"],
          singleBtns:[{name:"edit",to:"/system/menu/edit/:id"},"del"],
          quicksearch:{
            fields:["title","name"],
            placeholder:"根据名称搜索"
          }
        }
      }
    },
    methods:{
      query(ctx,queryResource){
        return leapQueryConvertor.exec(queryResource,ctx,(queryParams)=>{
            queryParams["x-impersonate-sudo"]=1;
        });
      }
    }
  };
</script>

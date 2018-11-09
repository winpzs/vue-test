<template>
  <div class="bvue-page">
    <b-childheader :title="header.title" :subtitle="header.description" :showBack="header.showBack" ></b-childheader>
    <div class="bvue-page-body">
      <Card>
        <meta-grid ref="gridList" :entityName="metaEntity.name" :toolbar="toolbar">
        </meta-grid>
      </Card>
    </div>
  </div>
</template>
<script>
  import  mvueCore from "mvue-core";
  import contextHelper from "../libs/context";
  export default {
    data:function(){
      var entityName=this.$route.params.entityName;
      var metaEntity=mvueCore.metaBase.findMetaEntity(entityName);
      if(metaEntity==null){
        contextHelper.error({
          content:`实体${entityName}不存在`
        });
        return;
      }
      var titleField=metaEntity.firstTitleField();
      var quickSearchFields=[];
      if(titleField!=null){
        quickSearchFields.push(titleField.name);
      }
      return {
        header:{
          title:`${metaEntity.title || metaEntity.name}列表`,
          description:metaEntity.description,
          showBack:false
        },
        metaEntity:metaEntity,
        toolbar:{
          btns:["create","export","import"],
          singleBtns:["edit","del"],
          quicksearch:{
            fields:quickSearchFields,
            placeholder:"根据名称搜索"
          }
        }
      }
    }
  };
</script>

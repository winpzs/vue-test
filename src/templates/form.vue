<template>
  <div class="bvue-page" :key="$route.fullPath"  :id="'default-form-uuid-'+entityName">
    <b-childheader :title="childheader.title" :subtitle="childheader.subtitle"></b-childheader>
    <div class="bvue-page-body">
      <Card :bordered="false" :padding="24">
        <Row>
          <Col span="22" >
              <meta-form ref="form" :entity-name="entityName" :record-id="id"
                         :isView="isViewMode" :toolbar="toolbar"
                         :on-inited="handleOnInited"
                         :label-width="120">
              </meta-form>
          </Col>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data:function () {
    var entityName=this.$route.params.entityName;
    var id=this.$route.params.id;
    return {
      childheader:{
        title:"",
        subtitle:""
      },
      entityName:entityName,
      id:id,
      toolbar:{
        "editBtns": [
            {
                "type": "common",
                "name": "cancel",
                "title":"取消",
                "btnType":"default"
            },
            {
                "type": "common",
                "name": "save",
                "title":"保存"
            }
        ]
      }
    }
  },
  computed:{
    isViewMode(){
      let action=this.$route.query&&this.$route.query[Utils.queryKeys.action];
      return Utils.formActions.view===action;
    }
  },
  methods:{
    handleOnInited(formInst){
      var metaEntity=formInst.metaEntity;
      var prefix='';
      if(this.isViewMode){
        prefix='查看';
      }else if(this.id){
        prefix='编辑';
      }else{
        prefix='创建';
      }
      this.childheader.title=`${prefix}${metaEntity.title}`;
      this.childheader.subtitle=`${metaEntity.description}`;
    }
  }
}
</script>


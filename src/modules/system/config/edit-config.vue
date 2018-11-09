<template>
<div class="bvue-page">
    <b-childheader :title="childheader.title" :subtitle="childheader.subtitle"></b-childheader>
  <div class="bvue-page-body">
    <Card :bordered="false" :padding="24">
      <Row>
        <Col span="14" offset="4">
    <config-form action="edit" :record-id="recordId||$route.params.id"></config-form>
      </Col>
      </Row>
    </Card>
  </div>
</div>
</template>
<script>
export default {
    props:{
        recordId:{
            type:String,
            require:true
        }
    },
    data(){
        return {
          childheader:{
            title:"修改配置项",
            subtitle:"修改配置库中已有的配置项",
            showBack:true,
          },
        };
    },
    components:{
        configForm:require('./config-form')
    }
}
</script>

<template>
<div class="bvue-page">
    <b-childheader :title="childheader.title" :subtitle="childheader.subtitle"></b-childheader>
  <div class="bvue-page-body">
    <Card :bordered="false" :padding="24">
      <Row>
        <Col span="14" offset="4">
    <config-form action="create"></config-form>
      </Col>
      </Row>
    </Card>
  </div>
</div>
</template>
<script>
export default {
    data(){
        return {
          childheader:{
            title:"创建配置项",
            subtitle:"向配置库中添加一个新的配置项",
            showBack:true,
          },
        };
    },
    components:{
        configForm:require('./config-form')
    }
}
</script>

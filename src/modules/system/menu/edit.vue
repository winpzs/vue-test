<template>
    <div class="bvue-page">
        <b-childheader :title="childheader.title" :subtitle="childheader.subtitle" :showBack="childheader.showBack" ></b-childheader>

        <div class="bvue-page-body">
            <Card :bordered="false" :padding="24">
                <Row>
                    <Col span="14" offset="4">
                        <menu-form action="edit" :record-id="recordId||$route.params.id"></menu-form>
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
                title:"基础表单编辑",
                subtitle:"表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。",
                showBack:true,
            },
        };
    },
    components:{
        menuForm:require('./form')
    }
}
</script>

<template>
  <div class="bvue-page">
    <b-childheader :title="header.title" :subtitle="header.description" ></b-childheader>
    <div class="bvue-page-body">
      <Card>
        aaaaa
        <Test></Test>
      </Card>
    </div>
  </div>
</template>
<script>
      import  Test from "./test.vue";
  export default{
    components:{
        Test
    },
    data:function(){
      return {
        header: {
          title: "用户管理",
          description: "显示及维护系统内的所有用户"
        },
          columns:[
            {key:"name"},
            {key:"userName",width:100},
            {key:"email",width:150},
            {key:"phoneNumber",width:120},
            {key:"updatedAt",width:120}
          ],
          toolbar:{
            btns:["create"],
            singleBtns:["edit","del"],
            quicksearch:{
              fields:['name',"userName"],
              placeholder:"根据名称搜索"
            }
          }
        }      
    }
  };
</script>
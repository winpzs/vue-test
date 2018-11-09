<template>
<div>
  实体列表
     <ul>
       <li v-for="entity  in entities">
         
       </li>
     </ul>
</div>
</template>
<script>
    export default {
        data(){
            return {
              entities:[]
            }
        },
      mounted() {
          var _self=this;
          _.forEach(this.$metaBase.entities(),function (val,key) {
            _self.entities.push(val);
          });
      },
    }
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        name:''
      };
    },
    methods:{
      getName(){
        return this.name;
      }
    }
  };
</script>

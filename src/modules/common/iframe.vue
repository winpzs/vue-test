<style lang="scss">
    .bvue-page-iframe{
        position: absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        overflow: hidden;
    }
</style>

<template>
    <div class="bvue-page-iframe">
        <b-iframe  :src="iframeSrc" :height="'100%'" ></b-iframe>
    </div>
</template>
<script>
export default {
    data(){
        return {
            iframeSrc:this.$route.query.url
        };
    },
    beforeRouteUpdate: function (to, from, next) {
      if (this.iframeSrc == to.query.url) {
        this.iframeSrc = to.query.url + "&_date=" + new Date().getTime();
      } else {
        this.iframeSrc = to.query.url;
      }
      next();
    }
}
</script>


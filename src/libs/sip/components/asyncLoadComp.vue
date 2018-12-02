<script>
  export default {
    render (h, cxt) {
      return h(this.is, {
        props: {
          AAA: this.params
        }
      });
    },
    props: {
        is:[String, Object],
        params:Object,
    }
  }
</script>
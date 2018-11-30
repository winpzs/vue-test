<script>
  export default {
    render (h, cxt) {
        console.log(this.content)
      return h(is, {
        props: {
          params: this.params
        }
      })
    },
    props: {
        is:[String, Object],
        params:Object,
    }
  }
</script>
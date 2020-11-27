<template>

</template>

<script>
  import qs from "qs";
  import $ from 'jquery'
    export default {
        name: "upfile",
      created() {
          this.axios.post('/oss/fileoss').then(res => {
            alert(res.data)
          })

      }

    }
</script>

<style scoped>

</style>

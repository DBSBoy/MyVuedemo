<template>
  <div>

<!--    <form name="input" action="" method="get">-->
<!--      First name:-->
<!--      <input type="text" name="FirstName" value="Mickey" size="20" :model="formline.name">-->
<!--      <br />Last name:-->
<!--      <input type="text" name="LastName" value="Mouse" size="20">-->
<!--      <br />-->
<!--      <input type="submit" value="Submit" @onclick="edit">-->
<!--    </form>-->
<!--    <button @click="postid">触发表单域的 submit 事件</button>-->
    <button @click="postid">点击传输</button>
  </div>
</template>

<script>
  import $ from 'jquery'
  import qs from 'qs'
  export default {

    name: "test",
    // readStatus: true
    data: function () {
        return{
          id: 1
        }
    },
    methods: {
      postid(id) {
        id=this.id
        var data = qs.stringify({"id":id});
        console.log(data)
        this.axios.post('/getID',data, {headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
          console.log(res)
        })
      },
    }
  }
</script>

<style scoped>

</style>

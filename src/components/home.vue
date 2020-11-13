<template>
  <div class="home">
    <button @click="login()">登录</button>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    methods:{
      login(){
        this.axios({
          method: 'post',
          url: '/Tologin',
          data: {
            username: 'admin',
            password: 123456,
            msg:''
          }
        }).then((res)=>{
          var m=this.msg
          m=res.data
          console.log(res)
          alert(m)

        });
      },
      find(){}
    }
  }
</script>

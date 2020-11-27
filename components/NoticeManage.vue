<template>
  <!-- 管理员登陆状态主页面 -->
  <div class="noticemanage">
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><b>公告管理</b></div>
        <!-- 菜单栏 -->
        <div class="menu" style="float: left">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="6" @click="$router.push('/adminindex')">首页</el-menu-item>
            <el-menu-item index="1" @click="$router.push('/issue')">用户列表</el-menu-item>
            <el-menu-item index="2" @click="$router.push('/BandC')">图书借阅与归还</el-menu-item>
            <el-menu-item index="3">注销用户</el-menu-item>
            <el-menu-item index="4" @click="$router.push('/BR')">书库</el-menu-item>
            <el-menu-item index="5" @click="$router.push('noticemanage')">首页公告管理</el-menu-item>
            <el-menu-item index="6"@click="$router.push('/all')" >图书借阅统计</el-menu-item>
          </el-menu>


        </div>
        <!-- 登录状态显示 -->
        <div class="bar"><b>用户名：{{aname}}</b></div>
      </el-header>


      <el-main>
        <!-- 公告管理 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="msg"></el-input>
            <!-- <input type="text" v-model="msg"> -->
          </el-form-item>
          <el-form-item>
            <!-- <input type="button" v-on:click="msgreverse" value="发布" /> -->
            <el-button v-on:click="msgreverse" @click="getmsg">发布</el-button>
          </el-form-item>
          <textarea name="" id="" cols="100" :rows="10" disabled>{{msg2}}</textarea>
          <!-- <el-input type="textarea" v-model="formInline.desc" :rows="3" cols="100">{{msg2}}</el-input> -->
        </el-form>

      </el-main>

    </el-container>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
      name: "NoticeManage",
      props: {},
      data(){
        return{
          aname:'',
          activeIndex: '5',
          msg:'',
          msg2:'',
          formInline: {

          }
        }
      },
    created() {
        this.aname=sessionStorage.getItem('user_name')
    },
    methods:{
        getmsg(){
          var msg=this.msg
          alert(msg)
          var data=qs.stringify({"content":msg,"admin_name":this.aname})
          this.axios.post('/announcement/insertAnnouncement',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
              alert("发布成功")
          })
        },
        msgreverse:function(){
          this.msg2=this.msg+'  '+'——系统管理员'
        }
      }
    }
</script>

<style scoped>
  .el-header {
    height: 50px;
    background-color: darkseagreen;
  }
  .logo{
    float: left;
    padding: 25px;
  }
  .menu{
    float: left;
    width: 70%;
    margin: auto;
  }
  .el-menu {
    width: 70%;
    margin: auto;
    text-align: center;
    background-color: darkseagreen;
  }
  .el-menu-item{
    color: black;
  }

  .bar{
    float: right;
    padding: 25px;
  }

  .el-main{
    width: 60%;
    margin: auto;
    margin-top: 90px;
  }
  .el-input{
    width: 650px;
  }
  textarea{
    resize:none;
  }
</style>

<template>
  <!-- 管理员登陆状态主页面 -->
  <div class="noticemanage">
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><img src="~@/assets/library.png" alt="" class="logop" /></div>
        <!-- 菜单栏 -->
        <div class="menu">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="$router.push('/adminindex')">首页</el-menu-item>
            <el-menu-item index="2" @click="$router.push('/issue')">用户列表</el-menu-item>
            <el-menu-item index="3" @click="$router.push('/BandC')">图书借阅与归还</el-menu-item>
            <el-menu-item index="4" @click="$router.push('/BR')">书库</el-menu-item>
            <el-menu-item index="5" @click="$router.push('/noticemanage')">首页公告管理</el-menu-item>
            <el-menu-item index="6" @click="$router.push('/all')">图书借阅统计</el-menu-item>
          </el-menu>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名：{{aname}}</div>
        <div class="exit">
            <el-button type="primary" @click="$router.push('/')">退出</el-button>
        </div>
      </el-header>


      <el-main>
        <div class="bg2">
        <!-- 公告管理 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="msg"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="msgreverse" @click="getmsg" style="float: left">发布</el-button>
            </el-form-item>
            <textarea name="" id="" cols="100" :rows="20" disabled>{{msg2}}</textarea>
          </el-form>
        </div>
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
          var data=qs.stringify({"content":msg,"admin_name":this.aname})
          this.axios.post('/announcement/insertAnnouncement',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            this.$notify({
              title: '成功',
              message: '发布成功',
              type: 'success'
            });
          })
        },
        msgreverse:function(){
          this.msg2=this.msg;
        }
      }
    }
</script>

<style scoped>
  .el-header {
    height: 50px;
    background-color: rgba(120, 170, 236, 0.5);
  }
  .logo{
    float: left;
  }
  .logop{
    width: 140px;
    border: none;
  }
  .bar{
    padding: 15px;
    float: right;
  }
  .exit{
    padding: 10px;
    float: right;
  }

  .bg2{
  height: 570px;
  margin-top: 30px;
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
    background-color: rgba(120, 170, 236, 0.5);
  }
  .el-menu-item{
    color: black;
  }

  .el-main{
    background-color: #E9EEF3;
    color: #333;
  }
  .el-input{
    width: 650px;
  }
  textarea{
    resize:none;
  }
</style>

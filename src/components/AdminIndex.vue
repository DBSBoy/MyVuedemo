<template>
  <!-- 管理员登陆状态主页面 -->
  <div class="adminindex">
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><img src="../assets/library.png" alt="" class="logop" /></div>
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
        <div class="bar">用户名：{{myname}}</div>
          <div class="exit">
            <el-button type="primary" @click="$router.push('/')">退出</el-button>
        </div>
      </el-header>

      <el-main>
        <div class="bg2">
          <!-- 功能显示区 -->
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple" @click="$router.push('/issue')"><i class="el-icon-notebook-2"></i><br/>用户列表</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple" @click="$router.push('/BandC')"><i class="el-icon-search"></i><br/>图书借阅与归还</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"><div class="grid-content bg-purple" @click="manage"><i class="el-icon-chat-line-square" @click="manage"></i><br/>首页公告管理</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple" @click="$router.push('/BR')"><i class="el-icon-reading"></i><br/>书库</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"><div class="grid-content bg-purple" @click="$router.push('/all')" ><i class="el-icon-s-data"></i><br/>图书借阅统计</div></el-col>
          </el-row>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
    export default {
        name: "AdminIndex",
       data(){
        return {
          myname:'',
          activeIndex: '1'
        };
      },
      created() {
          this.myname=sessionStorage.getItem('user_name')

      },
      methods:{
        manage(){
          this.$router.push('/noticemanage');
        }
      }
    }
</script>

<style scoped>
.adminindex{
    background-color: #E9EEF3;
  }
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

  .menu{
    float: left;
    width: 70%;
    margin: auto;
  }
  .el-menu {
    width: 70%;
    margin: auto;
    text-align: center;
    background-color:  rgba(120, 170, 236, 0.5);
  }
  .el-menu-item{
    color: black;
  }
  .el-main{
    /* width: 60%;
    margin: auto;
    margin-top: 30px; */
  }
  .bg2{
  width: 60%;
  margin: auto;
  margin-top: 30px;
  height: 570px;
  }
  .el-row {
    margin-bottom: 25px;
  }
  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background:  rgba(120, 170, 236, 0.5);
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: whitesmoke;
  }
  .grid-content {
    border-radius: 2px;
    min-height: 150px;
  }
  .row-bg {
    padding: 15px 0;
    background-color: #f9fafc;
  }
  i{
    margin-top: 40px;
    color:  rgba(120, 170, 236, 0.5);
    font-size: 55px;
  }
  i:hover{
    cursor: pointer;
  }
</style>

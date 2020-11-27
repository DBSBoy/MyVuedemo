<template>
  <!-- 用户我的信息 页面 -->
  <div class="myinfo">
    <el-container>
      <el-header>
         <!-- 面包屑导航 -->
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
            <el-breadcrumb-item>我的信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名：{{myname}}</div>
        <div class="exit"><el-button type="primary" @click="$router.push('/')">退出</el-button></div>
      </el-header>

      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img src="../assets/modify.png" alt="" class="img" @click="modify"/><br/><br/>
              <p>信息修改</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <img src="../assets/history.png" alt="" class="img" @click="history"/><br/><br/>
              <p>借阅历史</p>
            </div>
          </el-col>
        </el-row>
      </el-main>

    </el-container>
  </div>
</template>

<script>
    export default {
        name: "MyInfo",
      data:function(){
          return{
            myname:''
          }
      },
      created() {
        this.myname=sessionStorage.getItem("user_name")
      },
      methods:{

        modify(){
          this.$router.push('/usermodify');
        },
        history(){
          this.$router.push('/history');
        }
      }
    }
</script>

<style scoped>
  .el-header {
    height: 50px;
    background-color: rgba(120, 170, 236, 0.5);
  }
  .nav{
    padding: 15px;
    float: left;
  }
  .bar{
    padding: 15px;
    float: right;
  }
  .exit{
    padding: 10px;
    float: right;
  }

  .el-main {
    width: 85%;
    margin: auto;
    margin-top: 200px;
  }
  .el-row {
    margin-bottom: 25px;
  }

  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background: rgba(120, 170, 236, 0.5);
  }
  .bg-purple {
    background: white;
  }
  .bg-purple-light {
    background: whitesmoke;
  }
  .grid-content {
    border-radius: 2px;
    min-height: 220px;
  }
  .row-bg {
    padding: 15px 0;
    background-color: #f9fafc;
  }
  .img {
    margin-top: 15px;
    width: 180px;
    border: none;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .img:hover{
    cursor: pointer;
  }
  p{
    color: blue;
    font-size: 20px;
  }
</style>

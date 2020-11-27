<template>
  <!-- 用户登录状态的系统页面 -->
  <div class="userindex">
    <!-- 顶部显示 -->
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><img src="../assets/library.png" class="logop"/></div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名：{{myname}}</div>
        <div class="exit"><el-button type="primary" @click="$router.push('/')">退出</el-button></div>
      </el-header>
      <!-- 中间选择显示 -->
      <el-main>
        <!-- 功能显示区 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../assets/myinfo.png" alt="" class="img" @click="info"/><br/><br/>
              <p>我的信息</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../assets/bookrack.png" alt="" class="img"  @click="$router.push('/shell')" /><br/><br/>
              <p>我的书架</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <img src="../assets/repertory.png" alt="" class="img" @click="$router.push('/checkbook')" /><br/><br/>
              <p>图书库</p>
            </div>
          </el-col>
        </el-row>
      </el-main>

      <!-- 公告 -->
      <el-footer>
        <textarea name="" id="" cols="100" :rows="6" disabled  v-model="msg" style="font-size: 20px">{{msg}}</textarea>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery'
  import qs from 'qs'
    export default {
      name: "UserIndex",
      props: {},
      data:function(){
        return{
          msg:'',
          myname:''
        }
      },
      created() {
        this.getname()
        this.axios.get('/announcement/allAnnouncement').then(res => {
          this.msg='公告：'+res.data[0].content+"--"+res.data[0].content_date
      })

      },
      methods:{
      getname(){
      var username=sessionStorage.getItem("user_name")
       this.myname=username
      },
        info(){
          this.$router.push('/myinfo');
        },
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

  .el-main{
    width: 70%;
    margin: auto;
    margin-top: 100px;
  }
  .el-row {
    margin-bottom: 25px;
  }
  .el-col {
    border-radius: 10px;
  }
  .bg-purple-dark {
    background: rgba(120, 170, 236, 0.5);
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
  .el-footer{
    margin-top: 50px;
  }
  textarea{
    resize:none;
  }
</style>

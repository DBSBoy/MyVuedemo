<template>
<!--  back1页面背景-->
    <div class="body">
    <div class="header">
      <el-divider></el-divider>
      <b><p class="login" >登录</p></b>
    </div>
<!--back2是操作框-->
      <div class="back2"  >
<!-- 走马灯效果       -->
      <el-container style="radius: 30px;">
        <el-aside width="65%">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in imgList" :key="item.id">
              <img :src="item.url" width="100%" height="100%" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-aside>
<!--登录操作  -->
        <el-container>
          <el-main>
<!--            <el-dropdown split-button @command="signup" type="primary" @click="goback">-->
<!--              返回-->
<!--              <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item command="a">注册</el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </el-dropdown>-->
            <input type="button" @click="goback" value="返回" class="goback">
            <input type="button" @click="signup" value="注册"  class="signup">


            <!-- 分割线 -->
            <el-divider></el-divider>
<!-- 输入框-->
            <div class="text item">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="45px" class="demo-ruleForm">
                <el-form-item label="账户" prop="username" class="lab" type="color:">
                  <el-input  v-model="ruleForm2.username" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass" class="lab">
                  <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <userlogin @event1="change($event)"></userlogin>
                <el-form-item class="btn">
                  <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
<!--                  <p>{{pass}}</p>  验证验证码有效性-->
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>

                <el-checkbox v-model="check" style="float: right; margin:auto" size="medium">我是管理员</el-checkbox>
              </el-form>

            </div>
          </el-main>
        </el-container>
      </el-container>
      </div>

    </div>
</template>

<script>
  import $ from 'jquery'
  import qs from 'qs'
import Userlogin from "./code/RandomCodeProduce";
  import SIdentify from "./code/RandomCode";
  export default {
    components: {
      Userlogin
    },
        name: "singin",

    data(){
      var validateVerifycode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== this.identifyCode) {
          console.log('validateVerifycode:', value)
          callback(new Error('验证码不正确'))
        } else {
          callback()
        }
      }
        var validatePass = (rule, value, callback) => {
          const reg = /^.{1,30}$/;  //定义验证表达式
          if (value === '') {
            callback(new Error('请输入密码'));
          }else{
            if (!reg.test(value)) {    //验证输入
              callback(new Error('请输入正确的密码，为1-30位的字母或数字'));
            }
            callback();
          };
        };
        var validatePass2 = (rule, value, callback) => {
          const reg = /^.{1,30}$/;  //定义验证表达式
          if (value === '') {
            callback(new Error('请输入账户'));
          }else{
            if (!reg.test(value)) {    //验证输入
              callback(new Error('请输入正确的账户ID，为1-30位的字母或数字'));
            }
            callback();
          };
        }
          return {
          pass:0,//验证码判断
          check:false, //管理员判断
            ruleForm2: {
              pass: '',
              username: '',
            },
            rules2: {
              pass: [
                {validator: validatePass, trigger: 'blur'}
              ],
              username: [
                {validator: validatePass2, trigger: 'blur'}
              ]

            },

            imgList: [
              //图片路径不能写为这种形式
              // {
              //   id: '1',
              //   url: '../assets/test1.jpg'
              // },
              //需要使用require获取
              {
                id: '1',
                url: require('../assets/1.jpg')
              },
              {
                id: '2',
                url: require('../assets/3.jpg')
              },
              {
                id: '3',
                url: require('../assets/2.jpg')
              }
            ],
        }
      },

    methods:{
      change(data){     //组件之间传值
          this.pass=data
      },
        submitForm(formName) {

          this.$refs[formName].validate((valid) => {

            if(valid&&this.pass==1){
              var data = qs.stringify({
                "user_name": this.ruleForm2.username,
                "user_password": this.ruleForm2.pass,
                "check": this.check
              });
              this.axios.post('/user/login', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                console.log(res.data[0])

                if (res.data[0] != null){
                  alert('登陆成功!');
                  if(this.check==0){
                    this.$router.push('/userindex')  //改用户地址
                  }else
                     this.$router.push('/adminindex')  //改管理员地址

                //   alert(res.config.data)
               }
                else
                  alert("账户或密码错误")
              });


            } else {
              alert('输入有误');
              return false;
            }
          });
        },



        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        errorHandler() {
          return true
        },
        goback(){
          this.$router.push('/')
        },
        signup(a){
          this.$router.push('/signup')
        }
      }
    }

</script>

<style scoped>
  @import '../assets/css/style.css';
  .loginBox {
    width: 520px;
    height: 500px;
    background: url(../assets/bg.png) no-repeat;
    background-size: 100% 100%;
    margin: 5% auto;
    overflow: hidden
  }
  .login {
    font-family: "微软正黑体";
    font-size: 45px;
    color: #7ac5d8;

    margin-top: 2%;
  }
  .signup{
    float: left;
    font-size: 15px;
    margin-left: 48%;
    margin-top: -30px ;
    background: transparent;
    border-radius: 10px;
    border: solid 2px orange;
    height: 30px;
    width: 50px;
    color: white;
  }
  .goback {

    font-size: 15px;
    float: right;
    margin-left: 10px;
    margin-top: -10px ;
    background: transparent;
    border-radius: 10px;
    border: solid 2px orange;
    height: 30px;
    width: 100px;
    color: white;
  }
  /*.el-dropdown {*/
  /*  vertical-align: top;*/
  /*  color: white;*/
  /*}*/
  /*.el-dropdown + .el-dropdown {*/
  /*  margin-left: 15px;*/
  /*}*/
  /*.el-icon-arrow-down {*/
  /*  font-size: 12px;*/
  /*}*/
  .goback{
    margin-left: 1300px;
    border-radius: 10px;
    border: solid 2px orange;
    width: 100px;
    color: white;
  }
.goback:hover,.signup:hover{
  background-color: gold;
}
<!--  顶部-->
  .header{
    width: 100%;
    height: 60px;
    top: 10px;
  }
.back1{
  width: 1480px;
  height:695px;
  background-image: linear-gradient(to right, #a8caba 80%, black 80px);
  padding: 20px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 80px;
}

.el-main {
  -moz-outline-radius-bottomright: 40px;
  opacity:90%;
  background: linear-gradient(270deg, rgba(53, 57, 74, 0) 0%, #BDDDE4 100%);
  color: white;
  text-align: center;
  line-height: 20px;

}

body > .el-container {
  margin-bottom: 10px;

}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 80px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
  /*中间主体操作框样式*/
  .back2{
    border-radius: 40px;
    box-shadow: 5px 15px 20px rgba(6, 17, 47, 0.7);


    width: 50%;
    height: 500px;
    margin: auto;
    position: absolute;
    top:40px;
    left: 0;
    right: 0;
    bottom: 0;
  }
/*  头像样式*/
.demo-type{
    margin: 20px;
}
</style>

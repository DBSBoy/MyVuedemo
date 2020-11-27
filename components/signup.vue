<template>
  <div class="body">

    <div class="header">

      <el-divider></el-divider>
      <b><p class="rigister" >注册</p></b>
    </div>

    <!--back2是操作框-->
    <div class="back2">
      <!-- 走马灯效果       -->
      <el-container style="radius: 30px;">
        <el-aside width="65%">
          <el-carousel height="500px">
            <el-carousel-item :key="item.id" v-for="item in imgList">
              <img :src="item.url" alt="" height="100%" width="100%">
            </el-carousel-item>
          </el-carousel>
        </el-aside>

        <el-container>
          <el-main>




            <input type="button" @click="goback" value="返回" class="goback">
            <!-- 分割线 -->
            <el-divider></el-divider>

            <!-- 输入框-->
            <div class="text item">
              <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="68px" inline="true" ref="ruleForm" status-icon>
                <!--              <el-form-item class="lab" label="登录ID" prop="ID">  &lt;!&ndash; prop绑定值，与ruleForm的ID键要对应&ndash;&gt;-->
                <!--                <el-input auto-complete="off" id="id" ref="input1" v-model="ruleForm.ID"></el-input>-->
                <!--              </el-form-item>-->

                <el-form-item class="lab" label="姓名" prop="username" >
                  <el-input auto-complete="off" id="name" ref="input2" v-model="ruleForm.username"></el-input>
                </el-form-item>
<!--                <el-form-item auto-complete="off" class="lab" label="性别" size="mini" style="margin: 0" prop="sex">-->
<!--                  <el-radio v-model="ruleForm.sex" label="male">男</el-radio>-->
<!--                  <el-radio v-model="ruleForm.sex" label="female">女</el-radio>-->
<!--                </el-form-item>-->
<!--                <el-form-item auto-complete="off" class="lab" label="年龄" prop="age">-->
<!--                  <el-input id="age"  v-model="ruleForm.age "></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item auto-complete="off" class="lab" label="电话" prop="phone">-->
<!--                  <el-input id="phone"  v-model="ruleForm.phone "></el-input>-->
<!--                </el-form-item>-->
                <el-form-item auto-complete="off" class="lab" label="邮箱" prop="mail">
                  <el-input id="email"  v-model="ruleForm.mail "></el-input>
                </el-form-item>
<!--                <el-form-item auto-complete="off" class="lab" label="出生日期" prop="birthday">-->
<!--                  <div class="block">-->

<!--                    <el-date-picker-->
<!--                      v-model="ruleForm.birthday"-->
<!--                      type="date"-->
<!--                      placeholder="选择日期">-->
<!--                    </el-date-picker>-->
<!--                  </div>-->
<!--                </el-form-item>-->
<!--                <p>{{dates}}</p>-->
<!--                <p>{{ruleForm.birthday}}</p>   测试时间格式-->
<!--                <el-form-item auto-complete="off" class="lab" label="地址" prop="address">-->
<!--                  <el-input id="address"  v-model="ruleForm.address "></el-input>-->
<!--                </el-form-item>-->

<!--                <el-form-item auto-complete="off" class="lab" label="年龄" prop="age">-->
<!--                  <el-input id="age1"  v-model="ruleForm.age "></el-input>-->
<!--                </el-form-item>-->
                <el-form-item class="lab" label="密码" prop="pass">
                  <el-input auto-complete="off" id="passwd" ref="input4" type="password" v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input autocomplete="off" id="cpasswd" ref="input5" type="password" v-model="ruleForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item class="btn">

                  <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                  <el-button @click="resetForm('ruleForm') ">重置</el-button>

                </el-form-item>
              </el-form>
            </div>
          </el-main>
        </el-container>
      </el-container>

    </div>

  </div>

</template>

<script>

  import qs from "qs";

  export default {

    name: "signup",
    data() {

      var validateName = (rule, value, callback) => {   //rule验证规则，value输入的值，callback回调函数，如果出错则传入error对象
        const reg = /^[\w\u4e00-\u9fa5]{1,30}$/;/*用户名： 中文、A-Z a-z 0-9 _*/
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          if (!reg.test(value)) {    //验证输入
            callback(new Error('姓名在20个汉字以内'));
          }
          callback();
        }
      }
      var validateMail = (rule, value, callback) => {   //rule验证规则，value输入的值，callback回调函数，如果出错则传入error对象
        const reg = /^(\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}){1,30}$/;  //定义验证表达式
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          if (!reg.test(value)) {    //验证输入
            callback(new Error('请输入正确的邮箱格式'));
          }
          callback();
        }
      }

      var validatePass = (rule, value, callback) => {
          const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{1,30}$/;  //定义验证表达式
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (!reg.test(value)) {    //验证输入
              callback(new Error('密码必须包含大小写和特殊字符'));
            }
            callback();
          }
        }
      ;
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        dates: typeof (new Date()),
        imgList: [
          {
            id: '1',
            url: require('../assets/book2.jpg')
          },
          {
            id: '2',
            url: require('../assets/book3.jpg')
          },
          {
            id: '3',
            url: require('../assets/book4.jpg')
          }
        ],
        ruleForm: {     //表单加载时初始值，设定为空
          username:'',
          mail:'',
          pass: '',
          checkPass: '',
          birthday: new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate(),
          sex: '',
          phone: '',
          address: '',
          age: 0,
        },
        rules: {    //绑定验证规则

          username: [
            {validator: validateName, trigger: 'blur'}
          ],

          mail: [
            {validator: validateMail, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}//trigger代表事件触发方式，blur失去焦点触发检查，change数据改变触发检查
          ]

        }
      }
    }

    ,


    methods: {

      isname() {
        let reg = /^[\w\u4e00-\u9fa5]{1,30}$/;   /*用户名： 中文、A-Z a-z 0-9 _*/
        if (!reg.test(this.$refs.input2.value)) {
          // alert("姓名在20个汉字以内");
          this.$refs.input2.focus();
          return "姓名在20个汉字以内;";
        }
        return 1;
      },
      ismail() {
        let reg = /^(\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}){1,30}$/;   /*定义验证表达式*/
        if (!reg.test(this.$refs.input3.value)) {
          // alert("邮箱不对");
          this.$refs.input3.focus();
          return "邮箱不对;";
        }
        return 1;
      },
      ispasswd() {
        let reg = /^[A-Za-z0-9]{1,30}$/;
        if (!reg.test(this.$refs.input4.value)) {
          // alert("密码为1-30位");
          this.$refs.input4.focus();
          return "密码为1-30位;";
        }
        return 1;
      },
      iscpasswd() {
        let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{1,30}$/;   /*定义验证表达式*/
        if (this.$refs.input5.value != this.$refs.input4.value) {
          if (this.$refs.input4.value == 0) {
            // alert("请输入密码")
            this.$refs.input4.focus();
            return "请输入密码;";
          }
          // alert("两次输入密码不一致");
          this.$refs.input5.focus();
          return "两次输入密码不一致;";

        }
        return 1;
      },
      submitForm(formName) {
        let check = ""   //提示信息

        this.$refs[formName].validate((valid) => {
          var data = qs.stringify({  //左边值字段必须和后端接收数据名字相同
            "user_name":this.ruleForm.username,
            "user_password": this.ruleForm.pass,
            "user_sex": this.ruleForm.sex,
            "user_age": this.ruleForm.age,
            "user_email": this.ruleForm.mail,
            "user_birthday": this.ruleForm.birthday,
            "user_phone": this.ruleForm.phone,
            "user_address": this.ruleForm.address,
          });
          if(valid){
            this.axios.post('/admin/insertUser', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
              console.log(res)
              if (res.data[0] != null){
                alert(res.data);

                this.$router.push('/signin')  //改地址
                }
              else
                alert("注册失败")
            });

          } else {
            check = ( (this.isname() != 1 ? this.isname() : "") + (this.ismail() != 1 ? this.ismail() : "") + (this.iscpasswd() != 1 ? this.iscpasswd() : "") + (this.ispasswd() != 1 ? this.ispasswd() : ""));
            alert(check);
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goback() {
        this.$router.push('/')
      },
      errorHandler() {
        return true
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
  .rigister {
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
    background-image: linear-gradient(to right, #a8caba 0%, #5d4157 100%);
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



<template>
  <!-- 用户信息修改 页面 -->
  <div class="myinfo">
    <el-container>
      <el-header>
        <!-- 面包屑导航 -->
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/myinfo' }">我的信息</el-breadcrumb-item>
            <el-breadcrumb-item>信息修改</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar"><span style="color: red">{{myname}}</span></div>
      </el-header>

      <el-main>
        <div class="info">
          <!-- 个人资料显示与修改 -->
          <div class="tb">
            <h3>个人资料</h3>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" >
              <el-form-item label="姓名" prop="user_name">
                <el-input v-model="formInline.user_name" readonly="" id="in_name" type="text" @blur="checkname" :placeholder="this.myname"></el-input>
                <span id="nc" style="font-size:5px;color: red"></span>
              </el-form-item><br/>
              <el-form-item label="性别" prop="sex" >
                <el-select v-model="formInline.user_sex" :placeholder="this.usex">
                  <el-option label="男" value="male" ></el-option>
                  <el-option label="女" value="female"></el-option>
                </el-select>
              </el-form-item><br/>
              <el-form-item label="借阅ID" prop="id">
                <el-input v-model="formInline.borrowID" readonly="" :placeholder="this.uid" ></el-input>
              </el-form-item><br/>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="formInline.user_email" readonly="" id="in_email" @blur="checkemai" :placeholder="this.uemail" class="in"></el-input>
                <span id="ec" style="font-size:5px;color: red"></span>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="formInline.user_age" style="width: 195px" readonly="" :placeholder="this.uage" id="age" class="in"></el-input>
              </el-form-item>
                <div class="block">
                  <label>出生年月</label>
                  <el-date-picker
                    v-model="formInline.user_birthday"
                    type="date"
                    :placeholder="this.ubirth"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <el-form-item label="联系电话" prop="tel">
                <el-input v-model="formInline.user_phone" style="width: 225px" readonly="" :placeholder="this.uphone"  class="in" id="phone"></el-input>
              </el-form-item>
              <el-form-item label="居住地址" prop="address">
                <el-input v-model="formInline.user_address" style="width: 420px" readonly="" :placeholder="this.uaddress"  class="in" id="address"></el-input>
              </el-form-item>
<!--              <el-form-item label="个人描述" prop="desc">-->
<!--                <el-input type="textarea" v-model="formInline.desc" :rows="3" style="width: 720px" readonly="" resize:none id="txt"  class="in"></el-input>-->
<!--              </el-form-item>-->
              <el-form-item>
                <el-button @click="edit" id="esub" >编辑</el-button>
                <el-button type="primary" @click="show">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="password">
          <!-- 密码修改 -->
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新的密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" readonly="" id="pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" readonly="" id="checkpass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="savepass">修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
  import $ from 'jquery'
  import qs from 'qs'
  export default {
      name: "UserModify",
      data() {
        // 密码修改
        var validatePass = (rule, value, callback) => {

          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
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
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },
          uname:'',
          usex:'',
          uid:'',
          uemail:'',
          uage:'',
          ubirth:'',
          uphone:'',
          uaddress:'',
          ucontent:'',
          myname:'',

          // 密码
          ruleForm: {
            pass: '',
            checkPass: '',

          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          },
          // 资料修改
          formInline: {
            user_name: '',
            user_sex: '',
            id:'',
            user_email:'',
            user_age:'',
            user_birthday:'',
            user_phone:'',
            user_address:'',
            desc:''
          }
        };
      },
    created() {
      this.myname = sessionStorage.getItem("user_name")
      var data = qs.stringify({"user_name": this.myname})
      this.axios.post('/admin/findUserByName', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
      // alert(res.data[0].user_name)
        this.uname=res.data[0].user_name
        this.uage=res.data[0].user_age
        this.uemail=res.data[0].user_email
        this.ubirth=res.data[0].user_birthday
        this.uaddress=res.data[0].user_address
        this.uid=res.data[0].id
        this.uphone=res.data[0].user_phone
        this.usex=res.data[0].user_sex
      })

    },
      methods: {
        //姓名验证
        checkname(){
          var n=document.getElementById("in_name")
          var rn= new RegExp(/^[a-zA-Z0-9]{2,6}$/);
          //验证用户名
          if (rn.test(n.value)==false) {
            var errmsg="输入不合法"
            document.getElementById("nc").innerHTML=errmsg;
          }else {
            document.getElementById("nc").innerHTML=" ";

          }
        },
        //验证邮箱
        checkemai(){
          var e=document.getElementById("in_email");
          var re=new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
          if (re.test(e.value)==false) {
            var errmsg="格式不对"
            document.getElementById("ec").innerHTML=errmsg;
          }else
            document.getElementById("ec").innerHTML=" ";
        },
        // 密码
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('密码修改成功!');
            } else {
              console.log('密码修改失败!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$nextTick(()=>{
            this.$refs[formName].resetFields();
          })
        },
        edit() {
         $("#age").removeAttr("readonly")
          $("#phone").removeAttr("readonly")
          $("#in_email").removeAttr("readonly")
          $("#address").removeAttr("readonly")
          $("#pass").removeAttr("readonly")
          $("#checkpass").removeAttr("readonly")
          $("#txt").removeAttr("readonly")
        },
        resetF(){
          $(".in").value='';
        },
        savepass(pass){

          pass=this.ruleForm.pass
          var data=qs.stringify({"user_password":pass,"user_name":sessionStorage.getItem('user_name')})
          this.axios.post('/user/updatePassword',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
            if(res.data!=null)
            alert("已保存")
            else if(res.data==null)
              alert("保存失败")
          })
        },
        //user_name, user_sex, id, user_age, user_birthday, user_phone, user_address
        show() {
          var user_name = sessionStorage.getItem("user_name")
          var user_sex = this.formInline.user_sex
          var user_birthday = this.formInline.user_birthday
          var user_email = this.formInline.user_email
          var user_age = this.formInline.user_age
          var id = this.formInline.id
          var user_phone = this.formInline.user_phone
          var user_address = this.formInline.user_address
          alert(user_name)
          var data = qs.stringify({
            "user_name": user_name, "user_sex": user_sex,"user_age":user_age,"user_email": user_email, "user_birthday": user_birthday,
            "user_phone": user_phone , "user_address": user_address
          })
          console.log(data)
          this.axios.post('/user/updateUser', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
            alert("修改成功")
          })
        }
      }
    }
</script>

<style scoped>
  .el-header {
    height: 30px;
    background-color: darkseagreen;
  }
  .nav {
    padding: 25px;
    float: left;
  }
  .bar {
    padding: 25px;
    float: right;
  }


  .el-main {
    width: 85%;
    margin: auto;
    margin-top: 50px;
  }
  .info{
    width: 70%;
    margin: auto;
  }
  .password{
    width: 30%;
    margin: auto;
    margin-top: 100px;
  }
.demo-form-inline{
  line-height: 60px;
}
</style>

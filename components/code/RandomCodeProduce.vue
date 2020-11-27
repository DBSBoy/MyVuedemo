<template>
  <div class="randomcodeuse">
    <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0" inline="true">
      <!-- 随机验证码 输入框 -->
      <!-- 随机验证码 -->
      <el-form-item>
        <el-form-item prop="verifycode" inline-message="true">
          <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput" ></el-input>
        </el-form-item>
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifyCode="identifyCode" ></s-identify>
          </div>
          <!-- 刷新验证码 -->
<!--          <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>-->
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SIdentify from './RandomCode.vue'
  import $ from "jquery";
  export default {
    name: 'userlogin',
    data() {
      // 自定义验证规则：验证码验证规则
      const validateVerifycode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))

        } else if (value !== this.identifyCode) {
          this.pass=0
          console.log('validateVerifycode:', value)
          callback(new Error('验证码不正确'))

        } else {
          this.pass=1
          callback()

        }
      }
      return {
        pass:0,
        loginForm: {
          verifycode: ''
        },
        identifyCodes: '1234567890',
        identifyCode: '',
        loginRules: {
          verifycode: [
            { required: true, trigger: 'blur', validator: validateVerifycode },
          ]
        }
      }
    },
    components: {
      // 注册绘制随机验证码的组件
      SIdentify
    },
    updated(){   //这个函数不管用啊啊啊啊，执行太快了


    },
    created() {setInterval(this.timer, 10);},
    mounted() {
      // 验证码初始化
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)




    },
    computed: {},
    methods: {
      timer(){
      this.$emit('event1', this.pass) // 调用父组件传递过来的方法，同时把数据传递出去
      },
      // 生成随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 切换验证码
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
        this.loginForm.verifycode=''
        this.pass=0
      },
      // 生成四位随机验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
        console.log(this.identifyCode)
      }
    }
  }
</script>

<style scoped>
  .randomcodeuse{

    width: 100%;
    margin: auto;
    display: flex;
  }
  .identifybox {
    margin-left:25px;
    display: inline-block;
    justify-content: space-between;

  }
  .identifyinput{
    left: 45px;
    display: flex;
    width: 100px;
  }
  .iconstyle {
    color: #409EFF;
  }
</style>

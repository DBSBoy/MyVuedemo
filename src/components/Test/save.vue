<template>
  <div class="app-container">
    讲师表单
     <

      <!-- 讲师头像：TODO -->

      <!-- 讲师头像 -->

      <el-form-item label="讲师头像">

          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>
          <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 -->
          <image-cropper
            v-show="imagecropperShow"
            :width="300"
            :height="300"
            :key="imagecropperKey"
            :url="BASE_API+'/oss/fileoss'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>

export default {
  components: {


  },
  data() {
    return {
      teacher:{
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''

      },
      imagecropperShow:false,//是否显示上传组件
      imagecropperKey:0,//上传组件的id
      BASE_API:process.env.BASE_API,
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    //关闭上传组件
    close(){
      this.imagecropperShow=false,
      //每一次打开组件都是一次新的请求，避免在同一次请求的二次选择图片时，就把图片上传了
      this.imagecropperKey=ths.imagecropperKey+1
    },
    //上传图片成功后的操作
    cropSuccess(data){
      this.imagecropperShow=false,
      this.teacher.avatar=data.url,
      this.imagecropperKey=this.imagecropperKey+1
    },
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.teacher = {}
      }
    },
    //根据讲师id查询的方法
    getInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if(!this.teacher.id) {
        //添加
        this.saveTeacher()
      } else {
        //修改
        this.updateTeacher()
      }
    },
    //修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})
        })
    },
    //添加讲师的方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})
        })
    }

  }
}
</script>

<template>
<!--  外部背景-->
  <div class="back1">
<!--    操作区域-->
    <div class="back2">
      <el-container>

        <!--      顶部-->
        <el-header><b>五邑大学图书馆</b></el-header>
            <div class="logup">
              <h1 class="log" @click="$router.push('signup')">注册</h1>
            </div>
            <div class="login">
              <h1 class="log" @click="$router.push('/signin')">登录</h1>
            </div>

<!--        操作区域-->
        <el-main>
          <div class="todo">
            <div class="title">
              <div style="height: 60%" class="book">

                   <img src="../../assets/book2.jpg" class="photo">

              </div>
            </div>
          </div>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
        name: "MainPage",
      data() {
        return {
          imgList: [
            //图片路径不能写为这种形式
            // {
            //   id: '1',
            //   url: '../assets/test1.jpg'
            // },
            //需要使用require获取
            {
              id: '1',
              url: require('../../assets/1.jpg')
            },
            {
              id: '2',
              url: require('../../assets/3.jpg')
            },
            {
              id: '3',
              url: require('../../assets/2.jpg')
            }
          ]
        }
      }
    }
</script>

<style scoped>
  .back1{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-image: linear-gradient(to right, #ebbba7 0%, #cfc7f8 100%);
  }
  .back2{
    /*居中*/
    border-radius: 25px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*设置大小和毛玻璃效果*/
    width: 85%;
    height: 85%;
    background-image: linear-gradient(to right, #a8caba 0%, #5d4157 100%);
  }
  .el-header{
    border-radius: 25px;

    background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;
  }

   .todo{
     height: 100px;
     margin-left:750px;
     height: 300px;


  }
  .title{
    border-radius: 200px;
    background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
    padding: 0;
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    top: 130px;
    left: 0;
    right: 0;
    float: left;
  }
.login{
  text-align: center;
  border-radius: 100px;
  background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
  padding: 20px;
  width: 140px;
  height: 140px;
  margin-left: 300px;
  margin-top: 10px;

}
  .logup{
    text-align: center;
    border-radius: 100px;
    background: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
    padding: 20px;
    width: 140px;
    height: 140px;
    margin-left: 800px;
    margin-top: 40px;
    float:left;
  }
  .log{
    text-align: center;
  }
  .photo{
    border-radius: 200px;
    width: 300px;
    height: 300px;
  }
</style>

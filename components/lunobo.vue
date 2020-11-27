<template>
  <div class="wrap">
    <div class="img-box1">
      <el-carousel height="300px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.url" width="100%" height="300" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
         msg:"hello",
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
    }
  }
</script>

<style scoped>
  .img-box1{
    width: 500px;
  }
</style>

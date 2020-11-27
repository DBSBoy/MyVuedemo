<template>
<div>
<div></div>
    <div style="height: 60%">
      <el-carousel height="300px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.url" width="60%" height="300px" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
     // msg: 'Welcome to Your Vue.js App',
      imgList:[
        {
          id:0,
          url: require('../assets/1.jpg')
        },
        {
          id: 1,
          url: require('../assets/2.jpg')
        },
        {
          id: 2,
          url: require('../assets/3.jpg')
        }
      ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .photo{
    height: 50px;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

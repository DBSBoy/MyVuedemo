<template>
  <div>
    <div>父组件的toCity{{toCity}}</div>
    <FormCheck @showCityName="updateCity" :sendData="toCity"></FormCheck>>
  </div>

</template>

<script>
  import FormCheck from "./FormCheck";
    export default {
        name: "father",
      components:{FormCheck},
      data:function () {
        {
          return {
            toCity: "北京"
          }
        }
      },
      methods:{
        updateCity(data){//触发子组件城市选择-选择城市的事件
          this.toCity = data.cityname;//改变了父组件的值
          console.log('toCity:'+this.toCity)
        }
      }


    }
</script>

<style scoped>

</style>

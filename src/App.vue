<template>
  <div id="app">
<!--    <home></home>-->
    <router-view/>
  </div>
</template>

<script>
  import home from "./components/home";
  import ElementTest from "./components/index";
  // import singin from "./components/singin";
export default {
  name: 'App',
  components: {
     // home
    // singin

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0;
  padding: 0;
  margin: 0;
}
</style>

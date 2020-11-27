// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// axios.defaults.baseURL='/api'
// axios.defaults.headers['Context-Type']='application/json'
import http from "./util/http";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import singin from "./components/singin";
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.axios= http
Vue.config.devtools = true
Vue.prototype.LOGNAME=global
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      user_name:this.LOGNAME.User.user_name
    }
  }
})

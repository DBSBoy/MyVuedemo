import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from "../components/home"
import HelloWorld from "../components/HelloWorld"
import ElementTest from "../components/ElementTest"
import Login from "../components/Login";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'ElementTest',
      component: ElementTest
    },
    {
      path: '/in',
      name: 'in',
      component: Login
    },
    {
      path: '/h',
      name: 'Home',
      component: home
    }

  ]
})

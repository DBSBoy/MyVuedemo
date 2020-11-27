import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from "../components/home"
import HelloWorld from "../components/HelloWorld"
import ElementTest from "../components/index"
import lunobo from "../components/lunobo"
import History from "../components/IBMProject/History";
import singin from "../components/singin";
import checkbook from "../components/checkbook";
import Issue from "../components/IBMProject/Issue";
import BrrowAndCheck from "../components/IBMProject/BrrowAndCheck";
import Bookrepository from "../components/IBMProject/Bookrepository";
import AdminIndex from "../components/AdminIndex";
import MyInfo from "../components/MyInfo";
import UserModify from "../components/UserModify";
import BorrowHistory from "../components/BorrowHistory";
import UserIndex from "../components/UserIndex";
import NoticeManage from "../components/NoticeManage";
import All from "../components/All";
import test from "../components/IBMProject/test";
import MybrrowBook from "../components/MybrrowBook";
import FormCheck from "../components/Test/FormCheck";
import father from "../components/Test/father";
import signup from "../components/signup";
import upfile from "../components/Test/upfile";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ElementTest',
      meta:{
        title:'五邑大学图书馆'
      },
      component: ElementTest
    },

    {
      path: '/h',
      name: 'Home',
      component: home
    },
    {
      path: '/lun',
      name: 'lun',
      component: lunobo
    },
    {
      path: '/signin',
      name: 'signin',
      component: singin
    },

    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/toin',
      name: 'Home',
      component: home
    },
    {
      path: '/checkbook',
      name: 'checkbook',
      component: checkbook
    },
    {
      path: '/issue',
      name: 'issue',
      component: Issue
    },
    {
      path: '/BandC',
      name: 'BC',
      component:BrrowAndCheck
    },
    {
      path: '/BR',
      name: 'BR',
      component: Bookrepository
    },
    {
      // 管理员
      path:'/adminindex',
      name:'AdminIndex',
      component:AdminIndex
    },
    {
      // 我的信息
      path:'/myinfo',
      name:'MyInfo',
      component:MyInfo
    },
    {
      // 信息修改
      path:'/usermodify',
      name:'UserModify',
      component:UserModify
    },
    {
      // 借阅历史
      path:'/borrowhistory',
      name:'BorrowHistory',
      component:BorrowHistory
    },
    {
      // 用户
      path:'/userindex',
      name:'UserIndex',
      component:UserIndex
    },
    //公告
    {
      path:'/noticemanage',
      name:'NoticeManage',
      component: NoticeManage
    },
    {
      path: '/all',
      name: 'all',
      component: All
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/shell',
      name: 'MybookBook',
      component: MybrrowBook
    },
    {
      path: '/tv',
      name: 'FormCheck',
      component: FormCheck
    },
    {
      path: '/fa',
      name: 'father',
      component: father
    },
    {
      path: '/signup',
      name: 'signup',
      component:signup
    },
    {
      path:'/upfile',
      name:'upfile',
      components: upfile
    }

  ]
})

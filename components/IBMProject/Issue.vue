<template>
  <div class="bg1">

    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><b>用户列表管理</b></div>
        <!-- 菜单栏 -->
        <div class="menu">
          <el-menu  class="el-menu-demo" mode="horizontal">
            <el-menu-item index="6" @click="$router.push('/adminindex')">首页</el-menu-item>
            <el-menu-item index="1" @click="$router.push('/issue')">用户列表</el-menu-item>
            <el-menu-item index="2" @click="$router.push('/BandC')">图书借阅与归还</el-menu-item>
            <el-menu-item index="3">注销用户</el-menu-item>
            <el-menu-item index="4" @click="$router.push('/BR')">书库</el-menu-item>
            <el-menu-item index="5" @click="$router.push('noticemanage')">首页公告管理</el-menu-item>
            <el-menu-item index="6">图书借阅统计</el-menu-item>
          </el-menu>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名:{{myname}}</div>
      </el-header>
      <el-main>
        <div class="bg2">
          <div class="inputword">
            <el-input v-model="input" placeholder="请输入内容"/>
          </div>
          <div class="sbtn">
            <el-button type="primary" @click="find">Seach</el-button>
          </div>
          <div style="height: 50px"></div>
          <div v-show="tc">
            <!-- 详情页面 -->
            <div class="detail">
              <el-table
                :data="historyData"
                style="width: 100%;height: 200%" >
                <el-table-column
                  label="用户ID"
                  align='center'
                  sortable
                  width="200" >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.id}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="用户姓名"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.user_name}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="借阅时间"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.borrow_date}}</span>
                  </template>
                </el-table-column>
                <!--书名  -->
                <el-table-column
                  label="书名"
                  width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="类型"
                  width="100">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.book_theme}}</span>
                  </template>
                </el-table-column>
                <!--归还时间 -->
                <el-table-column
                  label="归还时间"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.return_date}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

          <div class="checkBoard">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="用户Id"
                align='center'
                sortable
                width="70" >

                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.id}}</span>
                </template>

              </el-table-column>
              <!-- 日期  -->
              <el-table-column

                label="名字"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.user_name}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                label="性别"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.user_sex}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="邮箱"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.user_email}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="电话"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.user_phone}}</span>
                </template>
              </el-table-column>

              <el-table-column label="详情">
                <template slot-scope="scope">
                    <el-button slot="reference"  @click="getid(scope.row.user_name)">审查</el-button>
                  <el-button slot="reference"  @click="deuser(scope.row.id)">注销</el-button>
<!--                  </el-popover>-->

                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
            </el-pagination>
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import qs from "qs";

  export default {
    name: "issue",
    data(){


      return{
        myname:'',
        input: '',
        tc: false,
        tableData:[
          {
            id:'',
            user_sex:'',
            user_age:'',
            user_email:'',
            user_phone:''
          }
        ], //数据
        historyData:[
          {
            id:'',
            user_name:'',
            book_name:'',
            book_theme:'',
            borrow_date:'',
            return_date:''
          }
        ],

        paginations:{
          page_index:1, //当前页
          total:0, //总数
          page_size:3, //一页显示多少
          page_sizes:[5,10,15,20], //每页显示多少条
          layout:'total, sizes, prev, pager, next, jumper'
         },
        // paginations2:{
        //   page_index:1, //当前页
        //   total:0, //总数
        //   page_size:3, //一页显示多少
        //   page_sizes:[5,10,15,20], //每页显示多少条
        //   layout:'total, sizes, prev, pager, next, jumper'
        // },
        allTableData:[],
        // userData:[]
      }

    },
    methods: {
      find(){

        console.log(this.input.toString())
        var input=this.input.toString()
        var data=qs.stringify({"user_name":input})
        this.axios.post('/admin/findLikeUser',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }
        })

      },
      deuser(uid){
        var id=uid
        var data=qs.stringify({"id":id})
        this.axios.post('/admin/delete',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }
        })

      },
      getid(user_name){
        this.tc=true

        var user_name=user_name
        var data=qs.stringify({"user_name":user_name})
        this.axios.post('/book/borrowListPerson',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {

            const arr=res.data
            this.historyData = arr;
            this.setPaginations()
          }else
            this.historyData=null;
        })
      },
      getInfoList() {
        this.myname=sessionStorage.getItem('user_name')
        this.axios.get('/admin/findAll').then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }
        })
      },
      setPaginations(){
        this.paginations.total = this.allTableData.length; //数据的数量
        this.paginations.page_index = 1; //默认显示第一页
        this.paginations.page_size = 5; //每页显示多少数据
        // this.paginations2.total = this.allTableData.length; //数据的数量
        // this.paginations2.page_index = 1; //默认显示第一页
        // this.paginations2.page_size = 5; //每页显示多少数据


        //显示数据
        this.tableData = this.allTableData.filter((item,index) => {
          return index < this.paginations.page_size;
        })
      //   this.historyData = this.userData.filter((item,index) => {
      //     return index < this.paginations2.page_size;
      //   })
      },
      handleSizeChange(page_size) {
        this.paginations.page_index = 1; //第一页
        this.paginations.page_size = page_size; //每页先显示多少数据
        this.tableData = this.allTableData.filter((item,index) => {
          return index < page_size
        })
        // this.paginations2.page_index = 1; //第一页
        // this.paginations2.page_size = page_size; //每页先显示多少数据
        // this.historyData = this.userData.filter((item,index) => {
        //   return index < page_size
        // })
      },
      handleCurrentChange(page){
        // 跳转页数
        //获取当前页
        let index = this.paginations.page_size * (page -1);
        // let index2 = this.paginations2.page_size * (page -1);
        //获取总数
        let allData = this.paginations.page_size * page;

        let tablist=[];
        for(let i = index;i<allData;i++) {
          if (this.allTableData[i]) {
            tablist.push(this.allTableData[i])
          }
          this.tableData = tablist
        }
      }

    },
    created(){
      this.getInfoList()
    }
  }
</script>

<style scoped>

  .el-header {
    height: 50px;
    background-color: darkseagreen;
  }
  .logo{
    float: left;
    padding: 25px;
  }
  .menu{
    float: left;
    width: 70%;
    margin: auto;
  }
  .el-menu {
    width: 70%;
    margin: auto;
    text-align: center;
    background-color: darkseagreen;
  }
  .el-menu-item{
    color: black;
  }
  /*主体部分*/
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  /*主体部分尺寸*/
  .bg2{
    height: 620px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    height: 400px;
    width: 850px;
    margin-top:50px;
    margin-left: 400px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 400px;
    width: 30%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 300px;
  }
  .page{
    margin-top: 10px;
  }
  /*页面标题*/
  .title1{
    float: left;
    font-size: 20px;
  }
/*  页面导航*/
  .Tlink{
    margin-left: 1000px;
  }
  .Tlink1{
    color: white;
  }

  .menu{
    float: left;
    width: 70%;
    margin: auto;
  }
  .detail{
    /*float: left;*/
  }
</style>

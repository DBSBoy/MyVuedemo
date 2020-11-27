<template>
  <div class="bg1">

    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><b>统计页面</b></div>
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
          <div class="checkBoard">
            <el-table
              :data="tableData"
              style="width: 100%">

              <!--书名  -->
              <el-table-column
                label="今日借出统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[0]}}</span>
                </template>
              </el-table-column>

              <!--借阅有效期-->
              <el-table-column
                label="今日归还统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[1]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本月借出统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[2]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本月归还统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[3]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本年借出统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[4]}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="本年归还统计"
                width="200">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row[5]}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
<!--            <el-pagination-->
<!--              @size-change="handleSizeChange"-->
<!--              @current-change="handleCurrentChange"-->
<!--              :current-page="paginations.page_index"-->
<!--              :page-sizes="paginations.page_sizes"-->
<!--              :page-size="paginations.page_size"-->
<!--              :layout="paginations.layout"-->
<!--              :total="paginations.total">-->
<!--            </el-pagination>-->
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "all",
    data(){


      return{
        myname:'',
        input: '',
        tableData:[
          {
            id:'',
            date:'',
            Bookname:''
          }
        ], //数据
        paginations:{
          page_index:1, //当前页
          total:0, //总数
          page_size:3, //一页显示多少
          page_sizes:[5,10,15,20], //每页显示多少条
          layout:'total, sizes, prev, pager, next, jumper'
        },
        allTableData:[]
      }

    },
    methods: {
      getInfoList() {
        this.axios.get('/count/number').then(res => {
          if(res.data!='') {
            const arr=[]
            for(let k in res.data){
              arr.push(res.data)
            }
            console.log('数据'+arr[0][0])
            // this.tableData = data;
            // const arr=res.data
           this.allTableData = arr;
            // console.log(this.allTableData)
            this.setPaginations()
          }
        })
      },
      setPaginations(){
        this.paginations.total = this.allTableData.length; //数据的数量
        this.paginations.page_index = 1; //默认显示第一页
        this.paginations.page_size = 1; //每页显示多少数据

        //显示数据
        this.tableData = this.allTableData.filter((item,index) => {
          return index < this.paginations.page_size;
        })
      },
      handleSizeChange(page_size) {
        this.paginations.page_index = 1; //第一页
        this.paginations.page_size = page_size; //每页先显示多少数据
        this.tableData = this.allTableData.filter((item,index) => {
          return index < page_size
        })
      },
      handleCurrentChange(page){
        // 跳转页数
        //获取当前页
        let index = this.paginations.page_size * (page -1);
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
      this.myname=sessionStorage.getItem('user_name')

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
    width: 2000px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    height: 400px;
    width: 100%;
    margin-top:50px;

  }

  .page{
    margin-top: 10px;
  }
  /*页面标题*/
  .title1{
    float: left;
    font-size: 20px;
  }

  .Tlink1{
    color: white;
  }

  .menu{
    float: left;
    width: 70%;
    margin: auto;
  }
</style>

<template>
    <div class="bg1">
      <el-container>
        <el-header>
          <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/myinfo' }">我的信息</el-breadcrumb-item>
              <el-breadcrumb-item>借阅历史</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 登录状态显示 -->
          <div class="bar">用户名：{{myname}}</div>
          <div class="exit">
            <el-button type="primary" @click="$router.push('/')">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <div class="bg2">
            <div class="inputword">
              <el-input v-model="input" placeholder="请输入内容"/>
            </div>
            <div class="sbtn">
            <el-button type="primary" @click="find">查阅</el-button>
            </div>
            <div style="width: 500px">
<!--这个detail是点击详情弹出的页面，点击这本是就会弹出这本书被你借阅的历史-->
            <div class="detail" v-show="showde" id="de" style="margin-left: 400px;width: 800px">
              <el-table
                :data="userData"
                style="width: 400%" >

                <el-table-column
                  label="用户"
                  width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.user_name}}</span>
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
                  label="剩余时间"
                  width="250">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.dead_line}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="借阅日期"
                  width="250">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.borrow_date}}</span>
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
                  type="index"
                  label="行号"
                  align='center'
                  sortable
                  width="70" >
                </el-table-column>

<!-- 日期  -->
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
<!--借阅有效期-->
<!--                <el-table-column-->
<!--                  label="借阅有效期"-->
<!--                  width="100">-->
<!--                  <template slot-scope="scope">-->
<!--                    <span style="margin-left: 10px">{{scope.row}}</span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
                <el-table-column label="详情">
                  <template slot-scope="scope">


                    <el-button slot="reference"  @click="getid(scope.row.book_name,scope.row.user_name)">详情</el-button>

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
    import singin from "../singin";
    import qs from "qs";
    import $ from 'jquery'
    export default {
        name: "History",
        data:function(){

          return{
            showde:false,
            myid:'',
            myname:'',
            input: '',
            tableData:[
              {
                id:'',
                borrow_date:'',
                book_name:'',
                return_date:'',
                book_theme:'',
                dead_line:'',
              }
            ], //数据
            paginations:{
              page_index:1, //当前页
              total:0, //总数
              page_size:3, //一页显示多少
              page_sizes:[5,10,15,20], //每页显示多少条
              layout:'total, sizes, prev, pager, next, jumper'
            },
            allTableData:[],
            userData:[]
          }

        },
      methods: {
         getid(bookname,username){
           this.showde=!this.showde
           var data=qs.stringify({"book_name":bookname,"user_name":username})
           this.axios.post('/countDays/countDays',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
             if(res.data!='') {
               const arr=res.data
               this.userData = arr;
               this.setPaginations()
             }
           })

         },
        find(){

          console.log(this.input.toString())
          var input=this.input.toString()
         var data=qs.stringify({"randomStrBorrow":input})
          this.axios.post('/book/findLikeBorrow',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
              if(res.data!='') {

                const arr=res.data
                this.allTableData = arr;
                console.log(this.allTableData)
                this.setPaginations()
              }
              })

        },
        getname(){
          this.myname=sessionStorage.getItem("user_name")
        },
        Seach(input){
          input=this.input
          var data=qs.stringify({"input":input})
          // 这个字段传回后端，后端根据这个查数据库，返回个list再赋值给这边的数组
        },
        //book/findOneBook,/getBook2
        getInfoList() {

           var user_name=this.myname
          var data=qs.stringify({"user_name":user_name})
          this.axios.post('/user/borrowListPerson',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            if(res.data!='') {
              const arr1=[]
              for(let k in res.data){
                arr1.push(res.data)
              }
              const arr=res.data
              this.allTableData = arr;
              console.log(this.allTableData)
              this.setPaginations()
            }
          })

        },
        getday(){

          this.axios.get('/user/index',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                var num=res.data[0]
            alert(num)
          })

        },
        setPaginations(){
          this.paginations.total = this.allTableData.length; //数据的数量
          this.paginations.page_index = 1; //默认显示第一页
          this.paginations.page_size = 5; //每页显示多少数据

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
          this.getname()
          this.getInfoList()
          // this.getday()
       },
      components:{
          singin
      }
    }
</script>

<style scoped>
  .el-header {
    height: 50px;
    background-color: rgba(120, 170, 236, 0.5);
  }
  .nav {
    padding: 15px;
    float: left;
  }
  .bar{
    padding: 15px;
    float: right;
  }
  .exit{
    padding: 10px;
    float: right;
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
    height: 700px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    /*height: 480px;*/
    width: 800px;
    margin: auto;
    margin-top:30px;
  }
/*  输入框*/
  .inputword{
    margin: auto;
    margin-left: 340px;
    width: 45%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 300px;
  }
  .page{
    margin-top: 10px;
  }
  .detail{
    margin: auto;
    margin-top: 20px;
    margin-left: 340px;
    width: 800px;
  }
</style>

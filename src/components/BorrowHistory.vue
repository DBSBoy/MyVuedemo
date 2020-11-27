<template>
  <div class="borrowhistory">
    <el-container>
      <el-header>
        <!-- 面包屑导航 -->
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/myinfo' }">我的信息</el-breadcrumb-item>
            <el-breadcrumb-item>借阅历史</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名</div>
      </el-header>

      <el-main>
        <div class="bg2">
          <div class="inputword">
            <el-input v-model="input" placeholder="请输入内容"/>
          </div>
          <div class="sbtn">
            <el-button type="primary">Seach</el-button>
          </div>

          <div class="checkBoard">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                align='center'
                sortable
                width="70">
              </el-table-column>
              <!-- 日期  -->
              <el-table-column

                label="借阅时间"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.date1}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                label="书名"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.bookname}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="归还时间"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.date2}}</span>
                </template>
              </el-table-column>
              <!--借阅有效期-->
              <el-table-column
                label="借阅有效期"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.day}}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <el-table :data="gridData">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="姓名"></el-table-column>
                    <el-table-column width="300" property="address" label="地址"></el-table-column>
                  </el-table>
                  <el-button slot="reference">详情</el-button>
                </el-popover>
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
    export default {
      name: "BorrowHistory",
      data(){
        return{
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
            page_size:5, //一页显示多少
            page_sizes:[5,10,15,20], //每页显示多少条
            layout:'total, sizes, prev, pager, next, jumper'
          },
          allTableData:[],

          // 弹出框
          gridData: [{
            借阅ID: '',
            用户名: '',
            距归还还剩: '',
            书籍名称: '',
            借阅时间: '',
            借阅有效期: ''

          }]
        }
      },
      methods: {
        getInfoList() {
          this.axios.get('/').then(res => {
            if(res.data!='') {
              // const arr=[]
              // for(let k in res.data){
              //   arr.push(res.data)
              // }
              // console.log('数据'+arr[0])
              // this.tableData = data;
              const arr=res.data;
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
      }
    }
</script>

<style scoped>
  /* 头部样式 */
  .el-header {
    height: 30px;
    background-color: darkseagreen;
  }
  .nav {
    padding: 15px;
    float: left;
  }
  .bar {
    padding: 15px;
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
    margin-bottom: 50px;
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
    height: 500px;
    width: 720px;
    margin-top:50px;
    margin-left: 400px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 500px;
    width: 30%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 50px;
  }
  .page{
    margin-top: 150px;
    margin: 80px;
  }
  /* 表单 */
</style>

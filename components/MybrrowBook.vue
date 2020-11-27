<template>
  <div class="bg1">
    <el-container>
      <el-header>
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/myinfo' }">我的信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/history' }">借阅历史</el-breadcrumb-item>
            <span id="uname" style="float: left;margin-left: 100px">用户名：{{Uname}}</span>
            <div style="margin-left:1500px"><el-button type="primary" @click="$router.push('/')">退出</el-button></div>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main>
        <div class="bg2">
          <div class="inputword">
          </div>
<!--          <div class="sbtn">-->
<!--            <el-button type="primary">还书</el-button>-->
<!--          </div>-->


          <div class="checkBoard">
            <el-table
              :data="tableData"
              style="width: 100%">
              <!-- 日期  -->
<!--              <el-table-column-->

<!--                label="借阅时间"-->
<!--                width="180">-->
<!--                <template slot-scope="scope">-->
<!--                  <span style="margin-left: 10px">{{scope.row}}</span>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <!--书名  -->
              <el-table-column
                label="书名"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <!--借阅有效期-->
              <el-table-column
                label="主题"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_theme}}</span>
                </template>
              </el-table-column>
              <el-table-column

                label="用户ID"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="借阅日期"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.borrow_date}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="还书操作"
                width="100">
                <template slot-scope="scope">
                  <el-button type="primary" id="back" @click="back(scope.row.book_name,scope.row.user_name)">{{zt}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import qs from "qs";
  import singin from "./singin";
  export default {
    name: "MybrrowBook",
    data:function (){
      return{
        zt:'还书',
        input: '',
        Uname:'',
        tableData:[
          {
            id:'',
            borrow_date:'',
            book_name:'',
            return_date:'',
            book_theme:''
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
      back(ubook,uname){
        var data=qs.stringify({"book_name":ubook,"user_name":uname})
        this.axios.post('book/returnBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if (res.data=='还书成功') {
            alert(res.data[0])
            location.reload()
          }
        })
      },
      // getname(){
      //   this.axios.get('/user/index').then((res) => {
      //     this.Uname=res.data[0]
      //     console.log(this.Uname)
      //   })
      // },
      Seach(){
        id=this.id
        var data=qs.stringify({"id":id})
        // 这个字段传回后端，后端根据这个查数据库，返回个布尔值，是true说明书在借，按钮值是'还书',false则是'已还'
        this.axios.post('/checkbook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {

        })
      },
      getInfoList() {
       this.Uname=sessionStorage.getItem("user_name")
        var data=qs.stringify({"user_name": this.Uname})
        this.axios.post('/book/unReturnListByUserName',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr1=[]
            for(let k in res.data){
              arr1.push(res.data)
            }
            console.log('数据'+JSON.stringify(arr1[0][0].id))
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
      // this.getname()
      this.getInfoList()
    },
    components:{
      singin
    }
  }
</script>

<style scoped>

  .el-header {
    background-image: linear-gradient(to right, #a8caba 0%, #7ac5d8 100%);
    color: white;
    text-align: center;
    line-height: 60px;
    padding: 10px;
  }
  /*主体部分*/
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 10px;
  }

  body > .el-container {
    margin-bottom: 10px;
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
    height: 150px;
    width: 550px;
    margin-top:20px;
    margin-left: 400px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 400px;
    width: 35%;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 300px;
  }
  .page{
    margin-top: 10px;
  }

</style>

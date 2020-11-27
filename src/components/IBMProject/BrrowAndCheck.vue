<!--借阅与查询-->
<template>
  <div class="bg1">
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><img src="~@/assets/library.png" alt="" class="logop" /></div>
        <!-- 菜单栏 -->
        <div class="menu">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="$router.push('/adminindex')">首页</el-menu-item>
            <el-menu-item index="2" @click="$router.push('/issue')">用户列表</el-menu-item>
            <el-menu-item index="3" @click="$router.push('/BandC')">图书借阅与归还</el-menu-item>
            <el-menu-item index="4" @click="$router.push('/BR')">书库</el-menu-item>
            <el-menu-item index="5" @click="$router.push('/noticemanage')">首页公告管理</el-menu-item>
            <el-menu-item index="6" @click="$router.push('/all')">图书借阅统计</el-menu-item>
          </el-menu>
        </div>
        <!-- 显示当前用户名 -->
        <div class="bar">用户名：{{myname}}</div>
        <div class="exit">
<!-- 退出登录         -->
          <el-button type="primary" @click="$router.push('/')">退出</el-button>
        </div>
      </el-header>
<!-- 下拉框类型选择     -->
      <el-main>
        <div class="downTab">
          <el-select v-model="value" placeholder="国家">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" placeholder="类型">
            <el-option
              v-for="item in option2"
              :key="item.value2"
              :label="item.label2"
              :value="item.value2">
            </el-option>
          </el-select>
          <el-select v-model="value3" placeholder="主题">
            <el-option
              v-for="item in option3"
              :key="item.value3"
              :label="item.label3"
              :value="item.value3">
            </el-option>
          </el-select>
          <el-button type="primary" @click="typefind">查询</el-button>
        </div>
        <div class="bg2">
          <div class="inputword">
            <el-input v-model="input" placeholder="请输入内容"/>
          </div>
          <div class="sbtn">
            <el-button type="primary" @click="find">搜索</el-button>
          </div>

          <div id="show" v-show="xq">
            <el-table  :data="historyData">
              <el-table-column label="简介"
                               align='center'
                               sortable
                               width="200" >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_summary}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="上架时间"
                width="160">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_uptime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="剩余量"
                width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_status}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="书名"
                width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="状态"
                width="150">
                <template slot-scope="scope">
                  <el-button slot="reference" id="zt">{{zt}}</el-button>

                </template>
              </el-table-column>
            </el-table>

          </div>
<!--checkBoard是中间显示图书显示-->
          <div class="checkBoard">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                label="ID"
                align='center'
                sortable
                width="70">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                label="书名"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="类型"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_type}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="国家"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_country}}</span>
                </template>
              </el-table-column>
              <!--借阅有效期-->
              <el-table-column
                label="主题"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_theme}}</span>
                </template>
              </el-table-column>

                <el-table-column label="详情">
                  <template slot-scope="scope">
                  <el-button slot="reference"  @click="bmsg(scope.row.book_name,scope.row.book_status)">审查</el-button>
                </template>
              </el-table-column>
            </el-table>
<!--            弹窗-->

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
    name: "BR",
    data(){
      return{
        activeIndex: '3',
        myname:'',
          xq:false,
          zt:'可借',
        options: [{
          value: '中国',
          label: '中国'
        }, {
          value: '日本',
          label: '日本'
        }, {
          value: '美国',
          label: '美国'
        }, {
          value: '法国',
          label: '法国'
        }, {
          value: '俄罗斯',
          label: '俄罗斯'
        }],
        option2: [{
          value2: '文学',
          label2: '文学'
        }, {
          value2: '儿童',
          label2: '儿童'
        }, {
          value2: '科幻',
          label2: '科幻'

        }],
        option3: [{
          value3: '浪漫',
          label3: '浪漫'
        }, {
          value3: '战争',
          label3: '战争'
        }],
        value: '',
        value2:'',
        value3:'',
        input: '',
        tableData:[
          {
            id:'',
            date:'',
            book_name:'',
            book_type:'',
            book_country:''
          }
        ], //数据
        historyData:[
          {
            id:'',
            user_name:'',
            book_name:'',
            book_theme:'',
            borrow_date:'',
            return_date:'',
            book_status:''
          }
        ],
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
      bmsg(book_name,book_status){
        this.xq=!this.xq
        var book_name=book_name
        var data=qs.stringify({"book_name":book_name})
        this.axios.post('/book/findBookByBookName',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {

            const arr=res.data
            this.historyData = arr;
            this.setPaginations()
          }else
            this.historyData=null;
          if(book_status==0){
            const h = this.$createElement;
            this.$notify({
              title: '温馨提示',
              message: h('i', { style: 'color: teal'}, '剩余量为0，请及时补充或者查阅归还量~')
            });
          }else {
            const h = this.$createElement;

            this.$notify({
              title: '温馨提示',
              message: h('i', { style: 'color: teal'}, '库存充足可以被借~')
            });
          }

        })
      },
      typefind(){
        console.log(this.value+this.value2+this.value3)
        var data=qs.stringify({"book_country":this.value,"book_type":this.value2,"book_theme":this.value3})
        this.axios.post('/book/typeBooks',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }else if(res.data=" ")
            this.$notify.info({
              title: '错误',
              message: '没有这样的书哟~'
            });
        })
      },
      find(){

        console.log(this.input.toString())
        var input=this.input.toString()
        var data=qs.stringify({"randomStr":input})
        this.axios.post('/book/findLike',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }
        })

      },
      getInfoList() {
        this.axios.get('/book/allBooks').then(res => {
          if(res.data!='') {
            // const arr=[]
            // for(let k in res.data){
            //   arr.push(res.data)
            // }
            // console.log('数据'+arr[0])
            // this.tableData = data;
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
      this.getInfoList()
      this.myname=sessionStorage.getItem('user_name')

    }
  }
</script>

<style scoped>
  #show{
    margin: auto;
    margin-top: 30px;
    width: 900px;
  }
  .el-header {
    height: 50px;
    background-color: rgba(120, 170, 236, 0.5);
  }
  .logo{
    float: left;
  }
  .logop{
    width: 140px;
    border: none;
  }
  .bar{
    padding: 15px;
    float: right;
  }
  .exit{
    padding: 10px;
    float: right;
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
    background-color: rgba(120, 170, 236, 0.5);
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
    margin-bottom: 20px;
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
    height: 530px;
    margin: auto;
    margin-top: 30px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    /*height: 300px;*/
    width: 740px;
    margin: auto;
    margin-top:20px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 370px;
    width: 40%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 325px;
  }
  .page{
    margin-top: 10px;
  }
  /*下拉菜单*/
  .el-dropdown {
    vertical-align: top;
  }
  .title1{
    float: left;
    font-size: 20px;
  }
  /*  页面导航*/
  .Tlink{
    margin-left: 1000px;
  }
</style>

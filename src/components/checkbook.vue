<template>
  <div class="bg1">
    <el-container>
      <el-header>
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/userindex' }">读者首页</el-breadcrumb-item>
            <el-breadcrumb-item>图书库</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="bar">用户名：{{myname}}</div>
        <div class="exit">
          <el-button type="primary" @click="$router.push('/')">退出</el-button>
        </div>
      </el-header>
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
            <el-button type="primary" @click="find()">搜索</el-button>
          </div>
<!--详情页面-->
          <div>
          <div class="detail2" id="de" v-show="showde">
            <el-table
              :data="bookData"
              style="width: 100%"
              highlight-current-row>
              <el-table-column
                label="书本ID"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="书名"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="国家"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_country}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                label="类型"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_type}}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="主题"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_theme}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="简介"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_summary}}</span>
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

                label="书名"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                label="国家"
                width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_country}}</span>
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
                label="主题"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_theme}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="剩余数量"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_status}}</span>
                </template>
              </el-table-column>



              <el-table-column label="详情">
                <template slot-scope="scope">

                    <!-- 详情页面 -->

                    <el-button slot="reference"  @click="showbook(scope.row.id)">详情</el-button>
                  <el-button slot="reference" @click="borrow(scope.row.book_name,scope.row.book_status)" id="bo" >{{bz}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page" >
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
  import $ from 'jquery'
  import qs from 'qs'
  export default {
    name: "checkbook",
    data(){


      return{
        styleObject:false,
        bz:'借书',
        showde:false,
        myname:'',
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
        bookData:[{
          id:'',
          book_name:'',
          book_country:'',
          book_type:'',
          book_summary:''

        }


        ],
        tableData:[
          {
            id:'',
            date:'',
            Bookname:''
          }
        ], //数据
        lsit:[
          {
            book_country: '',
            book_type: '',

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
      //借书的具体实现，通过点击借书按钮传入书籍的名字和用户名,book_status是书剩余数量
      borrow(book_name,book_status){


          this.styleObject = true
          var user_name = sessionStorage.getItem('user_name')
          var data = qs.stringify({"book_name": book_name, "user_name": user_name})
          this.axios.post('/book/borrowBook', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            if(res.data=='3'){
              this.$notify.info({
                title: '错误',
                message: '书本已没有啦~'
              });
            }
             else if(res.data=='2'){
              this.$notify.info({
                title: '错误',
                message: '书本已下架啦~'
              });
            }
            else if(res.data=='4'){
              this.$notify.info({
                title: '错误',
                message: '借书数量已达上限啦~'
              });
            }
           else if(res.data=='5'||res.data==''){
              this.$notify.info({
                title: '错误',
                message: '已经借过了啦~'
              });
            }
           else if(res.data=='1')
                this.$notify.info({
                  title: '成功',
                  message: '借阅成功~'
                });
                // location.reload()

          })

      },
      showbook(bookid){
        this.showde=!this.showde
        var id=bookid
        var data=qs.stringify({"id":id})
        this.axios.post('/book/findBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.bookData = arr;
            this.setPaginations()
          }
        })
      },
      typefind(){
        var data=qs.stringify({"book_country":this.value,"book_type":this.value2,"book_theme":this.value3})
        this.axios.post('/book/typeBooks',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()

          }else
            this.$notify.info({
              title: '错误',
              message: '没有这样的书哟~'
            });
          this.value=''
          this.value2=''
          this.value3=''
        })
      },
      find(){
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
      seach(country,type){
        country=this.list.book_country
        type=this.list.book_type
        var data=qs.stringify({"book_country":country},{"book_type":type})
        this.axios.post('/',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
        })
      },
      getInfoList() {
        this.myname=sessionStorage.getItem('user_name')
        this.axios.get('/book/allBooks').then(res => {
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
    height: 500px;
    margin: auto;
    margin-top: 60px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    /* height: 300px; */
    width: 900px;
    margin: auto;
    margin-top:30px;
    /* margin-left: 400px; */
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 360px;
    width: 40%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 300px;
  }
  .page{
    margin-top: 20px;
  }
  /*下拉菜单*/
  .el-dropdown {
    vertical-align: top;
  }
  .detail2{
    margin: auto;
    margin-top: 20px;
    width: 820px;
  }
  .active{
    background-color: #42b983;
  }
</style>

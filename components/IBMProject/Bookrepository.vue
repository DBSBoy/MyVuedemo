<!--书库-->
<template>
  <div class="bg1">
    <el-container>
      <el-header>
        <!-- LOGO位置 -->
        <div class="logo"><b>书库</b></div>
        <!-- 菜单栏 -->
        <div class="menu">
          <el-menu  class="el-menu-demo" mode="horizontal">
            <el-menu-item index="6" @click="$router.push('/adminindex')">首页</el-menu-item>
            <el-menu-item index="1" @click="$router.push('/issue')">用户列表</el-menu-item>
            <el-menu-item index="2" @click="$router.push('/BandC')">图书借阅与归还</el-menu-item>
            <el-menu-item index="3">注销用户</el-menu-item>
            <el-menu-item index="4" @click="$router.push('/BR')">书库</el-menu-item>
            <el-menu-item index="5" @click="$router.push('noticemanage')">首页公告管理</el-menu-item>
            <el-menu-item index="6" @click="$router.push('/all')">图书借阅统计</el-menu-item>
          </el-menu>
        </div>
        <!-- 登录状态显示 -->
        <div class="bar">用户名:{{myname}}</div>
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
          <el-button type="primary" icon="el-icon-edit" circle @click="addbook">添加</el-button>
<!--          图书编辑-->

          <div class="bookedit" v-show="this.booklist">
            <LABEL style="margin-right: 750px">图书属性：</LABEL>
            <el-select v-model="BEvalue" placeholder="国家">
              <el-option
                v-for="item in BEoptions"
                :key="item.BEvalue"
                :label="item.BElabel"
                :value="item.BEvalue">
              </el-option>
            </el-select>
            <el-select v-model="BEvalue2" placeholder="类型">
              <el-option
                v-for="item in BEoption2"
                :key="item.BEvalue2"
                :label="item.BElabel2"
                :value="item.BEvalue2">
              </el-option>
            </el-select>
            <el-select v-model="BEvalue3" placeholder="主题">
              <el-option
                v-for="item in BEoption3"
                :key="item.BEvalue3"
                :label="item.BElabel3"
                :value="item.BEvalue3">
              </el-option>
            </el-select><br><br>
<!--            <LABEL style="margin-right: 750px">图书简介：</LABEL>-->
              <el-input type="textarea" v-model="summary" style="width: 30%;margin-left: 85px;float: left" placeholder="图书简介"></el-input>
            <el-button type="success" @click="addbook2">保存</el-button>
<!--            <LABEL style="margin-right: 750px">书名：</LABEL>-->
            <el-input v-model="bname" style="width: 20%;margin-left:50px" placeholder="书名"></el-input>
          </div><br/>








          <!--          编辑设置-->
          <div v-show="ed" id="ed">
            <!--                  表格-->
            <el-table
              :data="historyData"
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
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
<!--              可编辑区域-->
              <el-table-column
                label="类型"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    <el-select v-model="Evalue2" placeholder="类型">
            <el-option
              v-for="item in Eoption2"
              :key="item.Evalue2"
              :label="item.Elabel2"
              :value="item.Evalue2">
            </el-option>
          </el-select>
                  </span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="国家"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                    <el-select v-model="Evalue" placeholder="国家">
            <el-option
              v-for="item in Eoptions"
              :key="item.Evalue"
              :label="item.Elabel"
              :value="item.Evalue">
            </el-option>
          </el-select>
                  </span>
                </template>
              </el-table-column>
              <!--借阅有效期-->
              <el-table-column
                label="主题"
                width="100">

                <template slot-scope="scope">
                  <span style="margin-left: 10px">
                     <el-select v-model="Evalue3" placeholder="主题">
                  <el-option
                    v-for="item in Eoption3"
                    :key="item.Evalue3"
                    :label="item.Elabel3"
                    :value="item.Evalue3">
                  </el-option>
                </el-select>
                   </span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button slot="reference" class="zbtn" icon="el-icon-edit" circle @click="editbook(scope.row.id)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>


<!--中间操作框-->

        </div>
        <div class="bg2">
          <div class="inputword">
            <el-input v-model="input" placeholder="请输入内容"/>
          </div>

          <div class="sbtn">
            <el-button type="primary" @click="find">Seach</el-button>
          </div>

<!--表格显示区域-->
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
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="类型"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_type}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="国家"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_country}}</span>
                </template>
              </el-table-column>
              <!--借阅有效期-->
              <el-table-column
                label="还书日期"
                width="100">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.borrow_date}}</span>
                </template>
              </el-table-column>

<!--编辑修改              -->

              <el-table-column label="详情">
                <template slot-scope="scope">
                  <el-button slot="reference" class="zbtn" icon="el-icon-edit" circle @click="edit(scope.row.book_name)">编辑</el-button>
                  <!-- 嵌套                 -->
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
    name: "BR",
    data(){


      return{
        myname:'',
        booklist:false,
        ed:false,
        type:'',
        country:'',
        theme:'',
        bname:'',
       summary:'',
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

        Eoptions: [{
          Evalue: '中国',
          Elabel: '中国'
        }, {
          Evalue: '日本',
          Elabel: '日本'
        }, {
          Evalue: '美国',
          Elabel: '美国'
        }, {
          Evalue: '法国',
          Elabel: '法国'
        }, {
          Evalue: '俄罗斯',
          Elabel: '俄罗斯'
        }],
        Eoption2: [{
          Evalue2: '文学',
          Elabel2: '文学'
        }, {
          Evalue2: '儿童',
          Elabel2: '儿童'
        }, {
          Evalue2: '科幻',
          Elabel2: '科幻'

        }],
        BEoption3: [{
         BEvalue3: '浪漫',
          BElabel3: '浪漫'
        }, {
          BEvalue3: '战争',
          BElabel3: '战争'
        }],
        BEoptions: [{
          BEvalue: '中国',
          BElabel: '中国'
        }, {
          BEvalue: '日本',
          BElabel: '日本'
        }, {
          BEvalue: '美国',
          BElabel: '美国'
        }, {
          BEvalue: '法国',
          BElabel: '法国'
        }, {
          BEvalue: '俄罗斯',
          BElabel: '俄罗斯'
        }],
        BEoption2: [{
          BEvalue2: '文学',
          BElabel2: '文学'
        }, {
          BEvalue2: '儿童',
          BElabel2: '儿童'
        }, {
          BEvalue2: '科幻',
          BElabel2: '科幻'

        }],
        BEoption3: [{
          BEvalue3: '浪漫',
          BElabel3: '浪漫'
        }, {
          BEvalue3: '战争',
          BElabel3: '战争'
        }],
        value: '',
        value2:'',
        value3:'',
        Evalue:'',
        Evalue2:'',
        Evalue3:'',
        BEvalue:'',
        BEvalue2:'',
        BEvalue3:'',
        input: '',
        tableData:[
          {
            id:'',
            date:'',
            Bookname:''
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
      addbook(){
          this.booklist=!this.booklist
      },
      addbook2(){
        var data=qs.stringify({"book_type":this.BEvalue2,"book_theme":this.BEvalue3,"book_country":this.BEvalue,"book_summary":this.summary,"book_name":this.bname})
        this.axios.post('/book/insertBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {

          if(res.data=='插入成功') {
            alert("添加成功！")
          }else
            alert("添加失败")
        })
      },
      editbook(id){

        var data=qs.stringify({"id":id,"book_type":this.Evalue2,"book_theme":this.Evalue3,"book_country":this.Evalue})
        alert(id+this.Evalue2+this.Evalue+this.Evalue3)
        this.axios.post('/book/updateBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr = res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
          }
        })
      },
      edit(book_name){
        this.ed=!this.ed
        var book_name=book_name
        var data=qs.stringify({"book_name":book_name})
        this.axios.post('/book/findBookByBookName',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr=res.data
            this.historyData = arr;
            this.setPaginations()
          }else
            this.historyData=null;

        })
      },
      typefind(){
        console.log(this.value+this.value2+this.value3)
        var input=this.value+this.value2+this.value3;
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
        this.myname=sessionStorage.getItem('user_name')
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
    height: 550px;
    margin: 20px;
    margin-left: 20px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    height: 300px;
    width: 650px;
    margin-top:20px;
    margin-left: 400px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 450px;
    width: 30%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 300px;
  }
  .page{
    margin-top: 100px;
  }

  .downTab{
    padding: 10px;
  }
  #ed{
    width: 50%;
    margin: 50px;
    margin-left: 400px;
  }
  .bookedit{
    margin: 20px;
    border: #57c6e1 solid 3px;
    background-color: #00d4ff;
    width: 60%;
    height: 200px;
    margin-left: 300px;
  }
</style>

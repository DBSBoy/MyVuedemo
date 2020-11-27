<!--书库-->
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
        <!-- 登录状态显示 -->
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
          <el-button type="primary" icon="el-icon-edit" circle @click="addbook">添加</el-button>



          <!--          图书编辑-->

          <div class="bookedit" v-show="this.booklist">
            <LABEL>图书属性<br/><br/></LABEL>
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
            <el-input type="textarea" v-model="summary" placeholder="图书简介"></el-input>
<!--            <LABEL style="margin-right: 750px">书名：</LABEL>-->
            <el-input v-model="bname" placeholder="书名"></el-input>
            <el-button type="primary" @click="addbook2">保存</el-button>
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
                width="80">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <!--书名  -->
              <el-table-column
                  label="下架选择"
                width="80">
                <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle @click="down(scope.row.book_name)"></el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="上架数量"
                width="80">
                <template slot-scope="scope">
                  <el-input v-model="countinput" placeholder="输入数量"></el-input>
                </template>
              </el-table-column>

<!--             点击编辑弹出可编辑区域-->
              <el-table-column
                label="类型"
                width="130">
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
                width="130">
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
                width="150">

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
                width="150">
                <template slot-scope="scope">
                  <el-button slot="reference" class="zbtn" icon="el-icon-edit" circle @click="editbook(scope.row.id,scope.row.book_status)">编辑</el-button>
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
            <el-button type="primary" @click="find">搜索</el-button>
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
                width="130">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="类型"
                width="130">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_type}}</span>
                </template>
              </el-table-column>
              <!--归还时间 -->
              <el-table-column
                label="国家"
                width="130">
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

              <el-table-column
                label="生剩余量"
                width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{scope.row.book_status}}</span>
                </template>
              </el-table-column>

<!--编辑修改              -->

              <el-table-column label="详情">
                <template slot-scope="scope">
                  <el-button slot="reference" class="zbtn" icon="el-icon-edit" circle @click="edit(scope.row.book_name,scope.row.book_status)" id="edi" :disabled="isdisabledFn">编辑</el-button>
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
        countinput:'',
        dialogVisible: false,
        isDisabl:false,
        radio1:'0',
        activeIndex: '4',
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
        },
          {
            value: '其他',
            label: '其他'
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
        }, {
          value: '其他',
          label: '其他'
        }],
        Eoption2: [ {
          Evalue2: '儿童',
          Elabel2: '儿童'
        }, {
          Evalue2: '科幻',
          Elabel2: '科幻'
        }],
        Eoption3: [{
         Evalue3: '浪漫',
          Elabel3: '浪漫'
        }, {
          Evalue3: '战争',
          Elabel3: '战争'
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
      //上架弹出框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });

    },
      upbook(){
        this.dialogVisible =! this.dialogVisible
      },
      //下架选择，c
      down(book_name){
        var data=qs.stringify({"book_name":book_name})
        this.axios.post('/admin/changeStatusDown',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          alert(res.data)
          if(res.data=='下架成功') {
            $("#edi").isDisabl=true
            location.reload()
          }
        })
      },
      addbook(){
          this.booklist=!this.booklist
      },
      addbook2(){
        var data=qs.stringify({"book_type":this.BEvalue2,"book_theme":this.BEvalue3,"book_country":this.BEvalue,"book_summary":this.summary,"book_name":this.bname})
        this.axios.post('/book/insertBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {

          if(res.data=='插入成功') {
            alert("添加成功！")
            this.BEvalue2=''
            this.BEvalue3=''
            this.BEvalue=''
            this.summary=''
            this.bname=''
          }else
            alert("添加失败")
        })
      },
      editbook(id){
        //编辑图书操作，包括修改图书类型属性、名字和简介，还可以自定义上架数量
        var data=qs.stringify({"id":id,"book_type":this.Evalue2,"book_theme":this.Evalue3,"book_country":this.Evalue,"book_status":this.countinput,"book_status":this.countinput})
        this.axios.post('/book/updateBook',data,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
          if(res.data!='') {
            const arr = res.data
            this.allTableData = arr;
            console.log(this.allTableData)
            this.setPaginations()
            this.$notify.success({
              title: '温馨提示',
              message: '已经修改上架了哟~',
              showClose: false
            });
          }
        })
      },
      edit(book_name,book_status){
        if(book_status==-1){
          this.$notify.success({
            title: '温馨提示',
            message: '已经下架了啦~',
            showClose: false
          });
        }else {
          this.ed = !this.ed
          var book_name = book_name
          var data = qs.stringify({"book_name": book_name})
          this.axios.post('/book/findBookByBookName', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            if (res.data != '') {
              const arr = res.data
              this.historyData = arr;
              this.setPaginations()
            } else
              this.historyData = null;

          })
        }
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
    margin: auto;
    margin-top: 20px;
  }
  /*中间操作框*/
  .checkBoard{
    background-color: white;
    /*height: 300px;*/
    width: 950px;
    margin-left: 320px;
    margin-top:20px;
  }
  /*  输入框*/
  .inputword{
    margin: 0;
    margin-left: 320px;
    width: 45%;
    float: left;
  }
  /*搜索按钮*/
  .sbtn{
    margin-right: 280px;
  }
  .page{
    margin-top: 10px;
  }

  .downTab{
    padding: 10px;
  }
  #ed{
    width: 55%;
    margin-top: 20px;
    margin-left: 300px;
  }
  .bookedit{
    margin-top: 20px;
    border: none;
    background-color: white;
    width: 55%;
    height: 200px;
    margin-left: 300px;
  }
  LABEL{
    text-align: center;
    font-size: 20px;
  }
</style>

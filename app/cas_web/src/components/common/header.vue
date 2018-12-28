<template>
<div>
    <el-row class="head">
      <el-col :offset="3" :sm="7">
        <b>今天是：{{todayTime}} {{todayWeek}}</b>
        <b style="margin-left:12px">访问量：{{visited}}</b>
      </el-col>
      <el-col :offset="5" :sm="4" class="search">
          <input placeholder="请输入关键字搜索" class="inputSearch" type="text">
          <div class="border"></div>
          <i style="color:#45b97a;font-size:14px" class="el-icon-search"></i>
      </el-col>
      <el-col :sm="5">
          <ul v-if="username==''">
            <li>
              <a @click="toLogin">登录</a>
              <a @click="toRegister">注册</a>
            </li>
          </ul>
          <el-dropdown v-if="username!=''">
            <span class="el-dropdown-link">
              你好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a @click="userCen">个人中心</a></el-dropdown-item>
              <el-dropdown-item divided><a @click="loginOut">退出登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-col>
  </el-row>
</div>  
</template>

<script>
import $ from "jquery";
import { getCookie,postAjax,delCookie } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      username:"",
      todayTime: "",//今天时间
      todayWeek: "",//今天星期
      visited: "6723",//总访问量
      time: ""
    };
  },
  created() {},
  mounted() {
    this.initData();
    this.dateMsg();
  },
  computed: {
    ...mapState(["permison_url","hostUrl"])
  },
  beforeDestroy() {},
  methods: {
    ...mapActions(["stateChangae"]),//引入vuex中的action方法
    //跳转至用户中心
    userCen:function(){
      this.$router.push({ path: "/userCen/library"});
    },
    //跳转至登录
    toLogin:function(){
      this.$router.push({path:"/login"})
    },
    //跳转至注册
    toRegister:function(){
      this.$router.push({path:"/register"})
    },
    //退出当前登录
    loginOut:function(){
      this.username="";
      delCookie("userid");
      window.location.href=this.hostUrl
    },
    //获取当前时间显示
    dateMsg:function(){
      let myDate = new Date();
      let year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      let month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
      let date=myDate.getDate();        //获取当前日(1-31)
      this.todayWeek = "星期" + "日一二三四五六".charAt(new Date().getDay());
      this.todayTime=year+"年"+month+"月"+date+"日";
    },
    //初始化方法
    initData:function(){
      let userid=getCookie("userid");
      if(userid){
        let param={
            id:userid,
          }
          let data = postAjax(this.permison_url+"/usermanage/select", param);
          //console.info(data);
          this.username=data.userinfo.loginUser.personName;
       }else{
         this.username=""
       }
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  background: #fff;
  min-height: 35px;
  line-height: 35px;
  font-size: 12px;
  border-bottom: 2px solid #ccc;
  b{
    font-weight: normal;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .search {
    position: relative;
    .inputSearch {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 0px 5%;
      line-height: 26px;
      min-height: 26px;
      width: 80%;
      outline: medium;
    }
    .border{
      height: 26px;
      width: 1px;
      top: 5px;
      background: #ccc;
      position: absolute;
      right: 24%;
    }
    .el-icon-search {
      position: absolute;
      top: 12px;
      right: 14%;
      padding-left: 8px;
      cursor: pointer;
      font-size: 14px;
    }
  }
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: auto;
    li {
      float: left;
      a {
        cursor: pointer;
        color: #45b97a;
        margin-left: 10px;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>



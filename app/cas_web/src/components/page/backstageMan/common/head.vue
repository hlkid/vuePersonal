<template>
  <div class="head">
    <el-row class="head">
      <el-col :sm="2"><a class="logo" @click="toHome">返回首页</a></el-col>
      <el-col :sm="9" class="hello"><a>{{hello}}</a></el-col>
      <el-col :push="7" :sm="5" class="oprate">
        <el-dropdown v-if="username!=''">
          <span class="el-dropdown-link">
            你好，{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a @click="loginOut">退出登录</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { getCookie, postAjax, delCookie } from "../../../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      hello: "国家农业标准化信息公共服务与推广平台",
      username: ""
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(["hostUrl", "permison_url"])
  },
  methods: {
    toHome: function() {
      window.location.href = this.hostUrl;
    },
    //退出当前登录
    loginOut:function(){
      this.username="";
      delCookie("userid");
      window.location.href=this.hostUrl
    },
    //初始化方法
    initData: function() {
      let userid = getCookie("userid");
      if (userid) {
        let param = {
          id: userid
        };
        let data = postAjax(this.permison_url + "/usermanage/select", param);
        //console.info(data);
        this.username = data.userinfo.loginUser.personName;
      } else {
        this.username = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  background: #10a6b4;
  min-height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 16px;
  .logo {
    padding-left: 30px;
    cursor: pointer;
    color: #fff !important;
    text-decoration: none;
  }
  .logo:hover {
    text-decoration: underline;
  }
  .hello {
    a {
      padding-left: 20px;
      border-left: 1px solid #18b5c2;
    }
  }
  .oprate {
    text-align: right;
    color: #fff;
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
  }
}
</style>

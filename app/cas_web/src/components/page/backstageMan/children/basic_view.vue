<template>
  <div>
    <el-row>
      <el-col :offset="1" :sm="22" class="view">
        <p class="title"><a @click="back">返回后台管理首页</a>权限管理</p>
        <iframe onload="this.height=document.body.scrollHeight" :src="permison_url"></iframe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState, mapActions } from "vuex";
import {
  getCookie,
  postAjax,
  delCookie,
  userData
} from "../../../../js/common.js"; //引入post交互方法

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["hostUrl", "permison_url"])
  },
  mounted() {
    this.init();
  },
  methods: {
    //返回
    back: function() {
      this.$router.push({
        path: "/backstageMan"
      });
    },
    init: function() {
      let userid = getCookie("userid");
      if (userid && userid != "") {
        //console.info(userData().userinfo.moduleList);
        let moduleList = userData().userinfo.moduleList;
        let power = false;
        for (let i = 0; i < moduleList.length; i++) {
          if (moduleList[i].id == "1_7") {
            power = true;
          }
        }
        if (power == false) {
          this.$message({
            type: "error",
            message: "你没有权限访问,即将跳往首页"
          });
          setTimeout("window.location.href = '" + this.hostUrl + "'", 1000);
        }
      } else {
        this.$message({
          type: "error",
          message: "访问异常,即将跳往首页"
        });
        setTimeout("window.location.href = '" + this.hostUrl + "'", 1000);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.view {
  margin: 15px 2%;
  width: 96%;
  background: #fff;
  .title {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    a {
      float: left;
      cursor: pointer;
    }
    a:hover {
      color: #10a6b4;
    }
  }
  iframe {
    width: 100%;
    height: auto;
    border: none;
    min-height: 600px;
  }
}
</style>


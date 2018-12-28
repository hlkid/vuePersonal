<template>
  <div class="serviceSys">
    <banner v-bind:bannerData="bannerData"></banner>
    <el-row class="page">
      <el-col :offset="3" :sm="18">
        <div class="pageList" :class="{pageActive:item.id==pageActive}" v-for="(item,index) in chidrenPage" :key="index">
          <div @click="pageload(item)">{{item.text}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="3" :sm="18">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import banner from "../common/banner.vue"; //引用底部
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pageActive: "child1",
      bannerData: {
        //banner数据
        background:
          'url("' +
          require("../../assets/banner/serviceSta.png") +
          '") no-repeat center',
        title: "标准服务",
        msg:
          "包括标准制修订、标准查新、标准托管、标准评估、标准比对服务。"
      },
      chidrenPage: [
        { id: "child1", path: "/serviceSta/rev", text: "标准制修订" },
        { id: "child2", path: "/serviceSta/new", text: "标准查新" },
        { id: "child3", path: "/serviceSta/support", text: "标准托管" },
        { id: "child4", path: "/serviceSta/ass", text: "标准评估" },
        { id: "child5", path: "/serviceSta/vs", text: "标准比对" }
      ]
    };
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  components: { banner },
  mounted() {
    this.pageInit();
  },
  methods: {
    //页面初始化事件
    pageInit: function() {
      //切换背景
      this.bannerData.background='url("' +
          this.hostUrl+"/assets/banner/serviceSta.png" +
          '") no-repeat center';

      let routeNow = this.$route.path;
      if (routeNow == "/") {
        this.pageActive = "child1";
      } else {
        for (let i = 0; i < this.chidrenPage.length; i++) {
          if (
            this.chidrenPage[i].path != "" &&
            this.chidrenPage[i].path != "/"
          ) {
            if (routeNow.indexOf(this.chidrenPage[i].path) != -1) {
              this.pageActive = this.chidrenPage[i].id;
            }
          }
        }
      }
      $(".pageList").css({
        width:
          $(".pageList")
            .parent()
            .width() /
            this.chidrenPage.length +
          "px"
      });
    },
    //点击事件
    pageload: function(item) {
      this.pageActive = item.id; //改变导航栏样式颜色
      this.$router.push({ path: item.path });
    }
  }
};
</script>

<style lang="less" scoped>
.serviceSys {
  background: #fff;
  .page {
    margin-top: 25px;
  }
  .pageList {
    cursor: pointer;
    background: #fafafa;
    line-height: 40px;
    text-align: center;
    float: left;
    text-align: center;
  }
  .pageList:hover {
    background: #45b97a;
    color: #fff;
  }
  .pageListActive {
    background: #45b97a;
    color: #fff;
  }
  .pageActive {
    background: #45b97a;
    color: #fff;
  }
  .el-col-sm-4 {
    width: 14.28%;
  }
}
</style>


<template>
  <div class="help">
    <banner v-bind:bannerData="bannerData"></banner>
    <el-row class="mainRow">
      <el-col :offset="3" :sm="4">
        <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
      </el-col>
      <el-col :sm="14">
        <tags :tagsData="tagsData"></tags>
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import banner from "../common/banner.vue"; //引用底部
import slidebar from "../common/slidebar.vue"; //引用侧边栏
import tags from "../common/tags.vue"; //引用位置标签
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      bannerData: {
        //banner数据
        background:
          'url("' +
          require("../../assets/banner/help.png") +
          '") no-repeat center',
        title: "帮助中心",
        msg: "提供平台使用手册和常见问题服务。"
      },
      slideBarData: {
        //侧边栏数据
        title: { text: "推广服务" },
        listData: [
          { id: "list1", text: "平台使用手册", pagePath: "/help/usebook" },
          { id: "list2", text: "常见问题", pagePath: "/help/question" }
        ]
      },
      tagsData: {
        //tags位置标签
        title: "帮助中心",
        seat: {
          path: "",
          text: "平台使用手册",
          child: {
            path: "",
            text: "帮助中心",
            child: {
              path: "",
              text: "服务价格"
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.init();
  },
  components: { banner, slidebar, tags },
  methods: {
    //初始化信息
    init: function() {
      //切换背景
      this.bannerData.background =
        'url("' +
        this.hostUrl +
        "/assets/banner/help.png" +
        '") no-repeat center';
    },
    //接收sliderBar组件点击事件
    seatChange: function(data) {
      this.tagsData.seat.child.text = data.text;
    }
  }
};
</script>

<style lang="less" scoped>
.help {
  .mainRow {
    padding: 30px 0px;
    background: #fff;
  }
}
</style>


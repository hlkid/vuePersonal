<template>
  <div>
    <el-row>
      <el-col class="librarySummary" :offset="3" :sm="18">
        <el-col class="main" :sm="18">
          <div class="head">
            <div class="title"><i onclick="window.history.go(-1)" class="el-icon-back"></i>{{summaryData.name}}<b>({{summaryData.type}})</b>
              <span style="margin-left: 12px;" :class="statusClass(summaryData.status)" class="btn">{{summaryData.status|status}}</span>
              <span :class="buyStatusClass(summaryData.buyStatus)" class="buyStatusBtn1 btn">{{summaryData.buyStatus|buyStatus}}</span>
            </div>
            <div class="oprate">
              <el-button class="btn1" icon="el-icon-star-on">收藏</el-button>
            </div>
          </div>
          <div class="mainContent">
            <div class="mainBox" id="summary">
              <summaryTitle :summaryTitle="'简介'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_summary.content"></div>
            </div>
            <div class="mainBox" id="basicmsg">
              <summaryTitle :summaryTitle="'基础信息'"></summaryTitle>
              <div class="content">
                <summaryBasic :summaryBasicData="summaryBasicData"></summaryBasic>
              </div>
            </div>
            <div v-if="!isPreview" class="mainBox" id="course">
              <summaryTitle :summaryTitle="'课程播放'"></summaryTitle>
              <div>
                <div class="nav">
                  <div v-if="courseList.length==0">暂无课程</div>
                  <div :class="hostUrl+'/'+item.path==videoSrc?'videoActive':''" :title="item.realnmae" class="list" v-for="(item,index) in courseList" :key="index" @click="videoPlay(item)">
                    {{item.realnmae | videoname}}
                  </div>
                  <div v-if="courseList.length!=0"></div>
                  <video v-if="courseList.length>0" :src="videoSrc" width="60%" controls></video>
                  <div class="summary">{{videoSummary}}</div>
                </div>
              </div>
            </div>
            <div v-if="!isPreview" class="mainBox" id="relevant">
              <summaryTitle :summaryTitle="'相关资料'"></summaryTitle>
              <div class="attsList" v-for="(item,index) in atts" :key="index">
                {{item.realnmae}}<a @click="down(item)">下载</a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="slide" :sm="6">
          <summarySilde :slideData="slideData"></summarySilde>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js";
import { mapState, mapActions } from "vuex";
import summarySilde from "../common/summarySlide.vue"; //右侧侧边栏信息
import summaryTitle from "../common/summaryTitle.vue"; //左侧显示组件——标题显示
import summaryBasic from "../common/summaryBasic.vue"; //左侧显示组件——基础信息显示

export default {
  data() {
    return {
      //是否是预览页面
      isPreview: this.$route.query.type == "preview" ? true : false,
      //侧边栏
      slideData: {},
      //简介
      summaryNormalData_summary: { content: "" },
      //基础信息
      summaryBasicData: {},
      //总信息
      summaryData: {},
      //课程视频
      courseList: [],
      //当前播放的视屏路径
      videoSrc: "",
      //当前播放的视屏名称
      videoName: "",
      //当前播放的视屏描述
      videoSummary: "",
      //相关附件
      atts: []
    };
  },
  components: { summarySilde, summaryBasic, summaryTitle },
  mounted() {
    this.detailData();
    console.info(this.$route.query.type);
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  methods: {
    //查询详情
    detailData: function() {
      let param = {
        id: this.$route.query.id
      };
      console.info(param);
      let data = postAjax(this.hostUrl + "/train/select", param).backValue;
      console.info(data);
      //基础信息
      this.summaryData = {
        id: data.id,
        name: data.title,
        type: data.type,
        buyStatus: "2"
      };
      //简介
      this.summaryNormalData_summary.content = data.summary;

      //基础信息
      this.summaryBasicData = {
        list: [
          { label: "课程名称", text: data.title },
          { label: "授课老师", text: data.lecturer },
          { label: "开课时间", text: data.trainTime },
          { label: "类别", text: data.type },
          { label: "是否免费", text: data.feeScale == "true" ? "是" : "否" },
          { label: "价格", text: data.price }
        ]
      };
      console.info(this.hostUrl + "/" + data.trainPath);
      //改变侧边栏信息
      this.slideData = {
        imgsrc:
          data.trainPath == "0"
            ? require("../../assets/librarySummary/book.png")
            : this.hostUrl + "/" + data.trainPath,
        name: data.title,
        slideNav: [
          {
            id: "list1",
            name: "简介",
            icon: "summary_summary",
            href: "summary"
          },
          {
            id: "list2",
            name: "基础信息",
            icon: "summary_basicmsg",
            href: "basicmsg"
          },
          {
            id: "list3",
            name: "课程播放",
            icon: "summary_preview",
            href: this.isPreview == false ? "course" : ""
          },
          {
            id: "list4",
            name: "相关资料",
            icon: "summary_relevant",
            href: this.isPreview == false ? "relevant" : ""
          }
        ]
      };
      //附件列表
      for (let i = 0; i < data.attList.length; i++) {
        if (data.attList[i].type != "2") {
          //视屏列表
          this.courseList.push(data.attList[i]);
          //console.info(data.attList[i].path);
          this.videoSrc = this.hostUrl + "/" + escape(data.attList[i].path);
          this.videoName = data.attList[i].realnmae;
          this.videoSummary = data.attList[i].summary;
          //console.info(this.videoSrc)
        } else if (data.attList[i].type == "2") {
          //附件列表
          this.atts.push(data.attList[i]);
        }
      }
      //console.info(this.courseList);
      //console.info(this.atts);
    },
    //点击视频进行播放
    videoPlay: function(item) {
      this.videoSrc = this.hostUrl + "/" + item.path;
      this.videoName = item.realnmae;
      this.videoSummary = item.summary;
    },
    //点击下载附件
    down: function(item) {
      let link = document.createElement("a");
      link.setAttribute("download", item.realnmae);
      link.href = this.hostUrl + "/" + item.path;
      link.target = "blank";
      document.body.appendChild(link); //添加到页面中，为兼容Firefox浏览器
      link.click();
      document.body.removeChild(link); //从页面移除
    },
    //改变发行状态颜色类型
    statusClass: function(item) {
      switch (item) {
        case "1":
          return "statusBtn1";
          break;
        case "2":
          return "statusBtn2";
          break;
      }
    },
    //改变购买状态颜色类型
    buyStatusClass: function(item) {
      switch (item) {
        case "1":
          return "buyStatusBtn1";
          break;
        case "2":
          return "buyStatusBtn2";
          break;
        case "3":
          return "buyStatusBtn3";
          break;
      }
    },
    //跳转锚点对应位置
    goId: function(item) {
      console.info($("#" + item.href).offset().top);
      $("html, body").animate(
        {
          scrollTop: $("#" + item.href).offset().top
        },
        { duration: 1000, easing: "swing" }
      );
    }
  },
  filters: {
    //过滤标准内容
    content: function(val) {
      return val.slice(0, 820) + "......";
    },
    //过滤发行购买状态
    status: function(val) {
      switch (val) {
        case "1":
          return "已发行";
        case "2":
          return "未发行";
      }
    },
    //过滤标准购买状态
    buyStatus: function(val) {
      switch (val) {
        case "1":
          return "免费";
        case "2":
          return "未购买";
        case "3":
          return "已购买";
      }
    },
    //截取过长字符
    longName: function(val) {
      if (val.length > 10) {
        return val.slice(0, 10) + "...";
      }
    },
    //过滤视屏名称
    videoname: function(val) {
      let name = val.split(".mp4")[0];
      if (name.length > 10) {
        return name.slice(0, 10) + "...";
      } else {
        return name;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.librarySummary {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  padding-bottom: 40px;
  .main {
    .head {
      .el-button {
        padding: 8px 16px;
        border-radius: 0px;
        border: 1px solid #45b97a;
        color: #45b97a;
      }
      .btn2 {
        background: #45b97a;
        color: #fff;
      }
      padding: 0px 5%;
      .title {
        font-size: 18px;
        line-height: 55px;
        .el-icon-back {
          cursor: pointer;
          margin-right: 10px;
        }
        .el-icon-back:hover {
          color: #45b779;
        }
        b {
          font-size: 15px;
          font-weight: normal;
        }
        .btn {
          padding: 0px 6px;
          color: #fff;
          font-size: 13px;
        }
        .statusBtn1 {
          background: #45ba7a;
        }
        .statusBtn2 {
          background: #ed4042;
        }
        .buyStatusBtn1 {
          background: #66cf4f;
        }
        .buyStatusBtn2 {
          background: #709eec;
        }
        .buyStatusBtn3 {
          background: #28c9a0;
        }
      }
    }
    .mainContent {
      float: left;
      .mainBox {
        float: left;
        width: 100%;
        video {
          margin-top: 30px;
          margin-left: 20%;
        }
        .summary {
          width: 60%;
          margin-left: 20%;
          text-align: center;
        }
        .content {
          width: 90%;
          padding: 0px 5%;
          float: left;
          font-size: 14px;
          .list {
            line-height: 25px;
            a {
              text-decoration: none;
              color: #000;
            }
            a:hover {
              color: #45b97a;
              text-decoration: underline;
            }
          }
        }
        .attsList {
          width: 85%;
          float: left;
          padding: 5px 5%;
          a {
            margin-left: 15px;
            cursor: pointer;
          }
          a:hover {
            color: #45b779;
          }
        }
        .nav {
          width: 85%;
          padding: 0px 5%;
          .list {
            background: #fff;
            border: 1px solid #ccc;
            float: left;
            cursor: pointer;
            padding: 3px 5px;
            margin-right: 15px;
          }
          .videoActive {
            background: #45b779;
            color: #fff;
          }
          .list:hover {
            color: #45b779;
            border: 1px solid #45b779;
          }
          .videoActive:hover {
            color: #fff;
          }
          .listClick {
            background: #45b779;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>


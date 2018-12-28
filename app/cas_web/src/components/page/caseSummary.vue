<template>
  <div>
    <el-row>
      <el-col class="librarySummary" :offset="3" :sm="18">
        <el-col class="main" :sm="18">
          <div class="head">
            <i onclick="window.history.go(-1)" class="el-icon-back"></i>
            <div class="title">{{name}}
            </div>
          </div>
          <div class="mainContent">
            <div class="mainBox" id="reserved1">
              <summaryTitle :summaryTitle="'概况'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_reserved1.content"></div>
            </div>
            <div class="mainBox" id="standardList">
              <summaryTitle :summaryTitle="'重要标准目录'"></summaryTitle>
              <div style="margin-left:5%;width:90%">
                <el-table :data="standardList" style="width: 100%">
                  <el-table-column prop="number" label="编号">
                  </el-table-column>
                  <el-table-column prop="name" label="名称">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="attPre(standardList[scope.$index])" type="text" size="small">
                        查看
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="mainBox" id="frame">
              <summaryTitle :summaryTitle="'标准体系框架'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_frame.content"></div>
            </div>
            <div class="mainBox" id="buildExperience">
              <summaryTitle :summaryTitle="'建设经验'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_buildExperience.content"></div>
            </div>
            <div class="mainBox" id="spreadExperience">
              <summaryTitle :summaryTitle="'推广经验'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_spreadExperience.content"></div>
            </div>
            <div class="mainBox" id="buildResult">
              <summaryTitle :summaryTitle="'建设结果'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_buildResult.content"></div>
              <div class="videoBox">
                案例视屏：
                <div class="nav">
                  <div v-if="videoList.length==0">暂无视屏</div>
                  <div :class="hostUrl+'/'+item.path==videoSrc?'videoActive':''" :title="item.realnmae" class="list" v-for="(item,index) in videoList" :key="index" @click="videoPlay(item)">
                    {{item.realnmae | videoname}}
                  </div>
                  <div v-if="videoList.length!=0"></div>
                  <video v-if="videoList.length>0" :src="videoSrc" width="60%" controls></video>
                  <div class="summary">{{videoSummary}}</div>
                </div>
              </div>
              <div class="photoBox">
                案例图册：
                <div v-if="videoList.length==0">暂无图册</div>
                <el-carousel :interval="4000" type="card" height="260px">
                  <el-carousel-item v-for="(item,index) in photoList" :key="index">
                    <img style="width:100%;height:260px" @dblclick="attPre(item)" :src="item.imgSrc" title="双击可全屏查看此图">
                  </el-carousel-item>
                </el-carousel>
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

export default {
  data() {
    return {
      name: "", //案例名称
      slideData: {}, //侧边栏
      summaryNormalData_reserved1: { content: "" }, //概况
      summaryNormalData_frame: { content: "" }, //标准体系框架
      summaryNormalData_buildExperience: { content: "" }, //建设经验
      summaryNormalData_spreadExperience: { content: "" }, //推广经验
      summaryNormalData_buildResult: { content: "" }, //建设成果

      videoList: [], //视频
      photoList: [], //图片
      standardList: [], //标准列表
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
  components: { summarySilde, summaryTitle },
  mounted() {
    this.detailData();
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
      let data = postAjax(this.hostUrl + "/classicCase/select", param)
        .backValue;
      console.info(data);
      this.name = data.classicCase.survey; //案例名称
      this.summaryNormalData_reserved1.content = data.classicCase.reserved1; //概况
      this.summaryNormalData_frame.content = data.classicCase.frame; //标准体系框架
      this.summaryNormalData_buildExperience.content =
        data.classicCase.buildExperience; //建设经验
      this.summaryNormalData_spreadExperience.content =
        data.classicCase.spreadExperience; //推广经验
      this.summaryNormalData_buildResult.content = data.classicCase.buildResult; //建设成果

      this.standardList = data.standardList;
      console.info(this.standardList);
      //遍历接收的附件信息
      for (let i = 0; i < data.attList.length; i++) {
        if (data.attList[i].type == "1") {
          //视屏
          this.videoList.push(data.attList[i]);
          this.videoSrc = this.hostUrl + "/" + escape(data.attList[i].path);
          this.videoName = data.attList[i].realnmae;
          this.videoSummary = data.attList[i].summary;
          //console.info(this.videoSrc)
        } else if (data.attList[i].type == "2") {
          //图册
          data.attList[i].imgSrc = this.hostUrl + "/" + data.attList[i].path;
          this.photoList.push(data.attList[i]);
        }
      }

      //改变侧边栏信息
      this.slideData = {
        slideNav: [
          {
            id: "list1",
            name: "概况",
            icon: "summary_basicmsg",
            href: "reserved1"
          },
          {
            id: "list2",
            name: "标准体系框架",
            icon: "summary_basicmsg",
            href: "frame"
          },
          {
            id: "list3",
            name: "重要标准目录",
            icon: "summary_basicmsg",
            href: "standardList"
          },
          {
            id: "list4",
            name: "建设经验",
            icon: "summary_basicmsg",
            href: "buildExperience"
          },
          {
            id: "list5",
            name: "推广经验",
            icon: "summary_basicmsg",
            href: "spreadExperience"
          },
          {
            id: "list6",
            name: "建设成效",
            icon: "summary_basicmsg",
            href: "buildResult"
          }
        ]
      };
    },
    //点击视频进行播放
    videoPlay: function(item) {
      this.videoSrc = this.hostUrl + "/" + item.path;
      this.videoName = item.realnmae;
      this.videoSummary = item.summary;
    },
    //附件预览
    attPre: function(item) {
      let url = this.hostUrl + "/" + item.path;
      window.open(url);
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
      padding-left: 3%;
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
      .title {
        text-align: center;
        font-size: 18px;
        line-height: 55px;
      }
      .el-icon-back {
        cursor: pointer;
        margin-right: 10px;
        position: absolute;
        top: 35px;
        font-size: 25px;
      }
      .el-icon-back:hover {
        color: #45b97a;
      }
    }
    .mainContent {
      float: left;
      .mainBox {
        float: left;
        width: 100%;
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
        .videoBox {
          margin-top: 20px;
          width: 100%;
          float: left;
          margin-left: 5%;
          video {
            margin-top: 20px;
            margin-left: 20%;
          }
          .nav {
            width: 95%;
            padding: 0px;
            margin-top: 10px;
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
        .photoBox {
          margin-top: 20px;
          width: 100%;
          float: left;
          margin-left: 5%;
          .img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


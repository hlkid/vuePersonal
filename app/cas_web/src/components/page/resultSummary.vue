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
            <div class="mainBox" id="result">
              <summaryTitle :summaryTitle="'成果介绍'"></summaryTitle>
              <div class="resultList">
                  <div v-if="resultList.length==0">暂无介绍</div>
                  <img title="双击可全屏查看此图" @dblclick="attPre(item)" v-for="(item,index) in resultList" :key="index" :src="item.imgSrc" alt="">
              </div>
            </div>
            <div class="mainBox" id="video">
              <summaryTitle :summaryTitle="'成果视屏'"></summaryTitle>
              <div class="videoBox">
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
            </div>
            <div class="mainBox" id="photo">
              <summaryTitle :summaryTitle="'成果画册'"></summaryTitle>
              <div class="photoBox">
                <div v-if="videoList.length==0">暂无画册</div>
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
      
      videoList: [], //视频
      photoList: [], //图片
      resultList: [], //结果介绍
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
      let data = postAjax(this.hostUrl + "/resultsShow/select", param)
        .backValue;
      console.info(data);
      this.name = data.resultsShow.name; //成果名称
      
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
        } else if (data.attList[i].type == "3") {
          //结果介绍
          data.attList[i].imgSrc = this.hostUrl + "/" + data.attList[i].path;
          this.resultList.push(data.attList[i]);
        }
      }

      //改变侧边栏信息
      this.slideData = {
        slideNav: [
          {
            id: "list1",
            name: "成果介绍",
            icon: "summary_basicmsg",
            href: "result"
          },
          {
            id: "list2",
            name: "成果视屏",
            icon: "summary_basicmsg",
            href: "video"
          },
          {
            id: "list3",
            name: "成果画册",
            icon: "summary_basicmsg",
            href: "photo"
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
        .resultList{
            width: 80%;
            margin-left: 5%;
            img{
                width: 100%;
            }
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
        .videoBox {
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


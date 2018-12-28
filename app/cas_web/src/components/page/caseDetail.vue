<template>
    <div>
        <el-row>
            <el-col class="caseDetail" :offset="3" :sm="18">
                <el-col class="main" :sm="18">
                    <div class="head">
                        <div class="title">{{caseData.name}}
                            <span class="btn">{{isViewFilter(caseData.isView)}}</span>
                        </div>
                    </div>
                    <div class="mainContent">
                        <div style="margin-top: -35px;" class="mainBox" id="summary">
                            <summaryTitle :summaryTitle="'简介'"></summaryTitle>
                            <div class="content" v-html="caseData_summary.content"></div>
                        </div>
                        <div class="mainBox" id="viewstatus">
                            <summaryTitle :summaryTitle="'观摩情况'"></summaryTitle>
                            <div class="content">
                                <div>能否实地观摩：{{isViewFilter(caseData.isView)}}</div>
                                <div style="margin-top:18px;" v-show="caseData.isView=='1'">观摩时间：{{caseData.viewTime}}</div>
                            </div>
                        </div>
                        <div class="mainBox" id="basicmsg">
                            <summaryTitle :summaryTitle="'基本情况'"></summaryTitle>
                            <div class="content">
                                <div class="titleLv2">示范区情况</div>
                                <summaryBasic :summaryBasicData="caseData_basicmsg"></summaryBasic>
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
import summarySilde from "../common/summarySlide.vue"; //右侧侧边栏信息
import summaryTitle from "../common/summaryTitle.vue"; //左侧显示组件——标题显示
import summaryBasic from "../common/summaryBasic.vue"; //左侧显示组件——基础信息显示

export default {
  data() {
    return {
        //基本信息
        caseData: {
            id: "list1",
            name: "合肥市蜀山区长江西路123号推广示范区",
            isView:"1",
            viewTime:"2018-10-01 至 2018-10-07"
        },
      //侧边栏
      slideData: {
        imgsrc: require("../../assets/librarySummary/book.png"),
        name: "合肥市蜀山区长江西路123号推广示范区",
        slideNav: [
          {
            id: "list1",
            name: "简介",
            icon: "summary_summary",
            href: "summary"
          },
          {
            id: "list2",
            name: "观摩情况",
            icon: "summary_basicmsg",
            href: "viewstatus"
          },
          {
            id: "list3",
            name: "基本情况",
            icon: "summary_preview",
            href: "basicmsg"
          },
          {
            id: "list4",
            name: "示范区标准化情况",
            icon: "summary_relevant",
            href: "relevant"
          },
          {
            id: "list5",
            name: "取得成果及效益情况",
            icon: "summary_relevant",
            href: "relevant"
          },
          {
            id: "list6",
            name: "优秀经验做法",
            icon: "summary_relevant",
            href: "relevant"
          },
          {
            id: "list7",
            name: "建设分析报告",
            icon: "summary_relevant",
            href: "relevant"
          },
          {
            id: "list8",
            name: "示范区图册",
            icon: "summary_relevant",
            href: "relevant"
          }
        ]
      },
      //简介
      caseData_summary: {
        id: "summary",
        name: "简介",
        content:
          "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地"
      },
      //基础信息
      caseData_basicmsg: {
        list: [
          { label: "中文名称", text: "合肥市蜀山区长江西路123号推广示范区" },
          { label: "英文名称", text: "NO.123 tui guang shi fan qu" },
          { label: "行政区类别", text: "市辖区" },
          { label: "所属地区", text: "中国安徽合肥" },
          { label: "电话区号", text: "0551" },
          { label: "邮政编码", text: "230011" },
          { label: "面积", text: "189平方千米" },
          { label: "人口", text: "97.9万(2017年常住人口)" },
          { label: "设立时间", text: "2018-10-19" },
          { label: "气候条件", text: "亚热带湿润季风气候" },
          { label: "地理位置", text: "东经117、北纬31" }
         ]
      },
      //目录
      summaryNormalData_column: {
        id: "column",
        name: "目录",
        content:
          "<p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p>"
      },
      //预览
      summaryNormalData_preview: {
        id: "preview",
        name: "预览",
        content:
          "<h3 style='text-align:center'>中华人名共和国农业标准化第123号</h3><h3 style='text-align:center'>第一章 国家标准</h3>是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象</br>的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于 第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利</br>用草地地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地"
      },
      //相关标准
      summaryListData_relevant: {
        id: "relevant",
        name: "相关标准",
        list: [
          { id: "list1", name: "中华人名共和国相关标准112", href: "" },
          { id: "list2", name: "中华人名共和国相关标准112", href: "" },
          { id: "list3", name: "中华人名共和国相关标准112", href: "" },
          { id: "list4", name: "中华人名共和国相关标准112", href: "" },
          { id: "list5", name: "中华人名共和国相关标准112", href: "" }
        ]
      }
    };
  },
  components: { summarySilde, summaryBasic, summaryTitle },
  
  methods: {
    isViewFilter: function(item) {
      switch (item) {
        case "1":
          return "可实地观摩";
          break;
        case "0":
          return "不可实地观摩";
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
    }
  }
};
</script>

<style lang="less" scoped>
.caseDetail {
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
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
        font-size: 20px;
        line-height: 55px;
        b {
          font-size: 15px;
          font-weight: normal;
        }
        .btn {
          padding: 0px 6px;
          background: #45b97a;
          margin-left: 8px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .mainContent {
      float: left;
      .mainBox {
        float: left;
        width: 100%;
        .content {
          width: 90%;
          padding: 0px 5%;
          float: left;
          font-size: 14px;
            .titleLv2{
                width: 100%;
                font-size: 16px;
                margin: 12px 0px;
            }
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
      }
    }
  }
}
</style>


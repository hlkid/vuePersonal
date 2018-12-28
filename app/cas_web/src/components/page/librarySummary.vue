<template>
  <div>
    <el-row>
      <el-col class="librarySummary" :offset="3" :sm="18">
        <el-col class="main" :sm="18">
          <div class="head">
            <div class="title">{{summaryData.name}}<b>({{summaryData.type}})</b>
              <span style="margin-left: 12px;" :class="statusClass(summaryData.status)" class="btn">{{summaryData.status|status}}</span>
              <span :class="buyStatusClass(summaryData.buyStatus)" class="buyStatusBtn1 btn">{{summaryData.buyStatus|buyStatus}}</span>
            </div>
            <div class="oprate">
              <el-button class="btn1" icon="el-icon-star-on">收藏</el-button>
              <el-button class="btn1" icon="el-icon-download">下载</el-button>
              <el-button class="btn2" icon="el-icon-view">阅读</el-button>
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
            <div class="mainBox" id="column">
              <summaryTitle :summaryTitle="'目录'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_column.content"></div>
            </div>
            <div class="mainBox" id="preview">
              <summaryTitle :summaryTitle="'预览'"></summaryTitle>
              <div class="content" v-html="summaryNormalData_preview.content"></div>
              <button class="readAll">
                <icon class="icon" scale="2" name="summary_bookview"></icon>阅读全部
              </button>
            </div>

            <div class="mainBox" id="relevant">
              <summaryTitle :summaryTitle="'相关标准'"></summaryTitle>
              <div class="content">
                <div class="list" v-for="(item,index) in summaryListData_relevant.list" :key="item.id"><a href="">{{index+1}}、{{item.name}}</a></div>
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
      //侧边栏
      slideData: {
        imgsrc: require("../../assets/librarySummary/book.png"),
        name: "中华人民共和国农业标准化",
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
          { id: "list3", name: "目录", icon: "summary_column", href: "column" },
          {
            id: "list4",
            name: "预览",
            icon: "summary_preview",
            href: "preview"
          },
          {
            id: "list5",
            name: "相关标准",
            icon: "summary_relevant",
            href: "relevant"
          }
        ]
      },
      //简介
      summaryNormalData_summary: {
        content:
          "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地"
      },
      //基础信息
      summaryBasicData: {
        list: [
          { label: "中文名称", text: "中华人民共和国农业标准化" },
          { label: "英文名称", text: "zhong hua ren min" },
          { label: "发布组织", text: "中华人名共和国农业部" },
          { label: "国家", text: "中国" },
          { label: "中国标准分类号", text: "xxx" },
          { label: "国际标准分类号", text: "xxx" },
          { label: "实施日期", text: "2018-06-21" },
          { label: "发布日期", text: "2018-10-19" },
          { label: "发布号", text: "2378917347214" },
          { label: "官方来源", text: "1321" },
          { label: "类别", text: "国家标准" },
          { label: "价格", text: "200元" }
        ]
      },
      //目录
      summaryNormalData_column: {
        content:
          "<p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p><p>第一章：国家标准</p><p>1.1标准说明</p>"
      },
      //预览
      summaryNormalData_preview: {
        content:
          "<h3 style='text-align:center'>中华人名共和国农业标准化第123号</h3><h3 style='text-align:center'>第一章 国家标准</h3>是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象</br>的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于 第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利</br>用草地地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地"
      },
      //相关标准
      summaryListData_relevant: {
        list: [
          { id: "list1", name: "中华人名共和国相关标准112", href: "" },
          { id: "list2", name: "中华人名共和国相关标准112", href: "" },
          { id: "list3", name: "中华人名共和国相关标准112", href: "" },
          { id: "list4", name: "中华人名共和国相关标准112", href: "" },
          { id: "list5", name: "中华人名共和国相关标准112", href: "" }
        ]
      },
      summaryData: {
        id: "list1",
        name: "中华人民共和国农业标准化",
        country: "中国",
        type: "国家标准",
        status: "1",
        buyStatus: "2"
      }
    };
  },
  components: { summarySilde, summaryBasic, summaryTitle },
  methods: {
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
    }
  }
};
</script>

<style lang="less" scoped>
.librarySummary {
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
        font-size: 18px;
        line-height: 55px;
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
      }

      .readAll {
        padding: 10px 15px 10px 35px;
        background: #45b97a;
        border: none;
        color: #fff;
        position: relative;
        margin-top: 20px;
        margin-left: 5%;
        cursor: pointer;
        .icon {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 20px;
        }
      }
    }
  }
}
</style>


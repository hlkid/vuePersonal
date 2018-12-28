<!-- 简介详情侧边栏 -->
<template>
    <div class="slide">
        <div v-if="slideData.imgsrc" class="book">
            <img :src="slideData.imgsrc">
            <div class="name">{{slideData.name}}</div>
        </div>
        <div class="slideNav">
            <div v-if="item.href!=''" @click="goId(item)" class="list" v-for="item in slideData.slideNav" :key="item.id">
                <icon class="cardIcon" scale="1" :name="item.icon"></icon><a>{{item.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  props: ["slideData"],
  data() {
    return {};
  },
  methods: {
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
  }
};
</script>

<style lang="less" scoped>
.slide {
  .book {
    width: 80%;
    border: 1px solid #ccc;
    margin-top: 20px;
    box-shadow: 0px 0px 8px #ccc;
    img {
      width: 100%;
      padding-bottom: 20px;
    }
    .name {
      width: 90%;
      padding: 10px 5%;
      line-height: 22px;
      font-size: 14px;
      border-top: 1px solid #ccc;
    }
  }
  .slideNav {
    margin-top: 40px;
    width: 80%;
    border-left: 2px solid #ccc;
    .list {
      padding-left: 10%;
      font-size: 14px;
      line-height: 45px;
      position: relative;
      cursor: pointer;
      a {
        text-decoration: none;
        color: #000;
        margin-left: 30px;
      }
      .cardIcon {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 14px;
      }
    }
    .list:hover {
      background: #f4f9ff;
    }
  }
}
</style>


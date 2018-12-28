<!-- 简介信息正常显示只显示标题）-->
<template>
  <div class="title">
      <span class="leftSpan"></span>
      <span class="name">{{summaryTitle}}</span>
      <span class="rightLine"></span>
    </div>
</template>

<script>
export default {
  props: ["summaryTitle"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.title {
    margin-top: 30px;
    position: relative;
    line-height: 40px;
    padding: 0px 5%;
    font-size: 18px;
    width: 85%;
    float: left;
    overflow: hidden;
    span {
      float: left;
    }
    .leftSpan {
      position: absolute;
      left: 0;
      top: 10px;
      width: 9px;
      height: 18px;
      background: #45b97a;
    }
    .name {
      padding: 0px 20px 0px 0px;
      z-index: 9;
      font-weight: bold;
    }
    .rightLine {
      width: 100%;
      position: absolute;
      height: 1px;
      background: #ccc;
      top: 20px;
    }
  }
</style>


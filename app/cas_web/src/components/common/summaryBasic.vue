<!--基础信息显示-->
<template>
  <div class="summaryBasic">
    <div v-for="(item,index) in summaryBasicData.list" :key="index" class="dataItem">
      <div class="label span">{{item.label}}：</div>
      <div :title="item.text" class="text span">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["summaryBasicData"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.summaryBasic {
  .dataItem {
    border-bottom: 1px dashed #ccc;
    line-height: 35px;
    float: left;
    width: 50%;
    font-size: 14px;
    .span {
      float: left;
    }
    .label {
      width: 40%;
    }
    .text {
      width: 55%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>


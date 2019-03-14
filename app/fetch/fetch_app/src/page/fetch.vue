<template>
<!-- 测试fetch -->
  <div>
    测试页面
    <a @click="click">点击测试</a>
    <div>{{foods}}</div>
  </div>
</template>

<script>
import { getFoods } from "../api/getData";

export default {
  data() {
    return {
      foods:""
    };
  },
  methods: {
    click: function() {
      this.getFoods();
      console.info("结束")
    },
    async getFoods() {
      let param = {
        userid: "",
        pageCur: 1,
        pageNum: 20,
        csname: "" //中文标准名
      };
      const Foods = await getFoods(param);
      this.foods=JSON.stringify(Foods);
      console.info(Foods);
    }
  }
};
</script>

<style>
</style>

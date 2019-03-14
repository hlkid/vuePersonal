<template>
  <div id="app">
    <headnav></headnav>
    <el-col :md="{span:20,offset:2}" class="main">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
import headnav from "./components/common/header.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    headnav
  }
};
</script>

<style lang="less" scoped>
#app {
  padding: 0px;
  margin: 0px;
  .main {
    padding: 10px 0px;
  }
}
</style>


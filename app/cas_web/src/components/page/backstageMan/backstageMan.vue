<template>
  <div class="backstageMan">
    <headers></headers>
    <el-row v-if="slideFlag">
      <el-col
        v-if="slideShow"
        :sm="5"
        class="catalog"
      >
        <catalog
          :slideToogle="slideShow"
          v-on:headChange="headChange"
          v-on:slideToogle="slideToogle"
        ></catalog>
      </el-col>
      <el-col
        v-if="!slideShow"
        :sm="2"
        class="catalog"
      >
        <catalog
          :slideToogle="slideShow"
          v-on:headChange="headChange"
          v-on:slideToogle="slideToogle"
        ></catalog>
      </el-col>
      <el-col
        v-if="slideShow"
        :sm="18"
        class="main"
      >
        <div class="head">{{head}}</div>
        <router-view></router-view>
      </el-col>
      <el-col
        v-if="!slideShow"
        :sm="21"
        class="main"
      >
        <div class="head">{{head}}</div>
        <router-view></router-view>
      </el-col>
    </el-row>
    <el-row v-if="!slideFlag">
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
import headers from "./common/head.vue"; //引用头部
import catalog from "./common/catalog.vue"; //引用目录栏

export default {
  data() {
    return {
      slideFlag: true,
      slideShow: true,
      head: "标准管理"
    };
  },
  components: { headers, catalog },
  mounted() {
    if (this.$route.path.indexOf("_") != -1) {
      this.slideFlag = false;
    } else {
      this.slideFlag = true;
    }
  },
  watch: {
    //监听路由
    $route(to, from) {
      //若为新增修改页面不显示侧边栏
      if (to.path.indexOf("_") != -1) {
        this.slideFlag = false;
      } else {
        this.slideFlag = true;
      }
    }
  },
  methods: {
    //子组件传递改变标题名称
    headChange: function(data) {
      this.head = data;
    },
    //子组件传递改变slide是否显示
    slideToogle: function(data) {
      this.slideShow = data;
    }
  }
};
</script>

<style lang="less">
.backstageMan {
  background: #e2e2e2;
  .main {
    margin-top: 20px;
    background: #fff;
    .head {
      line-height: 35px;
      height: 35px;
      margin: 0px 10px;
      padding-left: 10px;
      font-weight: bold;
      font-size: 16px;
      border-bottom: 1px solid #dddddd;
    }
  }
}
</style>


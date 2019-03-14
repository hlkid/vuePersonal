<template>
  <div>
    <el-row class="head">
      <el-col :md="{span:20,offset:2}">
        <el-tooltip :content="item.tips" v-for="(item,index) in btnArr" :key="index" effect="light">
          <el-button @click="toRouter(item)" type="primary">{{item.name}}</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      btnArr: [
        { path: "/fetch", name: "fetch获取数据", tips: "获取数据的方式" },
        { path: "/breadcrumb", name: "面包屑", tips: "面包屑的测试使用" },
        {
          path: "/icon",
          name: "svg图标使用",
          tips: "阿里的svg图标库中svg图标使用——目录示例"
        },
        { path: "/pagination", name: "分页插件", tips: "封装分页插件" },
        { path: "/message", name: "信息提示", tips: "封装信息提示方法" }
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(["permison_url", "hostUrl"])
  },
  methods: {
    toRouter: function(item) {
      this.$router.push({ path: item.path });
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  background: #fff;
  min-height: 35px;
  line-height: 35px;
  font-size: 12px;
  border-bottom: 2px solid #ccc;
  padding: 10px 0px;
}
</style>



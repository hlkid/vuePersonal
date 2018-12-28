<!--直接展示新闻内容-->
<template>
  <div>
    <el-row style="margin-top:20px">
      <el-col class="newsdetail" :offset="3" :sm="18">
          <i onclick="history.go(-1)" class="el-icon-back"></i>
          <h3>{{title}}</h3>
          <p>{{time}}</p>
        <div v-html="content"></div>
        <div v-if="content==''">暂无内容</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      content: "234",
      title:"",
      time:""
    };
  },
  mounted() {
    this.initData();
  },
  computed: {
    ...mapState(["news_url"])
  },
  methods: {
    //数据接入
    initData: function() {
      console.info(this.$route.query.id);
      let param = {
        id: this.$route.query.id
      };
      //console.info(param);
      let data = postAjax(this.news_url+"/NewsDetail/newsSelect", param);
      this.title=data.backValue.newsTitle;
      this.time=data.backValue.modifyTime;
      this.content=data.backValue.newsContent;
    }
  }
};
</script>

<style lang="less" scoped>
.newsdetail {
  background: #fff;
  padding: 1% 2%;
  i{
    float: left;
    font-size: 26px;
    cursor: pointer;
  }
  i:hover{
    color: #45b97a
  }
  h3{
      text-align: center;
  }
  p{
      text-align: right;
      padding-right: 5%;
  }
}
</style>

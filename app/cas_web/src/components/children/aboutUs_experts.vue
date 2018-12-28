<template>
  <div class="aboutUs_experts">
    <div @click="expertsDetail()" v-for="(item,index) in expertsData" :key="index" class="expertBox">
      <img :src="news_url+'/'+item.newsPath">
      <!-- <div class="name">{{item.newsTitle}}</div> -->
      <div class="post">{{item.newsTitle}}</div>
    </div>
    <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
  </div>
</template>

<script>
import pagination from "../common/pagination.vue"; //引用分页
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      expertsData: [],
      //分页组件中的基础值
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    };
  },
  components: { pagination },
  computed: {
    ...mapState(["news_url"])
  },
  mounted() {
    this.initData(1);
  },
  methods: {
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.initData(data);
    },
    //初始化数据
    initData: function(num) {
      let paramlist = {
        pageCur: num,
        pageNum: 20,
        parentid: "7_2",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let listdata = postAjax(
        this.news_url + "/NewsDetail/newsSelectList",
        paramlist
      );
      this.expertsData = listdata.backValue;
      //console.info(listdata.backValue);
      this.paginationData = {
        currentPage: num,
        totalCount: listdata.count,
        pages: Math.ceil(listdata.count / 10) == 0 ? 1 : Math.ceil(listdata.count / 10)
      };
    },
    //跳转到专家详情页(即新闻详情页面)
    expertsDetail: function() {}
  }
};
</script>

<style lang="less" scoped>
#pagination {
  padding: 0px 1% 15px 1% !important;
  width: 98% !important;
}
.aboutUs_experts {
  border: 1px solid #ebebeb;
  float: left;
  .expertBox {
    float: left;
    font-size: 14px;
    width: 18%;
    margin: 8px 1%;
    cursor: pointer;
    img {
      width: 100%;
      height: 150px;
    }
    .name {
      font-weight: bold;
      margin-top: 2px;
    }
    .post {
      margin: 5px 0px 10px 0px;
      font-size: 12px;
      text-align: center;
    }
  }
  .expertBox:hover {
    color: #45b97a;
    box-shadow: 0px 0px 5px #ccc;
  }
}
</style>


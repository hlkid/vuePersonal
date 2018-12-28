<template>
  <div class="qqOnline">
    <div v-html="content" class="data">

    </div>
    <div @click="openQQ" class="contact">联系客服</div>
  </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      content: "",
      qq: ""
    };
  },
  props: ["queryParam"],
  mounted() {
    console.info("查询参数", this.queryParam);
    this.listSearch(1, this.queryParam.type);
  },
  computed: {
    ...mapState(["news_url"])
  },
  methods: {
    //查询列表
    listSearch: function(num, PidInit) {
      let param = {
        pageCur: num,
        pageNum: 10,
        parentid: PidInit,
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url + "/NewsDetail/newsSelectList", param);
      console.info(data);
      let detail = postAjax(this.news_url + "/NewsDetail/newsSelect", {
        id: data.backValue[0].id
      });
      this.content = detail.backValue.newsContent;
      this.qq = detail.backValue.newsTitle;
    },
    //打开QQ
    openQQ: function() {
      let url =
        "tencent://message/?Menu=yes&uin=" +
        this.qq +
        "&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45";
      var link = $('<a href="' + url + '"></a>');
      link.get(0).click();
    }
  }
};
</script>

<style lang="less" scoped>
.qqOnline {
  text-align: left;
  width: 80%;
  padding-left: 5%;
  overflow: auto;
  margin-top: 15px;
  .contact {
    border-radius: 8px;
    color: #fff;
    background: linear-gradient(to right, #1ae970, #09c457);
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    width: 50%;
    margin-left: 18%;
    text-align: center;
    margin-top: 8px;
  }
}
</style>


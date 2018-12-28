<template>
    <div class="news" v-html="content">

    </div>
</template>

<script>
import "../../css/quill.css";//引入编辑器样式
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      content: "管理员维护数据——新闻"
    };
  },
  props: ["queryParam"],
  computed: {
    ...mapState(["news_url"])
  },
  mounted(){
      this.initData(this.queryParam.type);
  },
  methods: {
    //数据接入
    initData: function(PidInit) {
        let paramlist = {
        pageCur: 1,
        pageNum: 10,
        parentid: PidInit,
        userid: "",
        status:"0",
        newsname: ""
      };
      //console.info(param);
      let listdata = postAjax(this.news_url+"/NewsDetail/newsSelectList", paramlist);
      let param = {
        id: listdata.backValue[0].id
      };
      //console.info(param);
      let data = postAjax(this.news_url + "/NewsDetail/newsSelect", param);
      console.info(data);
      this.content=data.backValue.newsContent;
    }
  }
};
</script>

<style lang="less" scoped>
.news {
  border: 1px solid #ebebeb;
  padding: 10px 15px;
  margin-top: -1px;
}
</style>


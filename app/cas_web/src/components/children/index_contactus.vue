<template>
    <div class="qqOnline">
        <div class="data">
            <img :src="news_url+'/'+imgSrc" alt="">
        </div>
        <!-- <div class="data" v-html="content">

        </div> -->
        <div @click="openQQ" class="contact">在线QQ</div>
     </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
    data(){
        return{
            imgSrc:"",
            qq:"",
            content:""
        }
    },
  mounted(){
      console.info("查询参数",this.queryParam);
      this.listSearch(1)
  },
  computed: {
    ...mapState(["news_url"])
  },
    methods:{
        //查询列表
    listSearch: function(num) {
      let param = {
        pageCur: num,
        pageNum: 10,
        parentid: "10",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url+"/NewsDetail/newsSelectList", param);
      console.info(data);
      let detail = postAjax(this.news_url + "/NewsDetail/newsSelect", {
        id: data.backValue[0].id
      });
      this.qq = detail.backValue.newsTitle;
      this.imgSrc = detail.backValue.newsPath;
      this.content=detail.backValue.newsContent;
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
}
</script>

<style lang="less" scoped>
.qqOnline{
     position: absolute;
    overflow: auto;
    margin-top: 15px;
    background: #fff;
    margin-right: 1%;
    z-index: 9;
    img{
        width: 100%;
    }
    .contact{
        border-radius: 8px;
        color: #fff;
        background: linear-gradient(to right, #1AE970, #09C457);
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
        width: 50%;
        margin-left: 19%;
        text-align: center;
        margin-top: 8px;
        text-align: center;
    }
}

</style>


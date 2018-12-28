<template>
  <div class="experts">
    <div class="head">
      <b>专家风采</b>EXPERTS
      <a @click="toMore">更多</a>
    </div>
    <div class="main">
      <div class="swiper-container expertsSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in demoData" :key="index">
            <img :src="item.url" alt="">
            <div class="text"><b>{{item.name|name}}</b><br><div v-html="item.des"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      demoData: []
    };
  },
  mounted: function() {
    this.dataInit(1);
    setTimeout(this.swiperInit,50);
  },
   computed: {
    ...mapState(["news_url"])
  },
  watch: {
      //监听路由变化
    $route(to, from) {
    this.swiperInit();
    }
  },
  methods: {
    //跳转更多页面
    toMore:function(){
      this.$router.push({path:"/aboutUs/experts"});
    },
    //轮播图
    swiperInit:function(){
      //配置Swiper  建议关于Swiper配置方面可以前往Swiper官网
      new Swiper(".expertsSwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 1,
        speed: 1500,
        loop: false,
        loopFillGroupWithBlank: true,
        autoplay: 2000,
      });
    },
    //初始化数据
    dataInit: function(num) {
      let param = {
        pageCur: num,
        pageNum: 20,
        parentid: "7_2",
        status:"0",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url + "/NewsDetail/newsSelectList", param);
      //console.info(data);
      let _this=this
      this.demoData = data.backValue.map(function(item){
        return {
          name:item.newsTitle,
          des:item.newsContent==null?"":item.newsContent,
          url:_this.news_url+"/"+item.newsPath
        }
      });
      //console.info("2",this.demoData)
    },
  },
  filters:{
    text:function(val){
      if(val.length>20&&val!=null){
        return val.slice(0,20)+"..."
      }else{
        return val
      }
    },
    name:function(val){
      if(val.length>5){
        return val.slice(0,5)+"..."
      }else{
        return val
      }
    }
  }
};
</script>

<style lang="less" scoped>
.experts {
  margin-top: 15px;
  margin-right: 4%;
  width: 96%;
  float: left;
  box-shadow: 0px 0px 10px #d0d0d0;
  .head {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: #b2b2b2;
    padding: 0px 8px;
    position: relative;
    background: #e4e9ed;
    b {
      color: #000;
      margin-right: 15px;
    }
    a {
      color: #45b97a;
      cursor: pointer;
      float: right;
    }
    a:hover {
      text-decoration: underline;
    }
  }
  .main {
    height: 150px;
    margin-top: 10px;
    background: #fff;
    padding: 0px 1%;
    .swiper-slide {
      width: 100px;
      height: 130px;
      cursor: pointer;
      img {
        width: 48%;
        float: left;
        min-height: 130px;
        border: 1px solid #ccc;
      }
      .text{
        width: 44%;
        height: 118px;
        font-size: 14px;
        line-height: 22px;
        float: left;
        border: 1px solid #ccc;
        margin-left: -1px;
        padding: 2%;
      }
    }
  }
}
</style>


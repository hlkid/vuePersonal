<template>
  <div class="serviceSys">
    <el-row>
      <el-col :offset="3" :sm="18">
        <div class="head">
          <b>友情链接</b>FRIENDSHIPLINK
        </div>
        <div class="main">
          <div class="swiper-container linkSwiper">
            <div class="swiper-wrapper card">
              <div class="swiper-slide" v-for="(item,index) in cardData" :key="index">
                <img @click="toLink(item)" :src="news_url+'/'+item.newsPath">
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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
      cardData: []
    };
  },
  mounted() {
    this.dataInit();
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
      //轮播图
    swiperInit:function(){
      //配置Swiper  建议关于Swiper配置方面可以前往Swiper官网
      new Swiper(".linkSwiper", {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 1,
        speed: 2000,
        loop: false,
        loopFillGroupWithBlank: true,
        autoplay: 300,
      });
    },
    //跳转友情链接
    toLink: function(data) {
      window.open(data.newsTitle);
    },
    //初始化数据
    dataInit: function(num) {
      let param = {
        pageCur: num,
        pageNum: 999,
        parentid: "11",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url + "/NewsDetail/newsSelectList", param);
      console.info(data);
      this.cardData = data.backValue;
    }
  }
};
</script>

<style lang="less" scoped>
.serviceSys {
  padding: 20px 0px;
  background: #ececec;
  .head {
    line-height: 40px;
    color: #b2b2b2;
    font-size: 14px;
    b {
      color: #000;
      font-size: 14px;
      margin-right: 16px;
    }
  }
  .main {
    .card {
      width: 18%;
      float: left;
      margin-right: 2%;
      cursor: pointer;
      img {
        width: 100%;
        height: 50px;
      }
    }
  }
}
</style>


<template>
  <div class="demoshow">
    <div class="head">
      <b>成果展示</b>DEMONS
      <a @click="more">更多</a>
    </div>
    <div class="main">
      <div class="swiper-container index_demoShow">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in listData" :key="index">
            <img @click="tolink(item)" :src="item.url" alt="">
            <div class="text">{{item.name}}</div>
          </div>
        </div>
        <div style="margin-left:0%" class="swiper-button-prev"></div>
        <!--左箭头-->
        <div style="margin-right:0%" class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAjax } from "../../js/common.js";
import { mapState, mapActions } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      listData: []
    };
  },
  mounted: function() {
    this.listSearch(1);
    setTimeout(this.demoShowSwiper,50);
  },
  watch: {
      //监听路由变化
    $route(to, from) {
    this.listSearch(1);
    setTimeout(this.demoShowSwiper,50);
    }
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  methods: {
    //demoShow轮播图
    demoShowSwiper: function() {
      new Swiper(".index_demoShow", {
        slidesPerView: 1,
        spaceBetween: 6,
        slidesPerGroup: 1,
        speed: 1500,
        loop: false,
        loopFillGroupWithBlank: true,
        autoplay: 2000,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
      });
    },
    //查看更多
    more:function(){
      this.$router.push({path:"/serviceExt/demo"});
    },
    //跳转成果详情
    tolink: function(item) {
      this.$router.push({path:"/resultSummary",query:{id:item.id}});
    },
    //查询列表
    listSearch: function(num, PidInit) {
      let param = {
        pageCur: num,
        pageNum: 10,
        userid: "",
        status:"0",
      };
      console.info(param);
      let data = postAjax(this.hostUrl + "/resultsShow/list", param);
      console.info(data);
      let _this=this;
      this.listData = data.backValue.map(function(item){
        return {
          id:item.id,
          name:item.name,
          url:item.titlePath=="0"?_this.hostUrl+"/assets/imgBlank.png":_this.hostUrl+"/"+item.titlePath
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.demoshow {
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
    padding: 30px 0px;
    background: #fff;
    .swiper-slide {
      width: 50%;
      height: 120px;
      cursor: pointer;
      img {
        margin-left: 25%;
        width: 50%;
        height: 100px;
      }
      .text {
        height: 30px;
        line-height: 21px;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
.swiper-button-prev{
  background-image: url("../../assets/index/left.png")
}
.swiper-button-prev:hover{
  background-image: url("../../assets/index/leftHover.png")
}
.swiper-button-next{
  background-image: url("../../assets/index/right.png")
}
.swiper-button-next:hover{
background-image: url("../../assets/index/rightHover.png")
}
.swiper-button-next, .swiper-button-prev{
  background-size: 30px;
  width: 30px;
  height: 30px;
}
</style>


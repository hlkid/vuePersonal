<template>
  <div class="service">
    <div class="head">
      <b>为你服务</b>SERVICE
    </div>
    <div class="main">
      <img @click="routerChange(item)" :src="item.src" v-for="(item,index) in imgList" :key="index">
    </div>
  </div>
</template>

<script>
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      spanName: "news",
      imgList: [
          {src:require("../../assets/index/service1.jpg"),url:"/serviceSys/sta/content"},
          {src:require("../../assets/index/service2.jpg"),url:"/serviceSta/rev/content"},
          {src:require("../../assets/index/service3.jpg"),url:"/serviceSys/demo"},
          {src:require("../../assets/index/service4.jpg"),url:"/serviceTrain"},
          {src:require("../../assets/index/service5.jpg"),url:"/serviceExt"},
          {src:require("../../assets/index/service6.jpg"),url:"/serviceSta"}
          ]
    };
  },
  mounted: function() {
    
  },
  computed: {
    
  },
  methods: {
    routerChange:function(item){
      this.$router.push({path:item.url})
    }
  }
};
</script>

<style lang="less" scoped>
.service {
  margin-top: 15px;
  margin-right: 4%;
  width: 96%;
  float: left;
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
    height: 180px;
    padding: 10px 0px;
    img{
        width: 32%;
        margin-left: 1%;
        cursor: pointer;
        max-height: 93px;
    }
    // img:hover{
    //     width: 33%;
    // }
}
}
</style>


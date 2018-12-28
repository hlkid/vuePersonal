<template>
  <div class="help">
    <div class="head">
      <b>帮助中心</b>HELP
    </div>
    <div class="main">
      <img @click="toUesbook" src="../../assets/index/help1.jpg">
      <img @click="toQuestion"  src="../../assets/index/help2.jpg">
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
      list: []
    };
  },
  mounted: function() {
    
  },
  computed: {
    
  },
  methods: {
    toUesbook:function(){
      this.$router.push({path:"/help/usebook"})
    },
    toQuestion:function(){
      this.$router.push({path:"/help/question"})
    }
  }
};
</script>

<style lang="less" scoped>
.help {
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
    height: 160px;
    padding: 10px 0px;
    img{
        margin-top: 5px;
        width: 90%;
        max-height: 68px;
        margin-left: 5%;
        cursor: pointer;
    }
    // img:hover{
    //     width: 96%;
    //     margin-left: 2%;
    // }
}
}
</style>


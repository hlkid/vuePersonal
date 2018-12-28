<template>
  <div class="demonstration">
    <div class="head">
      <b>示范区查询</b>STRATION
    </div>
    <div class="main">
      <img @click="search" src="../../assets/index/china.jpg">
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
    search:function(){
      this.$router.push({path:"/serviceExt/search"})
    }
  }
};
</script>

<style lang="less" scoped>
.demonstration {
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
    background: #fff;
    height: 180px;
    padding: 10px 0px;
    img{
        width: 80%;
        margin-left: 10%;
        cursor: pointer;
        max-height: 180px;
    }
    img:hover{
      width: 82%;
        margin-left: 9%;
    }
}
}
</style>


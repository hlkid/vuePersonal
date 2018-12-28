<template>
  <div class="searchSta">
     <div class="head">
      <b>标准查询</b>SEARCH
    </div>
    <div class="main">
      <el-input class="input" v-model="input" placeholder="输入标准名称和标准编号"></el-input>
      <div @click="toSearchSta" class="btn">查询</div>
      <div @click="toSearchSta" class="highBtn">高级查询</div>
      <div class="text"><i class="el-icon-caret-right"></i>高级查询：使用更多查询条件进行查询。</div>
    </div>
  </div>
</template>

<script>
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      input:""
    }
  },
  mounted: function() {
    
  },
  computed: {
    ...mapState(["news_url"])
  },
  watch:{
    input:function(data){
      if(data.length>0){
        this.$router.push({path:"/searchSta/home"})
      }
    }
  },
  methods: {
    toSearchSta:function(){
      this.$router.push({path:"/searchSta/home"})
    }
    
  }
};
</script>

<style lang="less" scoped>
.searchSta {
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
 }
  .main {
    background: #fff;
    height: 160px;
    padding: 10px 0px;
    .input{
        width: 90%;
        margin-left: 5%;
        margin-top: 15px;
    }
    .btn{
        width: 24%;
        margin-left: 38%;
        background: #45b97a;
        color: #fff;
        cursor: pointer;
        height: 35px;
        line-height: 35px;
        font-size: 15px;
        text-align: center;
        margin-top: 10px;
    }
    .highBtn{
        text-align: center;
        margin-top: 10px;
        font-size: 15px;
        color: #45b97a;
        cursor: pointer;
    }
    .text{
        font-size: 12px;
        margin-top: 10px;
        margin-left: 3%;
        color: #000;
        i{
            color: #45b97a;
            font-size: 14px;
        }
    }
  }
}
</style>


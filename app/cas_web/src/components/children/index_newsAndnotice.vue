<template>
  <div class="newsAndnotice">
    <div class="head">
      <span @click="spanNameChange('news')" :class="spanName=='news'?'spanActive':''"><b>新闻动态</b>NEWS</span>
      <span @click="spanNameChange('notice')" :class="spanName=='notice'?'spanActive':''" style="margin-left:10px"><b>通知公告</b>NOTICE</span>
      <a @click="toMore">更多</a>
    </div>
    <div class="main">
      <div @click="tonewsdetail(item)" class="list" v-for="(item,index) in list" :key="index">
        <span class="text"><i class="el-icon-news"></i>{{item.newsTitle}}</span>
        <span class="time">{{item.modifyTime|time}}</span>
      </div>
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
    this.dataInit("1_1");
  },
  computed: {
    ...mapState(["news_url"])
  },
  methods: {
    //初始化数据
    dataInit: function(parentid) {
      let param = {
        pageCur: 1,
        pageNum: 5,
        parentid: parentid,
        status:"0",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url + "/NewsDetail/newsSelectList", param);
      //console.info(data);
      this.list = data.backValue;
    },
    //跳转到更多页面
    toMore:function(){
      if(this.spanName=="news"){
        this.$router.push({path:"/activeMsg/news"});
      }else if(this.spanName=="notice"){
        this.$router.push({path:"/aboutUs/notice"});
      }
    },
    //跳转到新闻页面
    tonewsdetail:function(item){
      this.$router.push({path:"/newsdetail",query:{id:item.id}});
    },
    //改变spanName
    spanNameChange: function(name) {
      this.spanName = name;
      if(name=="news"){
        this.dataInit("1_1");
      }else if(name=="notice"){
        this.dataInit("7_5");
      }
      
    },
    toPath: function(item) {
      this.$router.push({ path: item.path });
    }
  },
  filters:{
    time:function(val){
      return val.split(" ")[0]
    }
  }
};
</script>

<style lang="less" scoped>
.newsAndnotice {
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
    padding-right: 8px;
    position: relative;
    background: #e4e9ed;
    span {
      cursor: pointer;
      float: left;
      line-height: 30px;
      padding: 0px 8px;
    }
    .spanActive {
      background: #fff;
      border-top: 2px solid #45b97a;
      color: #45b97a;
      b {
        color: #45b97a;
      }
    }
    b {
      color: #000;
      margin-right: 8px;
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
    height: 160px;
    padding: 10px 0px;
    .list {
      padding: 5px 10px;
      font-size: 13px;
      line-height: 20px;
      min-height: 20px;
      cursor: pointer;
      border-bottom: 1px solid #ebebeb;
      .text {
        float: left;
        width: 65%;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        i {
          margin-right: 15px;
        }
      }
      .time {
        float: right;
      }
    }
    .list:hover {
      color: #45b97a;
      text-decoration: underline;
    }
  }
}
</style>


<template>
  <div class="newsAndnotice">
    <div class="head">
      <b>合作伙伴</b>PARTNER
      <a @click="toMore">更多</a>
    </div>
    <div id="demo" class="main">
      <div id="demo1">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div @click="tonewsdetail(item)" @mousemove="textScrollStop" @mouseout="textScrollStart"><span class="text"><i class="el-icon-news"></i>{{item.newsTitle}}</span>
            <span class="time">{{item.modifyTime|time}}</span></div>
        </div>
      </div>
      <div id="demo2">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div @click="tonewsdetail(item)" @mousemove="textScrollStop" @mouseout="textScrollStart"><span class="text"><i class="el-icon-news"></i>{{item.newsTitle}}</span>
            <span class="time">{{item.modifyTime|time}}</span></div>
        </div>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      animate: true, //字母滚动
      list: [],
      texxtScroll: null
    };
  },
  created() {
    
  },
  mounted: function() {
    this.dataInit(1);
    this.texxtScroll = setInterval(this.textScroll, 60);
  },
  computed: {
    ...mapState(["news_url"])
  },
  methods: {
    //初始化数据
    dataInit: function(num) {
      let param = {
        pageCur: num,
        pageNum: 20,
        status:"0",
        parentid: "9",
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
      this.$router.push({path:"/serviceExt/partner"});
    },
    //跳转到新闻页面
    tonewsdetail: function(item) {
      this.$router.push({ path: "/newsdetail", query: { id: item.id } });
    },
    //字母滚动
    textScroll: function() {
      var demo = document.getElementById("demo");
      var demo1 = document.getElementById("demo1");
      if (demo) {
        if (demo.scrollTop >= demo1.offsetHeight) {
          demo.scrollTop = 0;
        } else {
          demo.scrollTop = demo.scrollTop + 1;
        }
      }
    },
    //鼠标划上字符停止
    textScrollStop: function() {
      clearInterval(this.texxtScroll);
    },
    //鼠标离开字符开始
    textScrollStart: function() {
      this.texxtScroll = setInterval(this.textScroll, 60);
    }
  },
  filters: {
    time: function(val) {
      return val.split(" ")[0];
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
    height: 140px;
    padding: 20px 0px;
    overflow: hidden;
    margin: 10px 0px;
    .list {
      padding: 5px 10px;
      font-size: 15px;
      line-height: 25px;
      min-height: 25px;
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
        font-size: 12px;
      }
    }
    .list:hover {
      color: #45b97a;
      text-decoration: underline;
    }
  }
}
</style>


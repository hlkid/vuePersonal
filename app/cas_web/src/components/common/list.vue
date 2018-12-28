<!--新闻公用列表-->
<template>
    <div>
        <div style="padding:10px 0px 0px 25px" v-if="listData.length==0">暂无数据</div>
        <div @click="toDetail(item)" v-for="item in listData" :key="item.id" class="list">
            <span class="text"><i class="el-icon-news"></i>{{item.newsTitle}}</span>
            <span class="time">{{item.modifyTime}}</span>
        </div>
        <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
    </div>
</template>

<script>
import $ from "jquery";
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";
import pagination from "../common/pagination.vue"; //引用分页 

export default {
  data(){
    return{
      listData:[],
      //分页组件中的基础值
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    }
  },
  props:["queryParam"],
  mounted(){
      console.info("查询参数",this.queryParam);
      this.listSearch(1,this.queryParam.type)
  },
  computed: {
    ...mapState(["news_url"])
  },
  components:{pagination},
  methods:{
      //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.listSearch(data);
    },
  //查询列表
    listSearch: function(num,PidInit) {
      let param = {
        pageCur: num,
        pageNum: 10,
        parentid: PidInit,
        status:"0",
        userid: "",
        newsname: ""
      };
      //console.info(param);
      let data = postAjax(this.news_url+"/NewsDetail/newsSelectList", param);
      console.info(data);
      this.listData = data.backValue;
      this.paginationData={
            currentPage: num,
            totalCount: data.count,
            pages: Math.ceil(data.count/10)==0?1:Math.ceil(data.count/10)
        };
    },
    //跳转新闻详情页面
    toDetail:function(item){
        this.$router.push({path:"/newsdetail",query:{id:item.id}});
    }
  }
};
</script>

<style lang="less" scoped>
.list{
    margin: 5px 15px;
    padding: 5px 10px;
    font-size: 15px;
    line-height: 25px;
    min-height: 25px;
    cursor: pointer;
    border-bottom: 1px solid #EBEBEB;
    .text{
        float: left;
        width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        i{
            margin-right: 15px;
        }
    }
    .time{
        float: right;
    }
}
.list:hover{
    color: #45B97A;
    text-decoration: underline;
}
#pagination{
    width: 96% !important;
    line-height: 25px !important;
    margin: 25px 2% 10px 2%;
    float: none !important;
}
</style>


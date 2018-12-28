<template>
  <div class="result">
    <el-row class="rowSearch">
      <el-col :sm="18" class="searchInput"><i class="el-icon-search"></i><input placeholder="请输入案例名称" type="text" v-model="search.name" /></el-col>
      <el-col :sm="4" class="search"><button @click="listSearch(1,'1')" class="btn">查询</button></el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" class="label">
        <div @click="detail(item)" v-for="(item,index) in listData" :key="index" class="resultBox">
          <img :src="hostUrl+'/'+imgFilter(item.titlePath)">
          <div class="post">{{item.name}}</div>
        </div>
        <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pagination from "../common/pagination.vue"; //引用分页
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      listData: [],
      //查询条件
      search: {
        name: ""
      },
      //分页组件中的基础值
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    };
  },
  components: { pagination },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.listSearch(1);
  },
  methods: {
      //图片过滤
      imgFilter:function(val){
          if(val=="0"||val==""){
              return "assets/imgBlank.png"
          }else{
              return val
          }
      },
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.initData(data);
    },
    //查询列表
    listSearch: function(num) {
      let param = {
        pageCur: num,
        pageNum: 12,
        userid: "",
        name: this.search.name
      };
      console.info(param);
      let data = postAjax(this.hostUrl + "/resultsShow/list", param);
      console.info(data);
      this.listData = data.backValue;
      this.paginationData = {
        currentPage: num,
        totalCount: data.count,
        pages: Math.ceil(data.count / 10) == 0 ? 1 : Math.ceil(data.count / 10)
      };
    },
    //跳转详情页
    detail: function(item) {
      this.$router.push({path:"/resultSummary",query:{id:item.id}});
    }
  }
};
</script>

<style lang="less" scoped>
#pagination {
  padding: 0px 1% 15px 1% !important;
  width: 98% !important;
}
.result {
  border: 1px solid #ebebeb;
  float: left;
  .rowSearch {
    margin: 1%;
    .searchInput {
      position: relative;
      .el-icon-search {
        position: absolute;
        top: 10px;
        left: 2%;
        padding: 0px 2% 0px 1%;
        border-right: 2px solid #fff;
      }
      input {
        height: 35px;
        line-height: 35px;
        width: 80%;
        border-radius: 15px;
        background: #f2f2f2;
        border: none;
        outline: none;
        padding: 0px 5% 0px 12%;
      }
    }
    .search {
      .btn {
        width: 60%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #45b779;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }
  .resultBox {
    float: left;
    font-size: 14px;
    width: 23%;
    margin: 8px 1%;
    cursor: pointer;
    img {
      width: 100%;
      height: 150px;
    }
    .name {
      font-weight: bold;
      margin-top: 2px;
    }
    .post {
      margin: 5px 0px 10px 0px;
      font-size: 12px;
      text-align: center;
    }
  }
  .resultBox:hover {
    color: #45b97a;
    box-shadow: 0px 0px 5px #ccc;
  }
}
</style>


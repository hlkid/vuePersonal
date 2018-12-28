<template>
  <div class="box">
    <div class="oprate">
      <el-row v-show="!isDetail" class="rowSearch">
        <el-col :sm="18" class="searchInput"><i class="el-icon-search"></i><input placeholder="请输入示范区名称" type="text" v-model="highSearch.name" /></el-col>
        <el-col :sm="4" class="search"><button @click="listSearch(1,'1')" class="btn">查询</button></el-col>
        <el-col :sm="2" class="highSearchBtn"><a @click="isDetail=true">精准查询</a></el-col>
      </el-row>
      <el-row v-show="isDetail" class="highSearch">
        <el-col :offset="1" :sm="11">
          <div class="label">编号：</div>
          <div class="print">
            <el-input v-model="highSearch.number" class="input" clearable></el-input>
          </div>
        </el-col>
        <el-col :offset="1" :sm="11">
          <div class="label">名称：</div>
          <div class="print">
            <el-input v-model="highSearch.name" class="input" clearable></el-input>
          </div>
        </el-col>
        <el-col :offset="1" :sm="11">
          <div class="label">省份：</div>
          <div class="print">
            <el-input v-model="highSearch.region" class="input" clearable></el-input>
          </div>
        </el-col>
        <el-col :offset="1" :sm="11">
          <div class="label">级别：</div>
          <div class="print">
            <el-input v-model="highSearch.grade" class="input" clearable></el-input>
          </div>
        </el-col>
        <el-col :offset="13" :sm="11">
          <button @click="listSearch(1,'2')" class="btn">查询</button>
          <a class="quickSearchBtn" @click="isDetail=false">快速查询</a>
        </el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :header-cell-style="{background:'#3AD794',color:'#fff',padding:'5px 0 5px 20px'}" :data="listData" style="width: 100%;float:left" :cell-style="{padding:'8px 8px 8px 20px',color:'#464646'}">
        <el-table-column :show-overflow-tooltip="true" prop="number" label="编号"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="name" label="名称"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="region" label="所在省市"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="grade" label="级别"> </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="summary" label="简介"> </el-table-column>
      </el-table>
    </div>
    <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../common/pagination.vue"; //引用分页
import { postAjax } from "../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isDetail: false, //是否显示高级查询
      //高级搜索值
      highSearch: {
        name: "", //标准名称
        number: "", //标准号
        grade: "", //级别
        region: "" //地市
      },
      listData: [],
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
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.initData(data);
    },
    //查询列表
    listSearch: function(num, type) {
      let param = {};
      if (type == "1") {
        param = {
          pageCur: num,
          pageNum: 10,
          type: "",
          name: this.highSearch.name
        };
      } else {
        param = {
          pageCur: num,
          pageNum: 10,
          type: "",
          name: this.highSearch.name,
          number: this.highSearch.number,
          region: this.highSearch.region,
          grade: this.highSearch.grade
        };
      }

      console.info(param);
      let data = postAjax(this.hostUrl + "/demoArea/list", param);
      console.info(data);
      this.listData = data.backValue;
      this.paginationData = {
        currentPage: num,
        totalCount: data.count,
        pages: Math.ceil(data.count / 10) == 0 ? 1 : Math.ceil(data.count / 10)
      };
    }
  },
  filters: {}
};
</script>

<style lang="less">
.box {
  border: 1px solid #ebebeb;
  padding: 10px 2%;
  float: left;
  width: 96%;
  margin: -1px;
}
.el-input__inner {
  height: 30px !important;
}
.el-range-editor.el-input__inner {
  padding: 0px 10px;
}
.el-date-editor .el-range__icon {
  line-height: 28px;
}
.oprate {
  line-height: 45px;
  padding: 0px 2%;
  .rowSearch {
    .searchInput {
      position: relative;
      .el-icon-search {
        position: absolute;
        top: 18px;
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
    .highSearchBtn {
      text-align: right;
      a {
        color: #45b779;
        font-size: 14px;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .highSearch {
    line-height: 45px;
    font-size: 13px;
    .label {
      width: 25%;
      float: left;
    }
    .print {
      width: 75%;
      float: left;
      .input {
        width: 100%;
      }
    }
    .btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background: #45b779;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    .quickSearchBtn {
      margin-left: 20px;
      cursor: pointer;
      color: #45b779;
    }
    .quickSearchBtn:hover {
      text-decoration: underline;
    }
  }
}
.table {
  margin-top: 12px;
  width: 96%;
  padding: 0px 2%;
  float: left;
}
#pagination {
  width: 96% !important;
  float: left;
  line-height: 25px !important;
  padding: 0px 2%;
}
</style>


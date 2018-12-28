<template>
  <div class="box">
    <div class="oprate">
      <el-row class="rowSearch">
        <el-col :sm="7">
          <div class="label">课程名称：</div>
          <div class="print">
            <el-input
              v-model="search.title"
              class="input"
              clearable
            ></el-input>
          </div>
        </el-col>
        <!-- <el-col :sm="7">
                    <div class="label">开课时间：</div>
                    <div class="print">
                        <el-date-picker 
                         class="input"
              format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
              v-model="search.time"
              type="datetime"
              placeholder="选择日期"
            >
            </el-date-picker>
                    </div>
                </el-col> -->
        <el-col :sm="6">
          <div
            style="width:50%"
            class="label"
          >是否免费：</div>
          <div
            style="width:50%"
            class="print"
          >
            <el-select
              class="input"
              v-model="search.feeScale"
              placeholder="请选择"
            >
              <el-option
                v-for="item in isFreeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col
          :offset="1"
          :sm="3"
          class="search"
        ><button class="btn">查询</button></el-col>
      </el-row>
      <el-row class="rowOprate">
        <!-- <el-col :sm="1">
                    <el-checkbox></el-checkbox>
                </el-col>
                <el-col :sm="1">全选</el-col> -->
        <el-col
          :offset="1"
          :sm="4"
        >
          <el-button
            class="btnCollect"
            icon="el-icon-sold-out"
          >收藏</el-button>
        </el-col>
        <el-col
          :offset="15"
          :sm="4"
        >
          <el-button
            class="myCollect"
            icon="el-icon-star-off"
          >我的收藏</el-button>
        </el-col>
      </el-row>
    </div>
    <courseList :courseData="courseData"></courseList>
    <pagination
      @listPagination="listPagination"
      :paginationData="paginationData"
    ></pagination>
  </div>
</template>

<script>
import courseList from "../common/courseList.vue";
import $ from "jquery";
import pagination from "../common/pagination.vue";
import { postAjax } from "../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      time: "",
      isFree: "",
      isFreeOption: [
        { label: "是", value: true },
        { label: "否", value: false }
      ],
      checkAll: false,
      search: {
        feeScale: null,
        title: "",
        time: ""
      },
      courseData: {
        checkbox: true,
        listData: []
      },
      //分页
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    };
  },
  components: { pagination, courseList },
  mounted() {
    this.listSearch(1);
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  methods: {
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.initData(data);
    },
    //查询列表
    listSearch: function(num) {
      let param = {
        pageCur: num,
        pageNum: 10,
        type: "",
        userid: ""
        // feeScale:this.search.feeScale,
        // trainName: this.search.title,
        // trainTime: this.search.time
      };
      console.info(param);
      let data = postAjax(this.hostUrl + "/train/list", param);
      let list = [];
      for (let i = 0; i < data.backValue.length; i++) {
        if (data.backValue[i].status == "0") {
          let obj = {
            id: data.backValue[i].id,
            time: data.backValue[i].trainTime,
            title: data.backValue[i].title,
            type: data.backValue[i].type,
            lecturer: data.backValue[i].lecturer,
            content: data.backValue[i].summary,
            price: data.backValue[i].price,
            buyStatus: "3",
            checked: false
          };
          list.push(obj);
        }
      }

      this.courseData.listData = list;
      console.info(this.courseData);
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
  padding: 10px;
}
.oprate {
  line-height: 45px;
  .rowSearch {
    border-bottom: 1px solid #ebebeb;
    font-size: 13px;
    padding-bottom: 10px;
    .label {
      width: 35%;
      float: left;
      text-align: right;
    }
    .print {
      width: 65%;
      float: left;
      .input {
        width: 100%;
        .el-input__inner {
          height: 30px !important;
        }
      }
    }
    .search {
      .btn {
        width: 80%;
        height: 30px;
        line-height: 30px;
        background: #45b779;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
  }

  .rowOprate {
    margin-top: 5px;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
    .btnCollect {
      background: #45b779;
      color: #fff;
      padding: 6px 12px;
      border-radius: 0px;
    }
    .myCollect {
      margin-top: 10px;
      background: #697cb4;
      color: #fff;
      padding: 6px 12px;
      border-radius: 0px;
      float: right;
    }
  }
}

#pagination {
  width: 96% !important;
  float: left;
  line-height: 25px !important;
  padding: 0px 2%;
}
</style>


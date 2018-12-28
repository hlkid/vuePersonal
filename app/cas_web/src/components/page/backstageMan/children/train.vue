<template>
  <div class="data">
    <el-row>
      <el-col :sm="24" class="dataMain">
        <el-row class="search">
          <el-col class="label">标题：</el-col>
          <el-col :sm="5"><input v-model="search.title" /></el-col>
          <el-col style="margin-left:20px" class="label">状态：</el-col>
          <el-col :sm="2" class="status">
            <el-select style="height:25px;line-height:25px" v-model="search.status" placeholder="请选择" clearable>
              <el-option key="0" label="启用" value="0"> </el-option>
              <el-option key="1" label="停用" value="1"> </el-option>
            </el-select>
          </el-col>

          <el-col :offset="1" :sm="4"><button @click="listSearch(1)" class="btn">查询</button></el-col>
        </el-row>
        <div class="oprate">
          <button @click="add()" class="btn">新增</button>
        </div>
        <div class="list">
          <el-table :header-cell-style="{background:'#F5F5F5',color:'#464646',padding:'5px 0 5px 20px',overflow:'hidden'}" stripe :data="tableData" style="width: 100%" :cell-style="{padding:'0 0 0 20px',color:'#464646'}">
            <el-table-column :show-overflow-tooltip="true" prop="title" label="课程名称"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="type" label="课程类别"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="lecturer" label="授课老师"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="trainTime" label="开课时间"></el-table-column>
            <el-table-column prop="feeScale" label="是否收费" :formatter="isFree"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="price" label="价格"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="createUser" label="创建人"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="status" label="状态">
              <template slot-scope="scope_status">
                <span v-if="scope_status.row.status=='0'" style="padding:0px 5px;color:#fff;background:#67C23A">{{ scope_status.row.status|formatStatus }}</span>
                <span v-if="scope_status.row.status=='1'" style="padding:0px 5px;color:#fff;background:#909399">{{ scope_status.row.status|formatStatus }}</span>
                <span v-if="scope_status.row.status=='2'" style="padding:0px 5px;color: #fff;background:#F56C6C">{{ scope_status.row.status|formatStatus}}</span>
              </template></el-table-column>
            <el-table-column width="150" label="操作">
              <template slot-scope="scope">
                <el-button @click.native.prevent="edit(tableData[scope.$index])" type="text" size="small">
                  编辑
                </el-button>
                <el-button @click.native.prevent="del(scope.$index, tableData)" type="text" size="small">
                  删除
                </el-button>
                <el-button v-if="tableData[scope.$index].status!='0'" @click.native.prevent="statusChange(scope.$index, tableData,'0')" type="text" size="small">
                  启用
                </el-button>
                <el-button v-if="tableData[scope.$index].status=='0'" @click.native.prevent="statusChange(scope.$index, tableData,'2')" type="text" size="small">
                  停用
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../../../common/pagination.vue";
import { postAjax } from "../../../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      columnData: [],
      tableData: [],
      //查询条件
      search: {
        title: "",
        status: ""
      },
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    };
  },
  mounted() {
    this.listSearch(1);
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  components: { pagination },
  methods: {
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.initData(data);
    },
    //查询列表
    listSearch: function(num, PidInit) {
      let param = {
        pageCur: num,
        pageNum: 10,
        type: "",
        userid: "",
        status: this.search.status,
        trainName: this.search.title
      };
      console.info(param);
      let data = postAjax(this.hostUrl + "/train/list", param);
      console.info(data);
      this.tableData = data.backValue;
      this.paginationData = {
        currentPage: num,
        totalCount: data.count,
        pages: Math.ceil(data.count / 10) == 0 ? 1 : Math.ceil(data.count / 10)
      };
    },
    //删除课程
    del: function(index, data) {
      let _this = this;
      this.$confirm(
        "此操作将永久删除”" + data[index].title + "“ 该课程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          let param = {
            id: data[index].id
          };
          param = JSON.stringify(param);
          $.ajax({
            url: _this.hostUrl + "/train/delete",
            type: "post",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: param,
            async: false,
            success: function(data) {
              if (data.backValue == true) {
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                _this.listSearch(1);
              } else {
                _this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            },
            error: function(e) {
              console.info(e);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //启用或者停用培训
    statusChange: function(index, data, val) {
      let statusMsg = val == "0" ? "启用" : val == "2" ? "停用" : "未知";
      let _this = this;
      this.$confirm(
        "是否确定" + statusMsg + "”" + data[index].title + "“ 该课程？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let param = {
            id: data[index].id,
            status: val
          };
          console.info(param);
          param = JSON.stringify(param);
          console.info(_this.hostUrl + "/train/update");
          $.ajax({
            url: _this.hostUrl + "/train/update",
            type: "post",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: param,
            async: false,
            success: function(data) {
              if (data.backValue == true) {
                _this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                _this.listSearch(1);
              } else {
                _this.$message({
                  type: "error",
                  message: "操作失败!"
                });
              }
            },
            error: function(e) {
              console.info(e);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    },
    //新增
    add: function() {
      this.$router.push({ path: "/backstageMan/train_add" });
    },
    //跳转修改页面
    edit: function(item) {
      this.$router.push({
        path: "/backstageMan/train_edit",
        query: { id: item.id }
      });
    },
    //栏目节点点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    //过滤是否免费
    isFree: function(row, column) {
      return row.feeScale == "true"
        ? "收费"
        : row.feeScale == "false"
        ? "免费"
        : "未知";
    }
  },
  filters: {
    //过滤培训所属状态
    formatStatus: function(val) {
      return val == "0"
        ? "已启用"
        : val == "1"
        ? "草稿"
        : val == "2"
        ? "已停用"
        : "未知";
    }
  }
};
</script>

<style lang="less">
.el-tree {
  float: left !important;
}
.el-table th {
  background: #048992 !important;
  color: #fff !important;
}
.data {
  padding: 20px 10px;
  .tree {
    border: 1px solid #10a6b4;
    min-height: 400px;
    overflow: auto;
    .treeBar {
      background: #10a6b4;
      color: #fff;
      text-align: center;
      line-height: 45px;
    }
  }
  .dataMain {
    .search {
      min-height: 30px;
      line-height: 30px;
      .label {
        width: auto;
      }
      input {
        padding: 5px 10px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
      }
      .status {
        input {
          height: 30px !important;
        }
        .el-input__icon {
          line-height: 30px !important;
        }
      }
    }
    .oprate {
      min-height: 30px;
      line-height: 30px;
      margin: 12px 0px;
    }
    .btn {
      background: #048992;
      padding: 6px 30px;
      color: #fff;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
  }
}
</style>


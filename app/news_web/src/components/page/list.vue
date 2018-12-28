<template>
    <div>
        <!-- <headnav></headnav> -->
        <el-row class="main">
            <el-col :sm="4" class="slidebr">
                <div class="treeBar">栏目</div>
                <el-tree :default-expanded-keys="treeArr" ref="tree" node-key="id" accordion :data="columnData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col class="content" :offset="1" :sm="19">
                <el-row class="opreate">
                    <el-col :sm="3">
                        <el-button @click="newData()" class="newBtn" type="primary" icon="el-icon-circle-plus">新建</el-button>
                    </el-col>
                    <el-col :offset="10" :sm="8">
                        <input class="search" placeholder="请输入标题" v-model="newsname">
                    </el-col>
                    <el-col :sm="3">
                        <el-button @click="listSearch(1,true)" class="newBtn" type="primary" icon="el-icon-search">查询</el-button>
                    </el-col>
                </el-row>
                <div class="list">
                    <el-table :header-cell-style="{background:'#F5F5F5',color:'#464646',padding:'5px 0 5px 20px',overflow:'hidden'}" stripe :data="tableData" style="width: 100%" :cell-style="{padding:'0 0 0 20px',color:'#464646'}">
                        <el-table-column prop="newsTitle" label="标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="clname" label="所属栏目"></el-table-column>
                        <el-table-column prop="modifyTime" label="修改时间" sortable></el-table-column>
                        <el-table-column prop="status" label="状态" sortable>
                          <template slot-scope="scope_status">
                                <span v-if="scope_status.row.status=='0'" style="padding:0px 5px;color:#fff;background:#67C23A">{{ scope_status.row.status|formatStatus }}</span>
                                <span v-if="scope_status.row.status=='1'" style="padding:0px 5px;color:#fff;background:#909399">{{ scope_status.row.status|formatStatus }}</span>
                                <span v-if="scope_status.row.status=='2'" style="padding:0px 5px;color: #fff;background:#F56C6C">{{ scope_status.row.status|formatStatus}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" width="220">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text" size="small">
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
import headnav from "../../components/common/header.vue";
import { mapState, mapActions } from "vuex";
import pagination from "../common/pagination.vue";
import { columnGet } from "../../js/common.js";
import { postAjax } from "../../js/common.js"; //引入post交互方法
//import { columnData_test, newsList_test } from "../../js/testData.js"; //测试数据接入

export default {
  data() {
    return {
      newsname: "", //查询条件——新闻名称
      parentid: "", //查询条件——新闻所属栏目
      columnData: [],
      tableData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //分页组件中的基础值
      paginationData: {
        currentPage: 1,
        totalCount: 0,
        pages: 1
      }
    };
  },
  created() {},
  components: {
    pagination,
    headnav
  },
  computed: {
    ...mapState(["hostUrl","treeArr"])
  },
  mounted() {
    this.columnGet();
    this.parentid=this.treeArr.length>0?this.treeArr[0]:""
    this.listSearch(1); //初始化查询列表
    
  },
  methods: {
    ...mapActions(["stateChangae"]),//调用vuex的map方法
    //栏目节点点击事件
    handleNodeClick(data) {
      if (data.children.length>0) {
        // 不会触发事件
      } else {
        this.parentid=data.id;
        this.stateChangae({key:"treeArr",value:[this.parentid]});
        this.listSearch(1);
      }
    },
    //跳转新增页面
    newData: function() {
      this.$router.push({ path: "/new" });
    },
    //跳转修改页面
    edit: function(index,data) {
        console.info(data[index]);
      this.$router.push({ path: "/edit",query:{id:data[index].id}});
    },
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.listSearch(data);
    },
    //查询列表
    listSearch: function(num,PidInit) {
      let param = {
        pageCur: num,
        pageNum: 10,
        parentid: PidInit?"":this.parentid,
        userid: "",
        newsname: this.newsname
      };
      //console.info(param);
      let data = postAjax("/NewsDetail/newsSelectList", param);
      //console.info(data);
      this.tableData = data.backValue;
      this.paginationData={
            currentPage: num,
            totalCount: data.count,
            pages: Math.ceil(data.count/10)==0?1:Math.ceil(data.count/10)
        };
    },
    //删除新闻
    del: function(index, data) {
      let _this = this;
      this.$confirm(
        "此操作将永久删除”" + data[index].newsTitle + "“ 该条信息, 是否继续?",
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
            url: this.hostUrl + "/NewsDetail/newsDelete",
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
    //获取栏目数据
    columnGet: function() {
      this.columnData = columnGet();
    },
    //启用或者停用新闻
    statusChange: function(index, data, val) {
      let statusMsg = val=="0" ? "启用" : val == "2" ? "停用" : "未知";
      let _this = this;
      this.$confirm(
        "是否确定" + statusMsg + "”" + data[index].newsTitle + "“ 该条信息？",
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
          $.ajax({
            url: this.hostUrl + "/NewsDetail/newsUpdate",
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
    }
  },
  filters:{
    //过滤新闻所属状态
    formatStatus:function(val){
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

<style lang="less" scoped>
.main {
  background: #f8f8f8;
  .slidebr {
    background: #fff;
    float: left;
    border: 1px solid #10a6b4;
    .treeBar {
      color: #fff;
      background: #10a6b4;
      text-align: center;
      height: 35px;
      line-height: 35px;
    }
    .el-tree {
      padding: 10px 0px 20px 0px;
    }
  }
  .content {
    .opreate {
      .newBtn {
        padding: 8px 16px;
        border-radius: 0px;
        background: #10a6b4;
      }
      .search {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: 1em;
        height: 33px;
        line-height: 33px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color 0.2s
          cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
      }
      .search:focus {
        outline: none;
        border-color: #10a6b4;
      }
    }
    .list {
      margin-top: 20px;
    }
  }
}
</style>

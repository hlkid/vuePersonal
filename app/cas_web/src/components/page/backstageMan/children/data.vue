<template>
    <div class="data">
      资料管理——建设中
        <!-- <el-row>
            <el-col :sm="5" class="tree">
                <div class="treeBar">栏目数</div>
                <el-tree :default-expand-all=true :data="columnData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :offset="1" :sm="18" class="dataMain">
                <el-row class="search">
                    <el-col class="label">标题：</el-col>
                    <el-col :sm="5"><input v-model="search.title"/></el-col>
                    <el-col :offset="1" class="label">创建者：</el-col>
                    <el-col :sm="5"><input v-model="search.create"/></el-col>
                    <el-col :offset="2" :sm="4"><button @click="listSearch(1)" class="btn">查询</button></el-col>
                </el-row>
                <div class="oprate">
                    <button @click="add()" class="btn">新增</button>
                </div>
                <div class="list">
                    <el-table :header-cell-style="{background:'#F5F5F5',color:'#464646',padding:'5px 0 5px 20px'}" stripe :data="tableData" style="width: 100%" :cell-style="{padding:'0 0 0 20px',color:'#464646'}">
                    <el-table-column :show-overflow-tooltip="true" prop="title" label="标题"></el-table-column>
                    <el-table-column prop="cloumn" label="所属栏目"></el-table-column>
                    <el-table-column prop="create" label="创建者"></el-table-column>
                    <el-table-column width="120" prop="updatetime" label="修改时间"></el-table-column>
                    <el-table-column width="80" prop="status" label="状态"></el-table-column>
                    <el-table-column width="120" label="操作">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="edit(scope.$index, tableData)" type="text" size="small">
                            编辑
                            </el-button>
                            <el-button @click.native.prevent="del(scope.$index, tableData)" type="text" size="small">
                            删除
                            </el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                    <pagination></pagination>
                </div>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import pagination from "../../../common/pagination.vue";
import { toTreeData } from "../../../../js/common.js";
import { columnData_test, tableData_test } from "../../../../js/testData.js"; //测试数据接入

export default {
  data() {
    return {
      columnData: [],
      tableData: [],
      //查询条件
      search: {
        title: "",
        create: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.columnGet();
    this.tableData = tableData_test;
  },
  components: { pagination },
  methods: {
    //查询列表
    listSearch: function() {},
    //新增
    add: function() {},
    //获取栏目数据
    columnGet: function() {
      let data = [
        { id: "1", name: "标准服务", parentid: "0" },
        { id: "2", name: "技术服务", parentid: "0" },
        { id: "2_1", name: "体系服务", parentid: "2" },
        { id: "2_1_1", name: "农业标准体系建设", parentid: "2_1" },
        { id: "2_1_1_1", name: "农业标准体系编制相关材料", parentid: "2_1_1" },
        { id: "2_1_1_2", name: "搭建范本", parentid: "2_1_1" },
        { id: "2_1_2", name: "标准制修订", parentid: "2_1" },
        { id: "2_1_2_1", name: "标准制定编写的依据和质量", parentid: "2_1_2" }
      ];
      this.columnData = toTreeData(data);
    },
    //栏目节点点击事件
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="less">
.el-tree {
  float: left !important;
}
.el-table th{
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
      .label{
          width: auto;
      }
      input {
        padding: 5px 5%;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        width: 90%;
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


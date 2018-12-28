<template>
  <div class="role">
    <el-row class="opreate">
      <el-col :sm="3">
        <el-button @click="newData()" class="newBtn" type="primary" icon="el-icon-circle-plus">新建</el-button>
      </el-col>
      <el-col :offset="10" :sm="8">
        <input class="search" placeholder="请输入角色名称" v-model="rolename">
      </el-col>
      <el-col :sm="3">
        <el-button @click="listSearch(2)" class="newBtn" type="primary" icon="el-icon-search">查询</el-button>
      </el-col>
    </el-row>
    <div class="list">
      <el-table :header-cell-style="{background:'#F5F5F5',color:'#464646',padding:'5px 0 5px 20px'}" stripe :data="tableData" style="width: 100%" :cell-style="{padding:'0 0 0 20px',color:'#464646'}">
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="角色状态">
          <template slot-scope="scope_status" sortable>
            <span v-if="scope_status.row.status=='0'" style="padding:0px 5px;color:#fff;background:#67C23A">{{ scope_status.row.status|formatStatus }}</span>
            <span v-if="scope_status.row.status=='1'" style="padding:0px 5px;color:#fff;background:#F56C6C">{{ scope_status.row.status|formatStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click.native.prevent="allot(scope.$index, tableData)" type="text" size="small">
              编辑
            </el-button>
            <el-button v-if="tableData[scope.$index].status=='1'" @click.native.prevent="statusChange(scope.$index, tableData,'0')" type="text" size="small">
              启用
            </el-button>
            <el-button v-if="tableData[scope.$index].status=='0'" @click.native.prevent="statusChange(scope.$index, tableData,'1')" type="text" size="small">
              停用
            </el-button>
            <el-button @click.native.prevent="del(scope.$index, tableData)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
    </div>
    <el-dialog v-if="dialogVisible" title="角色维护" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form status-icon :rules="rules" :model="roleData" ref="roleData" labelWidth="140px" label-position="right">
        <el-form-item label="角色名称：" prop="rolename">
          <el-input type="text" v-model="roleData.rolename" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="配置模块：">
          <roleAdd ref="roleAdd" v-if="dialogVisible" :roleDefautCheck="roleDefautCheck"></roleAdd>
        </el-form-item>
        <el-form-item label="角色状态：">
          <el-checkbox v-model="roleStart">启用角色</el-checkbox>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState, mapActions } from "vuex";
import roleAdd from "../children/roleAdd.vue";
import pagination from "../common/pagination.vue";
import { moduleGet, postAjax } from "../../js/common.js";
import {
  columnData_test,
  newsList_test,
  roleList_test
} from "../../js/testData.js"; //测试数据接入

export default {
  data() {
    return {
      roleData: {
        roleid: "", //角色id修改时用
        rolename: "" //角色名称
      },
      rolename: "", //查询条件——角色名称
      roleStart: true, //角色启用
      roleDefautCheck: [], //默认分配的角色
      dialogVisible: false,
      action: "add", //新增OR修改——add/update
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
      },
      //表单校验
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {},
  components: {
    pagination,
    roleAdd
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.listSearch(1);
  },
  methods: {
    //跳转新增模态框
    newData: function() {
      this.roleData.rolename = "";
      this.roleData.roleid = "";
      this.roleStart = true; //新增默认启用角色
      this.action = "add"; //提交状态-新增
      this.dialogVisible = true; //开启模态框
      this.roleDefautCheck = [];
    },
    //权限分配
    allot: function(index, data) {
      this.roleData.roleid = data[index].id; //赋值角色id修改提交时用
      this.action = "update"; //提交状态-修改
      this.dialogVisible = true;
      let param = {
        id: data[index].id
      };
      let dataR = postAjax("/rolesmanage/select", param);
      let moduleList = dataR.rolesDto.moduleList; //所属模块
      this.roleDefautCheck = moduleList.map(function(item) {
        return item.id;
      });
      this.roleData.rolename = dataR.rolesDto.name;
      this.roleStart = dataR.rolesDto.status == "0" ? true : false;
      console.info(dataR.rolesDto.name);
    },
    //启用停用
    statusChange: function(index, data, status) {
      let statusMsg = status == "0" ? "启用" : status == "1" ? "停用" : "未知";
      let _this = this;
      this.$confirm(
        "是否确定" + statusMsg + "”" + data[index].name + "“该角色？",
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
            m_status:"2",//非详情修改(单独字段修改)——修改时需要
            status: status
          };
          console.info(param);
          param = JSON.stringify(param);
          $.ajax({
            url: this.hostUrl + "/rolesmanage/update",
            type: "post",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: param,
            async: false,
            success: function(data) {
              if (data.code == "1000") {
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
    //关闭弹出框页面
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.listSearch(data);
    },
    //查询列表
    listSearch: function(num) {
      let param = {
        pageCur: num,
        pageNum: 10,
        rolesName: this.rolename
      };
      console.info(param);
      let data = postAjax("/rolesmanage/list", param);
      console.info(data);
      this.tableData = data.roleslist;
      this.paginationData = {
        currentPage: num,
        totalCount: data.count,
        pages: Math.ceil(data.count / 10)
      };
    },
    //删除角色
    del: function(index, data) {
      let _this = this;
      this.$confirm(
        "此操作将永久删除”" + data[index].name + "“该角色, 是否继续?",
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
          console.info("22", param);
          param = JSON.stringify(param);
          $.ajax({
            url: this.hostUrl + "/rolesmanage/delete",
            type: "post",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: param,
            async: false,
            success: function(data) {
              console.info(data);
              if (data.code == "1000") {
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
    //提交信息
    submit: function() {
      this.$refs["roleData"].validate(valid => {
        if (valid) {
          let ModuleList = []; //传递给后台的模块列表
          let moudleIdArr = this.$refs.roleAdd.getModle();
          for (let i = 0; i < moudleIdArr.length; i++) {
            ModuleList.push({ moduleId: moudleIdArr[i] });
          }
          let param = {
            id: this.roleData.roleid,
            m_status:"1",//详情修改——修改时需要
            name: this.roleData.rolename,
            createUser: "admin",
            status: this.roleStart == true ? "0" : "1",
            relRoleModuleList: ModuleList
          };
          console.info(param);
          let data = postAjax("/rolesmanage/" + this.action, param);
          console.info(data);
          if (data.code == "1000") {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            this.dialogVisible = false;
            this.listSearch(1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  filters: {
    //过滤角色所属状态
    formatStatus: function(val) {
      return val == "0" ? "已启用" : val == "1" ? "已停用" : "未知";
    }
  }
};
</script>

<style lang="less">
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
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .search:focus {
    outline: none;
    border-color: #10a6b4;
  }
}
.el-dialog__body {
  padding: 10px 20px !important;
}
.role {
  .list {
    margin-top: 20px;
  }
}
.rowlist {
  line-height: 35px;
  margin: 8px 0px;
  .label {
    text-align: right;
  }
}
.el-dialog__header {
  padding: 10px 20px;
  .el-dialog__headerbtn {
    top: 10px;
  }
}
.el-input__inner {
  height: 35px;
  line-height: 35px;
}
</style>


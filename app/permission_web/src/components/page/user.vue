<template>
    <div class="user">
        <el-row class="opreate">
            <el-col :sm="3">
                <el-button @click="newData()" class="newBtn" type="primary" icon="el-icon-circle-plus">新建</el-button>
            </el-col>
            <el-col :offset="10" :sm="8">
                <input v-model="name" class="search" placeholder="请输入用户名称/账号">
            </el-col>
            <el-col :sm="3">
                <el-button @click="listSearch(1)" class="newBtn" type="primary" icon="el-icon-search">查询</el-button>
            </el-col>
        </el-row>
        <div class="list">
            <el-table :header-cell-style="{background:'#F5F5F5',color:'#464646',padding:'5px 0 5px 20px'}" stripe :data="tableData" style="width: 100%" :cell-style="{padding:'0 0 0 20px',color:'#464646'}">
                <el-table-column prop="personName" label="用户名称"></el-table-column>
                <el-table-column prop="userName" label="用户账号"></el-table-column>
                <el-table-column prop="status" label="用户状态">
                    <template slot-scope="scope_status" sortable>
                        <span v-if="scope_status.row.status=='0'" style="padding:0px 5px;color:#fff;background:#67C23A">{{ scope_status.row.status|formatStatus }}</span>
                        <span v-if="scope_status.row.status=='1'" style="padding:0px 5px;color:#fff;background:#F56C6C">{{ scope_status.row.status|formatStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280">
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
                        <el-button @click.native.prevent="passInit(scope.$index, tableData)" type="text" size="small">
                            重置密码
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination @listPagination="listPagination" :paginationData="paginationData"></pagination>
        </div>
        <!-- 模态框 -->
        <el-dialog v-if="dialogVisible" title="用户维护" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form status-icon :rules="rules" :model="userData" ref="userData" labelWidth="140px" label-position="right">
                <el-form-item label="用户名称：" prop="userCn">
                    <el-input type="text" v-model="userData.userCn" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="账号：" prop="username">
                    <el-input type="text" v-model="userData.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item v-if="visible" label="密码：" prop="password">
                    <el-input type="password" v-model="userData.password" placeholder="请输入密码">
                        <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
                <el-form-item v-else label="密码：" prop="password">
                    <el-input type="text" v-model="userData.password" placeholder="请输入密码">
                        <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="所属角色：">
                    <el-select filterable v-model="roleSelected" multiple placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态：">
                    <el-checkbox v-model="userStart">启用用户</el-checkbox>
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
import pagination from "../common/pagination.vue";
import { postAjax } from "../../js/common.js";

export default {
  data() {
    return {
      //用户新增修改信息
      userData: {
        userid: "", //用户id修改时用
        userCn: "",
        username: "",
        password: "",
        userStatus: ""
      },
      name: "", //查询条件——用户名称/账号
      action: "add", //新增OR修改——add/update
      visible: true, //显示隐藏密码
      dialogVisible: false,
      userStart: true, //启用用户
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
        userCn: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "change"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ]
      },
      options: [],
      roleSelected: []
    };
  },
  created() {},
  components: {
    pagination
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.roleListGet(); //查询角色列表
    this.listSearch(1); //查询列表
  },
  methods: {
    //显示隐藏密码
    changePass(value) {
      this.visible = !(value === "show");
    },
    //新增模态框
    newData: function() {
      this.userData.userCn = "";
      this.userData.username = "";
      this.userData.password = "";
      this.userStart = true; //新增默认启用角色
      this.roleSelected=[];
      this.dialogVisible = true;
      this.action = "add"; //提交状态-新增
    },
    //跳转修改页面
    edit: function() {
      this.dialogVisible = true;
    },
    //删除用户
    del: function(index, data) {
      let _this = this;
      this.$confirm(
        "此操作将永久删除”" + data[index].personName + "“该用户, 是否继续?",
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
            url: this.hostUrl + "/usermanage/delete",
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
    //查询角色列表
    roleListGet: function() {
      let param = {
        pageCur: 1,
        pageNum: 9999
      };
      console.info(param);
      let data = postAjax("/rolesmanage/list", param);
      //this.options=data
      console.info(data);
      this.options = data.roleslist;
    },
    //关闭弹出框页面
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //查询列表
    listSearch: function(num) {
      let param = {
        pageCur: num,
        pageNum: 10,
        username: this.name
      };
      console.info(param);
      let data = postAjax("/usermanage/list", param);
      console.info(data);
      this.tableData = data.userlist;
      this.paginationData = {
        currentPage: num,
        totalCount: data.count,
        pages: Math.ceil(data.count / 10)
      };
    },
    //启用停用
    statusChange: function(index, data, status) {
      let statusMsg = status == "0" ? "启用" : status == "1" ? "停用" : "未知";
      let _this = this;
      this.$confirm(
        "是否确定" + statusMsg + "”" + data[index].personName + "“该角色？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let param = {
            m_status:"2",//非详情修改(单独字段修改)——修改时需要
            loginUser:{
              id: data[index].id,
status: status
            }
          };
          console.info(param);
          param = JSON.stringify(param);
          $.ajax({
            url: this.hostUrl + "/usermanage/update",
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
    //重置密码
    passInit: function(index, data) {
      let _this = this;
      this.$confirm(
        "是否对" + data[index].personName + "“该用户重置密码，重置后登录密码为：123456？",
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
            password: "123456"
          };
          console.info(param);
          param = JSON.stringify(param);
          $.ajax({
            url: this.hostUrl + "/usermanage/update",
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
    //角色分配——编辑
    allot: function(index, data) {
      this.userData.userid = data[index].id; //赋值角色id修改提交时用
      this.action = "update"; //提交状态-修改
      this.dialogVisible = true;
      let param = {
        id: data[index].id
      };
      let dataR = postAjax("/usermanage/select", param);
      console.info(dataR);
      let roleList = dataR.userinfo.rolesList; //所属模块
      this.roleSelected = roleList.map(function(item) {
        return item.id;
      });
      this.userData.userCn=dataR.userinfo.loginUser.personName;
      this.userData.username=dataR.userinfo.loginUser.userName;
      this.userData.password=dataR.userinfo.loginUser.password;
      this.userData.userStatus=dataR.userinfo.loginUser.status == "0" ? true :dataR.userinfo.loginUser.status == "1" ? false:"";
    },
    //监听分页组件中的事件——传递的值
    listPagination: function(data) {
      this.listSearch(data);
    },
    //提交信息
    submit: function() {
      this.$refs.userData.validate(valid => {
        if (valid) {
          let roleSelected = this.roleSelected.map(function(item) {
            return {
              roleId: item
            };
          });
          let param = {
            m_status:"1",//详情修改——修改时需要
            basicUser:{},
            loginUser:{
              id: this.userData.userid,
              userName: this.userData.username,
              password: this.userData.password,
              personName: this.userData.userCn,
              //createUser: "admin",
              status: this.userStart == true ? "0" : "1",
            },
            relUserRoleList: roleSelected
          };
          console.info(param);
          let data = postAjax("/usermanage/" + this.action, param);
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
    //过滤用户所属状态
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
.user {
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
.el-select {
  width: 100%;
}
</style>


<template>
  <div class="register">
    <el-row class="titleMsg">
      <el-col :sm="24">国家农业标准化信息公共服务与推广平台</el-col>
    </el-row>
    <el-row class="formBox">
      <el-col :offset="9" :sm="6" class="form">
        <img class="logo" src="../../assets/logo.png" />
        <el-col class="routeLink" :sm="12"><a @click="toLogin()">账号登录</a></el-col>
        <el-col class="routeLink" :sm="12"><a style="color:#45B97A">账号注册</a></el-col>
        <el-col :sm="22" class="formDetail">
          <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="25px">
            <el-form-item label="" prop="userCn">
              <el-input placeholder="请输入昵称" v-model="formData.userCn" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="user">
              <el-input @blur="checkUser()" placeholder="请输入账号" v-model="formData.user" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="" prop="email">
                            <el-input placeholder="请输入邮箱,用户找回邮箱" v-model="formData.email" clearable></el-input>
                        </el-form-item> -->
            <el-form-item label="" prop="pass">
              <el-input placeholder="请输入密码" type="password" v-model="formData.pass" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
              <el-input placeholder="请重复密码" type="password" v-model="formData.checkPass" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:10px">
              <el-button class="btn" type="info" @click="register('formData')">注册</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="btn" type="success" @click="toLogin()">已有账号，立即登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from "jquery";
import { postAjax,setCookie } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";

export default {
  data() {
    var pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formData.checkPass !== "") {
          this.$refs.formData.validateField("checkPass");
        }
        callback();
      }
    };
    var passRe = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        userCn: "", //昵称
        user: "",
        email: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        userCn: [
          { required: true, message: "请输入昵称(用户名称)", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址，便于找回密码",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        pass: [{ validator: pass, trigger: "blur" }],
        checkPass: [{ validator: passRe, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["permison_url", "ifLogin", "loginCn", "loginPower"])
  },
  methods: {
    ...mapActions(["stateChangae"]),
    //跳转登录页面
    toLogin: function() {
      this.$router.push({ path: "/login" });
    },
    //验证用户是否存在
    checkUser: function() {
      let param = {
        userName: this.formData.user
      };
      console.info(param);
      let data = postAjax(this.permison_url + "/usermanage/namecheck", param);
      //console.info(data);
      if (data.code != "1000") {
        this.$message({
          type: "info",
          message: "该用户已存在请重新输入!"
        });
        this.formData.user = "";
      }
    },
    //注册
    register: function(formData) {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let param = {
            m_status:"1",//详情修改——修改时需要
            basicUser:{},
            loginUser:{
              userName: this.formData.user,
              password: this.formData.pass,
              personName: this.formData.userCn,
              status: "0"
            },
            relUserRoleList: []
          };
          console.info(param);
          let data = postAjax(this.permison_url + "/usermanage/add", param);
          if ((data.code = "1000")) {
            let data = postAjax(this.permison_url + "/usermanage/login", {
              userName: this.formData.user,
              password: this.formData.pass
            });
            console.info(data);
            if (data.code == "1000") {
              this.$confirm("注册成功，请前往个人中心，进行信息完善", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "以后再说",
                type: "warning"
              })
                .then(() => {
                  this.$router.replace({ path: "/userCen/account" });
                })
                .catch(() => {
                  this.$router.replace({ path: "/" });
                });
              setCookie("userid", data.modulelist[0].id, 24 * 1000 * 60 * 60);
            } else if (data.code == "3005") {
              this.$message({
                type: "error",
                message: "该用户被禁用请联系管理员!"
              });
            } else {
              this.$message({
                type: "info",
                message: "用户名密码错误!"
              });
            }
          } else {
            console.info(data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #78dda5;
  min-height: 650px;
  .el-form-item {
    margin-bottom: 20px;
    .btn {
      width: 100%;
      padding: 10px 0px;
    }
  }
  .el-form-item__content {
    line-height: 35px;
  }
  .el-input__inner {
    height: 35px;
    border-radius: 0px !important;
    border: none !important;
    border-bottom: 1px solid #ccc !important;
  }
  .titleMsg {
    text-align: center;
    line-height: 100px;
    margin-top: 30px;
    color: #fff;
    font-size: 28px;
  }
  .formBox {
    margin-top: 10px;
    .logo {
      position: absolute;
      width: 50%;
      height: 40px;
      left: 25%;
      top: -20px;
    }
    .form {
      background: #fff;
      position: relative;
      box-shadow: 0px 0px 8px #9c9c9c;
      border-radius: 5px;
      position: absolute;
      padding: 0px 1%;
      .routeLink {
        text-align: center;
        margin-top: 35px;
        a {
          text-decoration: none;
          color: #9c9c9c;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
          color: #45b97a;
        }
      }
    }
    .formDetail {
      margin-top: 25px;
    }
  }
}
</style>

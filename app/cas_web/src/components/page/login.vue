<template>
  <div class="login">
    <el-row class="titleMsg">
      <el-col :sm="24">国家农业标准化信息公共服务与推广平台</el-col>
    </el-row>
    <el-row class="formBox">
      <el-col :offset="9" :sm="6" class="form">
        <img class="logo" src="../../assets/logo.png" />
        <el-col class="routeLink" :sm="12"><a style="color:#45B97A">账号登录</a></el-col>
        <el-col class="routeLink" :sm="12"><a @click="toRegister()">账号注册</a></el-col>
        <el-col :sm="22" class="formDetail">
          <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="25px">
            <el-form-item label="" prop="user">
              <el-input placeholder="请输入用户名" v-model="formData.user" clearable></el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
              <el-input placeholder="请输入密码" type="password" v-model="formData.pass" autocomplete="off" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item class="forgetPass">
              <a>忘记密码</a>
            </el-form-item> -->
            <el-form-item>
              <el-button class="btn" type="info" @click="login(formData)">登录</el-button>
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
    return {
      formData: {
        user: "",
        pass: ""
      },
      rules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["permison_url"])
  },
  methods: {
    //跳转注册页面
    toRegister: function() {
      this.$router.push({ path: "/register" });
    },
    //登录
    login: function(formData) {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let param={
            userName:this.formData.user,
            password:this.formData.pass
          }
          console.info(param);
          let data = postAjax(this.permison_url+"/usermanage/login", param);
          console.info(data);
          if(data.code=="1000"){
            this.$message({
              type: "success",
              message: "登录成功!"
            });
            setCookie("userid",data.modulelist[0].id,24*1000*60*60);
            this.$router.push({path:"/"});
          }else if(data.code=="3005"){
            this.$message({
              type: "error",
              message: "该用户被禁用请联系管理员!"
            });
          }else{
            this.$message({
              type: "info",
              message: "用户名密码错误!"
            });
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

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #78dda5;
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
      .forgetPass {
        text-align: right;
        a {
          color: #9c9c9c;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
          color: #45b97a;
        }
      }
    }
  }
}
</style>

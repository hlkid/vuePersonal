<template>
    <div class="serviceOnline">
        <el-form :model="formData" status-icon :rules="rules" ref="formData" label-width="100px">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="phone">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="mail">
                <el-input v-model="formData.mail"></el-input>
            </el-form-item>
            <el-form-item label="单位：" prop="unit">
                <el-input v-model="formData.unit"></el-input>
            </el-form-item>
            <el-form-item label="需求：" prop="needs">
                <el-input type="textarea" v-model="formData.needs"></el-input>
            </el-form-item>
            <el-form-item label="">
                <span @click="upload" class="attUpload">上传附件</span>
                <input @change="addAtt" ref="attFile" id="attFile" type="file">
                <span class="attuploaded" v-show="formData.att!==''">已上传的附件：{{formData.att.name}}<a @click="delAtt" class="delAtt">删除</a></span>
            </el-form-item>
            <el-form-item label="验证码：" prop="verification">
                <input class="verifInput" v-model="formData.verification"/><span @click="createCode" class="verification">{{checkCode}}</span>
            </el-form-item>
            <el-form-item style="text-align:center;margin-top:25px;">
                <el-button class="btn" type="button" @click="submitForm('formData')">提交</el-button>
                <el-button class="btn" type="button" @click="resetForm('formData')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        mail: "",
        unit: "",
        needs: "",
        att: "",
        verification: ""
      },
      //验证码数据
      code:"",
      checkCode:"",
      //表单校验
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        mail: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        needs: [{ required: true, message: "请输入需求", trigger: "blur" }]
      }
    };
  },
  mounted(){
      this.createCode();
  },
  methods: {
    // 图片验证码
    createCode() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 10);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },
    //提交信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.formData.verification!=this.checkCode){
            alert("验证码错误");
            this.createCode();//重置验证码
          }else{
            alert("submit!");
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置信息
    resetForm(formName) {
      this.formData.att = "";
      this.$refs[formName].resetFields();
    },
    //点击上传附件按钮
    upload() {
      $("#attFile").click();
    },
    //上传附件
    addAtt: function() {
      let inputDOM = this.$refs.attFile;
      this.fil = inputDOM.files;
      this.formData.att = this.fil[0];
      console.info(this.formData.att);
    },
    //删除附件
    delAtt:function(){
      this.formData.att="";
    }
  }
};
</script>

<style lang="less" scoped>
.serviceOnline {
  margin: 20px 12%;
  .el-form-item {
    .verification{
        width: 100px;
        margin-left: 30px;
        background: #EBEBEB;
        cursor: pointer;
        color: #45b97a;
        padding: 5px 15px;
        letter-spacing:5px;
    }
    .verifInput{
        line-height: 26px;
        padding: 0px 10px;
        width: 80px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    .btn{
      background: #45b97a;
      border-radius: 4px;
      border:1px solid #1A9B55;
      padding: 8px 28px;
      color: #fff;
      cursor: pointer;
    }
    .delAtt{
      margin-left: 15px;
      cursor: pointer;
    }
    .delAtt:hover{
      color: #45b97a;
      text-decoration: underline;
    }
  }
  #attFile {
    display: none;
  }
  .attuploaded {
    float: left;
    width: 100%;
  }
  .attUpload {
    padding: 6px 12px;
    border: 1px solid #45b97a;
    color: #45b97a;
    cursor: pointer;
  }
  .attUpload:hover {
    background: #45b97a;
    color: #fff;
  }
}
</style>


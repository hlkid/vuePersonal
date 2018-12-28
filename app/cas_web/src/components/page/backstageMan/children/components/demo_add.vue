<template>
  <div>
    <el-row>
      <el-col :offset="1" :sm="22" class="demoAdd">
        <p class="title"><a @click="back"><i class="el-icon-back"></i>返回</a> 添加示范区信息</p>
        <div class="oprate">
          <el-button @click="submit('0')" class="oprateBtn" type="success" icon="el-icon-check">保存并启用</el-button>
          <el-button @click="submit('1')" class="oprateBtn" type="info" icon="el-icon-document">保存</el-button>
        </div>
        <el-form ref="demoData" :model="demoData" label-width="100px" :rules="rules">
          <el-form-item prop="num" label="编号">
            <el-input v-model="demoData.num"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="名称">
            <el-input v-model="demoData.name"></el-input>
          </el-form-item>
          <el-form-item label="所在省市：" prop="area">
          <el-input v-model="demoData.area"></el-input>
        </el-form-item>
          <el-form-item prop="lv" label="级别">
            <el-input v-model="demoData.lv"></el-input>
          </el-form-item>
          <el-form-item prop="des" label="简介">
            <el-input :rows="7" type="textarea" v-model="demoData.des"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  postAjaxAtt,
  postAjax,
  removeAaary,
  toTreeDataArea,
  userData
} from "../../../../../js/common.js"; //引入post交互方法
import $ from "jquery";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      //城市选择
      areaOptions: [],
      demoData: {
        num:"",
        name: "", //课程名称
        area:"",
        lv:"",
        des:""
      },
      //表单校验
      rules: {
        name: [
          { required: true, message: "请输入示范区名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        num: [
          { required: true, message: "请输入示范区编号", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
      }
    };
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted(){
  
  },
  methods: {
    //返回
    back:function(){
      this.$router.replace({path:"/backstageMan/demoarea",query:{id:"demo"}});
    },
    //提交信息
    submit: function(status) {
      this.$refs["demoData"].validate(valid => {
        if (valid) {
          let param = {
            number: this.demoData.num, //编号
            name: this.demoData.name, //名称
            region: this.demoData.area, //城市
            grade: this.demoData.lv, //级别
            summary:this.demoData.des,//简介
            status:status,//状态
            createUser:userData().userinfo.loginUser.userName//创建者
            };
          console.info(param);
          let data = postAjax(this.hostUrl + "/demoArea/add", param);
          if (data.backValue == true) {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            this.back();
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
.demoAdd {
  padding: 0px 2%;
  margin: 15px 5%;
  width: 90%;
  background: #fff;
  .el-form{
    width: 100%;
    float: left;
  }
  .title {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    a {
      float: left;
      cursor: pointer;
    }
    a:hover {
      color: #10a6b4;
    }
  }
  .oprate {
    margin-top: 20px;
    float: left;
    width: 100%;
    .oprateBtn {
      float: right;
      padding: 8px 15px;
      margin-left: 20px;
      margin-bottom: 20px;
    }
  }
  .label {
    width: 100%;
    line-height: 35px;
    padding: 10px 0px;
    font-weight: bold;
  }
  .coverImg {
    float: left;
    width: 20%;
  }
  .delImg {
    float: left;
    cursor: pointer;
    margin-left: 5%;
  }
  .delImg:hover {
    color: #10a6b4;
  }
  .courseItem {
    margin-top: 12px;
    width: 100%;
    float: left;
    .videoUpload {
      width: 100%;
      float: left;
      line-height: 26px;
      button,
      input,
      a,
      b {
        float: left;
        margin-right: 1%;
      }
      button {
        padding: 6px 12px;
      }
      a {
        margin-left: 1%;
        max-width: 20%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .summary {
      margin-top: 8px;
      width: 80%;
      float: left;
    }
    .courseDel {
      float: left;
      margin-left: 15px;
      margin-top: 8px;
      padding: 8px;
    }
  }
  .attList {
    width: 100%;
    float: left;
    a {
      cursor: pointer;
    }
    a:hover {
      color: #10a6b4;
    }
    button {
      margin-left: 15px;
    }
  }
  .progress {
    width: 60%;
    float: left;
    margin-top: 6px;
    margin-left: 1%;
  }
}
</style>


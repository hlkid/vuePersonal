<template>
  <el-tabs type="border-card">
    <el-tab-pane label="个人信息">
      <p v-if="updateFlag==true" class="updateBtn"><a @click="updateFlag=false">点击修改</a></p>
      <el-form :model="formDataPersonal" status-icon :rules="rules" ref="formDataPersonal" label-width="100px">
        <el-form-item label="账号：" prop="user">
          <el-input :disabled="true" placeholder="昵称" v-model="formDataPersonal.user"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="name">
          <el-input :disabled="updateFlag" placeholder="请输入昵称" v-model="formDataPersonal.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass">
          <el-input :disabled="updateFlag" placeholder="请输入密码" type="password" v-model="formDataPersonal.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input :disabled="updateFlag" placeholder="请输入邮箱" v-model="formDataPersonal.email"></el-input>
        </el-form-item>
        <el-form-item label="城市：" prop="area">
          <el-cascader :disabled="updateFlag" style="width:100%" :options="areaOptions" v-model="formDataPersonal.area" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select :disabled="updateFlag" style="width:100%" v-model="formDataPersonal.sex" placeholder="请选择" clearable>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码：" prop="telephone">
          <el-input style="color:#000" :disabled="updateFlag" placeholder="请输入手机号码" type="text" v-model="formDataPersonal.telephone" clearable></el-input>
        </el-form-item>
        <el-form-item label="生日：" prop="birthday">
          <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" :disabled="updateFlag" style="width:100%" v-model="formDataPersonal.birthday" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="行业：" prop="industry">
          <el-input :disabled="updateFlag" placeholder="请输入行业" type="text" v-model="formDataPersonal.industry" clearable></el-input>
        </el-form-item>
        <el-form-item label="职业：" prop="occupation">
          <el-input :disabled="updateFlag" placeholder="请输入职业" type="text" v-model="formDataPersonal.occupation" clearable></el-input>
        </el-form-item>
        <el-form-item v-if="updateFlag==false">
          <el-button type="primary" @click="updatePersonal(formDataPersonal)">确认修改</el-button>
          <el-button type="info" @click="updateGiveup">放弃修改</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import $ from "jquery";
import { getCookie,postAjax,dateToString,toTreeDataArea } from "../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          callback();
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
     return {
      //城市选择
      areaOptions: [
        {
          value: "ah",
          label: "安徽",
          children: [
            {
              value: "hf",
              label: "合肥"
            },
            {
              value: "wh",
              label: "芜湖"
            },
            {
              value: "mas",
              label: "马鞍山"
            }
          ]
        },
        {
          value: "zj",
          label: "浙江",
          children: [
            {
              value: "hz",
              label: "杭州"
            },
            {
              value: "nb",
              label: "宁波"
            }
          ]
        },
        {
          value: "bj",
          label: "北京"
        },
        {
          value: "sh",
          label: "上海"
        },
        {
          value: "gz",
          label: "广州"
        }
      ],
      updateFlag: true, //是否禁用修改个人信息
      //个人信息资料
      formDataPersonal: {
        id:"",
        parentid:"",
        user: "user", //账号
        name: "", //昵称
        email: "", //邮箱
        pass: "", //密码
        name: "", //姓名
        area: ["gz"], //城市
        sex: "", //性别
        birthday: "", //生日
        telephone:"",//手机号码
        industry: "", //行业
        occupation: "" //职业
      },
      rules: {
        telephone:[
            {validator: checkPhone, trigger: 'blur'}],
        name:[
          { required: true, message: "请输入昵称(用户名称)", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        pass: [{ required: true, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["permison_url","hostUrl"])
  },
  mounted(){
    this.initData();
    this.areaInit();
  },
  methods: {
    //初始化地市信息
    areaInit:function(){
      let data = postAjax(this.hostUrl+"/area/tree", {});
      console.info(data);
      if(data.arealist.length>0){
        this.areaOptions=toTreeDataArea(data.arealist)
        console.info(this.areaOptions);
      }
      
    },
    //初始化信息
    initData:function(){
      let userid=getCookie("userid");
        if(userid){
          let param={
              id:userid,
            }
            let data = postAjax(this.permison_url+"/usermanage/select", param);
             console.info(data);
             let loginUser=data.userinfo.loginUser;
             let basicUser=data.userinfo.basicUser;
             //整理地市信息
             let areaMsg=[];
             if(basicUser.region!=null){
               if(basicUser.region.length==13){
                 areaMsg=[basicUser.region.split("|")[0],basicUser.region.split("|")[1]]
               }else if(basicUser.region.length==6){
                areaMsg=[basicUser.region]
               }
             }
             this.formDataPersonal={
              id:basicUser.id==null?"":basicUser.id,
              parentid:basicUser.parentid==null?"":basicUser.parentid,
              user: loginUser.userName, //账号
              name: loginUser.personName, //昵称
              pass: loginUser.password, //密码
              checkPass: "", //修改密码
              email: basicUser.email==null?"":basicUser.email, //邮箱
              telephone: basicUser.telephone==null?"":basicUser.telephone, //手机号
              area: areaMsg, //城市
              sex: basicUser.sex==null?"":basicUser.sex, //性别
              birthday: basicUser.birthday==null?"":basicUser.birthday, //生日
              industry: basicUser.trade==null?"":basicUser.trade, //行业
              occupation: basicUser.profession==null?"":basicUser.profession //职业
            }
        }else{
        }
    },
    //确认修改个人信息
    updatePersonal: function(formDataPersonal) {
      this.$refs.formDataPersonal.validate(valid => {
        if (valid) {
          let param = {
            m_status:"1",//详情修改——修改时需要1
            basicUser:{
              id:this.formDataPersonal.id,
              parentid:this.formDataPersonal.parentid,
              region:this.formDataPersonal.area.length==1?this.formDataPersonal.area[0]:this.formDataPersonal.area.length==2?this.formDataPersonal.area[0]+"|"+this.formDataPersonal.area[1]:"",
              sex:this.formDataPersonal.sex,
              birthday:this.formDataPersonal.birthday,
              trade:this.formDataPersonal.industry,
              profession:this.formDataPersonal.occupation,
              telephone:this.formDataPersonal.telephone,
              email:this.formDataPersonal.email,
            },
            loginUser:{
              id:this.formDataPersonal.parentid,
              userName: this.formDataPersonal.user,
              password: this.formDataPersonal.pass,
              personName: this.formDataPersonal.name,
              status: "0"
            },
          };
          console.info(param);
          let data = postAjax(this.permison_url + "/usermanage/update", param);
            console.info(data);
            if(data.code=="1000"){
              this.$message({
              type: "success",
              message: "修改成功!"
            });
              this.updateFlag=true;
              this.initData();
            }
            
            
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //放弃修改
    updateGiveup:function(){
      this.updateFlag=true;
      this.initData();
    }
  }
};
</script>

<style lang="less">
.updateBtn {
  text-align: right;
  margin: 6px 0px;
  padding-right: 16px;
  a {
    font-size: 15px;
    cursor: pointer;
  }
  a:hover {
    color: #45b97a;
  }
}
.el-input.is-disabled .el-input__inner{
  color: #606266;
}
.el-cascader.is-disabled .el-cascader__label{
  color: #606266
}
</style>


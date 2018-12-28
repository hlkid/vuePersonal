<template>
  <div>
    <el-row>
      <el-col :offset="1" :sm="22" class="casemangeAdd">
        <p class="title"><a @click="back"><i class="el-icon-back"></i>返回</a> 添加案例管理</p>
        <div class="oprate">
          <el-button @click="submit('0')" class="oprateBtn" type="success" icon="el-icon-check">保存并启用</el-button>
          <el-button @click="submit('1')" class="oprateBtn" type="info" icon="el-icon-document">保存</el-button>
        </div>
        <el-form style="width:100%;float:left" ref="casemangeData" :model="casemangeData" label-width="150px" :rules="rules">
          <el-form-item prop="survey" label="名称：">
            <el-input placeholder="请输入案例名称" v-model="casemangeData.survey"></el-input>
          </el-form-item>
          <el-form-item label="概况：">
            <el-input placeholder="概况填写" :rows="6" type="textarea" v-model="casemangeData.reserved1"></el-input>
          </el-form-item>
          <el-form-item label="标准体系框架：">
            <el-input placeholder="标准体系框架填写" :rows="6" type="textarea" v-model="casemangeData.frame"></el-input>
          </el-form-item>
          <el-form-item label="封面图：">
            <div>图片格式为：JPEG/PNG/GIF，大小不超过5M，只限上传1张</div>
            <div>
              <button type="button" v-if="casemangeData.coverImg==''" @click="coverImgAtt">选择封面图</button>
              <input v-if="casemangeData.coverImg==''" style="display:none" id="coverImgFile" type="file" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg" />
            </div>
            <img v-if="casemangeData.coverImg!=''" class="coverImg" :src="hostUrl+'/'+casemangeData.coverImg">
            <a class="delImg" v-show="casemangeData.coverImg!=''" @click="delImg()">删除图片</a>
          </el-form-item>
          <el-form-item label="重要标准目录：">
            <div v-if="submitAtt.standardList.length!=0">
              <div>已提交的标准目录：</div>
              <div v-for="(item,index) in submitAtt.standardList" :key="index">
                名称：{{item.name}}，编号：{{item.number}}，文件:<a class="attPre" @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item,'sta')" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div style="width:100%;float:left" v-loading="courseLoading" element-loading-text="正在上传，请不要操作当前页面，以免文件丢失" element-loading-spinner="el-icon-loading" element-loading-background="rgba(226,226,226,0.2)">
              <div class="courseItem" v-for="(item,index) in casemangeData.standardList" :key="index">
                <div class="videoUpload">
                  <el-button type="button" @click="staListAtt(index)">上传标准文本</el-button>
                  <input style="display:none" :id="'staListFile'+index" type="file" @change="addstaListFile(index)" :ref="'staListFile'+index" accept="application/pdf" />
                  <b v-if="item.file.realnmae==''">请上传文本（支持100M以内pdf格式的文件）</b>
                  <a :title="item.file.realnmae">{{item.file.realnmae}}</a>
                  <el-progress class="progress" :id="'progress'+index" v-if="item.file.realnmae!=''&&item.percentage!=100" :percentage="item.percentage"></el-progress>
                  <el-progress class="progress" v-if="item.percentage==100" :percentage="100" status="success"></el-progress>
                </div>
                <el-input @blur="staListChange_number($event,item,index)" autosize class="summary" placeholder="请输入标准文本编号">{{item.number}}</el-input>
                <el-input @blur="staListChange_name($event,item,index)" autosize class="summary" placeholder="请输入标准文本名称">{{item.name}}</el-input>
                <el-button class="courseDel" @click="staListDel(index)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
              <el-button style="margin-top:8px;padding:8px;float:left" @click="staListAdd" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
          </el-form-item>
          <el-form-item label="建设经验：">
            <el-input placeholder="建设经验填写" :rows="6" type="textarea" v-model="casemangeData.buildExperience"></el-input>
          </el-form-item>
          <el-form-item label="推广经验：">
            <el-input placeholder="推广经验填写" :rows="6" type="textarea" v-model="casemangeData.spreadExperience"></el-input>
          </el-form-item>

          <el-form-item label="建设成效：">
            <el-input placeholder="建设成效填写" :rows="6" type="textarea" v-model="casemangeData.buildResult"></el-input>
            <div>视屏添加：</div>
            <div v-if="submitAtt.course.length!=0">
              <div>已提交的视屏：</div>
              <div v-for="(item,index) in submitAtt.course" :key="index">
                名称：{{item.realnmae}}。描述：{{item.summary}}
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div style="width:100%;float:left" v-loading="courseLoading" element-loading-text="正在上传，请不要操作当前页面，以免文件丢失" element-loading-spinner="el-icon-loading" element-loading-background="rgba(226,226,226,0.2)">
              <div class="courseItem" v-for="(item,index) in casemangeData.course" :key="index">
                <div class="videoUpload">
                  <el-button type="button" @click="courseAtt(index)">上传视频</el-button>
                  <input style="display:none" :id="'courseFile'+index" type="file" @change="addcourseFile(index)" :ref="'courseFile'+index" accept="video/mp4" />
                  <b v-if="item.file.realnmae==''">请上传视频（仅支持1GB以内MP4格式的视屏文件）</b>
                  <a :title="item.file.realnmae">{{item.file.realnmae}}</a>
                  <el-progress class="progress" :id="'progress'+index" v-if="item.file.realnmae!=''&&item.percentage!=100" :percentage="item.percentage"></el-progress>
                  <el-progress class="progress" v-if="item.percentage==100" :percentage="100" status="success"></el-progress>
                </div>
                <el-input @blur="courseChange($event,item,index)" autosize class="summary" type="textarea" placeholder="请输入视屏描述">{{item.summary}}</el-input>
                <el-button class="courseDel" @click="courseDel(index)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
              <el-button style="margin-top:8px;padding:8px;float:left" @click="courseAdd" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
            <div>相册展示：
              <div v-if="submitAtt.atts.length!=0">
              <div>已提交的相册：</div>
              <div v-for="(item,index) in submitAtt.atts" :key="index">
                <a class="attPre" @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
              <span class="attList" v-for='(item, index) in casemangeData.atts' :key="index">
                <a @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAtt(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </span>
            </div>
            <div style="width:100%;float:left">
              <el-button title="添加附件" style="margin-top:8px;padding:8px" @click="attBtn" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
            <input accept="image/png,image/jpeg,image/gif,image/jpg" style="display:none" multiple="multiple" id="attFile" type="file" @change="addAtt" ref="attFile" />
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
  userData
} from "../../../../../js/common.js"; //引入post交互方法
import $ from "jquery";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      courseLoading: false, //视屏上传是loading
      progressName: "", //进度条的名称(当前进度条属于哪个附件)
      casemangeData: {
        id:"",//修改时的ID
        survey: "", //课程名称
        reserved1: "", //概况
        coverImg: "", //封面图
        frame: "", //体系框架
        buildExperience: "", //建设经验
        spreadExperience: "", //推广经验
        buildResult: "", //建设结果
        standardList: [], //添加的标准文本
        course: [], //添加的视屏
        atts: [] //添加的相册
      },
      submitAtt: {
        //已经上传的附件
        standardList: [], //标准列表
        course: [], //添加的视屏
        atts: [] //添加的相册合集
      },
      processIndex: 0, //进度条index
      //表单校验
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ]
      },
      atts: {},
      attlist: [], //所有附件
      attFileDelList: [], //待删除的附件列表
      standardDelList:[],//待删除的标准列表
    };
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.dataInit();
  },
  methods: {
    //初始化数据
    dataInit(){
    let param = {
        id: this.$route.query.id
      };
      this.casemangeData.id = this.$route.query.id;
      let data = postAjax(this.hostUrl + "/classicCase/select", param)
        .backValue;
      console.info(data);
      this.casemangeData.survey = data.classicCase.survey;
      this.casemangeData.reserved1 = data.classicCase.reserved1;
      this.casemangeData.coverImg = data.classicCase.photoPath=="0"?"":data.classicCase.photoPath;
      this.casemangeData.frame = data.classicCase.frame;
      this.casemangeData.buildExperience = data.classicCase.buildExperience;
      this.casemangeData.spreadExperience = data.classicCase.spreadExperience;
      this.casemangeData.buildResult = data.classicCase.buildResult;
      this.submitAtt.standardList = data.standardList;
      let _this = this;
      data.attList.map(function(item) {
        if (item.type == "1") {
          _this.submitAtt.course.push(item);
        } else if (item.type == "2") {
          _this.submitAtt.atts.push(item);
        }
      });
    },
    //返回
    back: function() {
      this.$router.replace({
        path: "/backstageMan/demoarea",
        query: { id: "casemange" }
      });
    },
    //触发封面图片上传按钮
    coverImgAtt: function() {
      $("#coverImgFile").click();
    },
    //添加封面图片
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      this.fil = inputDOM.files;
      let size = Math.floor(this.fil[0].size / 1024);
      if (size > 5 * 1024) {
        alert("请选择5M以内的图片！");
        return false;
      }
      this.imgFile = this.fil[0];
      console.info(this.imgFile);
      this.attUpload(this.imgFile, false, "coverImg");
    },
    //删除上传的封面图
    delImg() {
      let param = { id: null, path: this.casemangeData.coverImg };
      let data = postAjax(this.hostUrl + "/att/delete", param);
      if (data.backValue == true) {
        this.casemangeData.coverImg = "";
        this.$message({
          type: "success",
          message: "已删除封面图!"
        });
      }
    },
    //添加标准文本
    staListAdd: function() {
      this.casemangeData.standardList.push({
        id: "",
        percentage: 0, //上传进度
        number: "",
        name: "",
        file: { realnmae: "" }
      });
    },
    //添加视屏
    courseAdd: function() {
      this.casemangeData.course.push({
        id: "",
        percentage: 0, //上传进度
        summary: "",
        file: { realnmae: "" }
      });
    },
    //添加标准文本后的描述信息改变时事件-名称
    staListChange_name: function(e, item, index) {
      this.casemangeData.standardList[index].name = e.target.value;
    },
    //添加标准文本后的描述信息改变时事件-编号
    staListChange_number: function(e, item, index) {
      this.casemangeData.standardList[index].number = e.target.value;
    },
    //添加视频后的描述信息改变时事件
    courseChange: function(e, item, index) {
      this.casemangeData.course[index].summary = e.target.value;
    },
    //删除标准文本
    staListDel: function(index) {
      if (index !== -1) {
        this.casemangeData.standardList.splice(index, 1);
      }
    },
    //删除视屏
    courseDel: function(index) {
      if (index !== -1) {
        this.casemangeData.course.splice(index, 1);
      }
    },
    //触发附件上传按钮——标准文本
    staListAtt: function(index) {
      $("#staListFile" + index).click();
    },
    //触发附件上传按钮——培训课程
    courseAtt: function(index) {
      $("#courseFile" + index).click();
    },
    //添加附件——标准文本
    addstaListFile: function(index) {
      let _this = this;
      this.processIndex = index;
      let inputDOM = this.$refs["staListFile" + index];
      this.fil = inputDOM[0].files;
      let size = Math.floor(this.fil[0].size / 1024);
      if (size > 500 * 1024) {
        alert("请选择500M以内的视屏！");
        return false;
      }
      this.casemangeData.standardList[index].file = this.fil;
      console.info(this.casemangeData);
      //this.attUpload(this.fil[0], false, "course", index);
      let formData = new FormData();
      formData.append("fileList", this.fil[0]);

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", this.hostUrl + "/att/upload", true);
      xhr.onload = function() {
        let dataJson = eval("(" + xhr.responseText + ")");
        //dataJson.attlist[0].type = "3";
        delete(dataJson.attlist[0].type);
        delete(dataJson.attlist[0].summary);
        _this.casemangeData.standardList[index].file = dataJson.attlist[0];
      };
      this.progressName = "standardList";
      xhr.upload.addEventListener("progress", this.progressFunction, false);
      xhr.send(formData);
    },
    //添加附件——课程视频
    addcourseFile: function(index) {
      let _this = this;
      this.processIndex = index;
      let inputDOM = this.$refs["courseFile" + index];
      this.fil = inputDOM[0].files;
      let size = Math.floor(this.fil[0].size / 1024);
      if (size > 1500 * 1024) {
        alert("请选择1g以内的视屏！");
        return false;
      }
      this.casemangeData.course[index].file = this.fil;
      console.info(this.casemangeData);
      //this.attUpload(this.fil[0], false, "course", index);
      let formData = new FormData();
      formData.append("fileList", this.fil[0]);

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", this.hostUrl + "/att/upload", true);
      xhr.onload = function() {
        let dataJson = eval("(" + xhr.responseText + ")");
        dataJson.attlist[0].type = "1";
        _this.casemangeData.course[index].file = dataJson.attlist[0];
      };
      this.progressName = "course";
      xhr.upload.addEventListener("progress", this.progressFunction, false);
      xhr.send(formData);
    },
    progressFunction: function(evt) {
      if (evt.lengthComputable) {
        let max = evt.total;
        let value = evt.loaded;
        let process = Math.round((evt.loaded / evt.total) * 100);
        //console.info(process);
        if (this.progressName == "standardList") {
          this.casemangeData.standardList[
            this.processIndex
          ].percentage = process;
        } else if (this.progressName == "course") {
          this.casemangeData.course[this.processIndex].percentage = process;
        }
        this.courseLoading = true;
        if (evt.loaded == evt.total) {
          this.courseLoading = false;
          //alert("上传完成100%");
        }
      }
    },
    //触发附件上传按钮——培训材料
    attBtn: function() {
      $("#attFile").click();
    },
    //添加附件——培训材料
    addAtt: function() {
      let inputDOM = this.$refs.attFile;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.attLen;
      let len = this.fil.length + oldLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        this.attLen++;
        this.$set(this.atts, this.fil[i].name, this.fil[i]);
      }
      console.info(this.atts);
      this.attUpload(this.atts, true, "atts");
    },
    //附件预览
    attPre: function(item) {
      //console.info(item);
      let url = this.hostUrl + "/" + item.path;
      //console.info(url);
      window.open(url);
    },
    //附件删除
    delAtt: function(item) {
      $("#attFile").val("");
      console.info(this.atts);
      this.$delete(this.atts, item.realnmae);
      this.attLen--;
      //console.info(item);
      let param = { id: null, path: item.path };
      let data = postAjax(this.hostUrl + "/att/delete", param);
      if (data.backValue == true) {
        this.casemangeData.atts = removeAaary(this.casemangeData.atts, item);
        //this.attlist = removeAaary(this.casemangeData.atts, item);
        this.$message({
          type: "success",
          message: "附件：" + item.realnmae + "已删除"
        });
      }
    },
    //调用附件上传方法
    attUpload: function(atts, isMuiti, name, index) {
      let formData = new FormData();
      if (isMuiti == true) {
        //支持多个附件
        for (let key in atts) {
          let name = key.split("?")[0];
          formData.append("fileList", atts[key]);
        }
      } else {
        formData.append("fileList", atts);
      }

      let data = postAjaxAtt("/att/upload", formData);
      console.info(data);
      if (name == "coverImg") {
        //附件上传的类别（名字）——封面图
        this.casemangeData.coverImg = data.attlist[0].path;
      } else if (name == "atts") {
        let _this = this;
        //图片
        data.attlist.map(function(item) {
          item.type = "2";
        });
        this.casemangeData.atts = data.attlist;
        this.attlist = data.attlist;
        console.info(this.attlist);
      }
    },
    //标准删除——真操作（点击提交按钮后执行该方法）
    standardFileDel: function() {
      for (let i = 0; i < this.standardDelList.length; i++) {
        let param = {
          id: this.standardDelList[i].id,
        };
        console.info(param);
        let data = postAjax(this.hostUrl + "/classicCase/deleteStandardList", param);
        console.info("删除的标准", data);
      }
    },
    //附件删除——真操作（点击提交按钮后执行该方法）
    attFileDel: function() {
      for (let i = 0; i < this.attFileDelList.length; i++) {
        let param = {
          id: this.attFileDelList[i].id,
          path: this.attFileDelList[i].path
        };
        console.info(param);
        let data = postAjax(this.hostUrl + "/att/delete", param);
        console.info("删除的附件", data);
      }
    },
    //删除已上传的附件——伪操作
    delAttsList: function(item,type) {//type为sta时走标准删除方法
      console.info(item);
      this.$confirm(
        "该附件已上传提交，是否确认删除”" + item.realnmae + "“ 该附件?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          if(type=="sta"){
            this.submitAtt.standardList = removeAaary(this.submitAtt.standardList, item); //删除列表中的数据
            this.standardDelList.push({ id: item.id, path: item.path }); //向待删除的数组中加入待删除附件的id
          }else{
            if (item.type == "1") {
              this.submitAtt.course = removeAaary(this.submitAtt.course, item); //删除列表中的数据
            } else if (item.type == "2") {
              this.submitAtt.atts = removeAaary(this.submitAtt.atts, item); //删除列表中的数据
            }
            this.attFileDelList.push({ id: item.id, path: item.path }); //向待删除的数组中加入待删除附件的id
          }
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //提交信息
    submit: function(status) {
      this.$refs["casemangeData"].validate(valid => {
        if (valid) {
          //alert("sumbit");
          console.info(this.casemangeData);
          //视屏列表
          let coursefile = this.casemangeData.course.map(function(item) {
            item.file.summary = item.summary;
            return item.file;
          });
          //标准文本列表
          let standardList = this.casemangeData.standardList.map(function(
            item
          ) {
            item.file.name = item.name;
            item.file.number = item.number;
            return item.file;
          });
          let list = this.attlist.concat(coursefile); //所有附件（包括视屏、标准）备注：视屏type=1;图片type=2;
          this.attFileDel(); //删除附件
          this.standardFileDel(); //删除标准
          let param = {
            classicCase: {
              id:this.casemangeData.id,
              survey: this.casemangeData.survey, //名称
              reserved1: this.casemangeData.reserved1, //概况
              photoPath:
                this.casemangeData.coverImg == ""
                  ? "0"
                  : this.casemangeData.coverImg, //封面图地址
              frame: this.casemangeData.frame, //
              buildExperience: this.casemangeData.buildExperience, //建设经验
              spreadExperience: this.casemangeData.spreadExperience, //推广经验
              buildResult: this.casemangeData.buildResult, //建设结果
              status: status, //状态
              createUser: userData().userinfo.loginUser.userName //创建者
            },
            attList: list, //所有附件,包括课程
            standardList:standardList //标准列表
          };
          console.info(param);
          let data = postAjax(this.hostUrl + "/classicCase/update", param);
          if (data.backValue == true) {
            this.$message({
              type: "success",
              message: "修改成功"
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
.casemangeAdd {
  padding: 0px 2%;
  margin: 15px 5%;
  width: 90%;
  background: #fff;
  .attPre {
    cursor: pointer;
  }
  .attPre:hover {
    text-decoration: underline;
    color: #10a6b4;
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
    margin-bottom: 20px;
    .oprateBtn {
      float: right;
      padding: 8px 15px;
      margin-left: 20px;
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
      width: 35%;
      margin-right: 2%;
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


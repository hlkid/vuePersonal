<template>
  <div>
    <el-row>
      <el-col :offset="1" :sm="22" class="ahcieveAdd">
        <p class="title"><a @click="back"><i class="el-icon-back"></i>返回</a> 添加成果展示</p>
        <div class="oprate">
          <el-button @click="submit('0')" class="oprateBtn" type="success" icon="el-icon-check">保存并启用</el-button>
          <el-button @click="submit('1')" class="oprateBtn" type="info" icon="el-icon-document">保存</el-button>
        </div>
        <el-form ref="achieveData" :model="achieveData" label-width="100px" :rules="rules">
          <el-form-item prop="name" label="名称">
            <el-input v-model="achieveData.name"></el-input>
          </el-form-item>
          <el-form-item label="封面图：">
            <div>图片格式为：JPEG/PNG/GIF，大小不超过5M，只限上传1张</div>
            <div>
              <button type="button" v-if="achieveData.coverImg==''" @click="coverImgAtt">选择封面图</button>
              <input v-if="achieveData.coverImg==''" style="display:none" id="coverImgFile" type="file" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg" />
            </div>
            <img v-if="achieveData.coverImg!=''" class="coverImg" :src="hostUrl+'/'+achieveData.coverImg">
            <a class="delImg" v-show="achieveData.coverImg!=''" @click="delImg()">删除图片</a>
          </el-form-item>
          <el-form-item label="成果介绍：">
            <div>图片格式为：JPEG/PNG/GIF</div>
            <div v-if="submitAtt.achieveList.length!=0">
              <div>已提交的图片：</div>
              <div v-for="(item,index) in submitAtt.achieveList" :key="index">
                <a class="attPre" @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div>
              <span class="attList" v-for='(item, index) in achieveData.achieveList' :key="index">
                <img @click="attPre(item)" :src="hostUrl+'/'+item.path" style="width:50%;margin-left:20%;cursor: pointer;" title="点击全屏预览">
                <el-button title="删除" style="padding:8px" class="achieveDel" @click="achieveDel(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </span>
            </div>
            <div style="width:100%;float:left">
              <el-button title="继续添加" style="margin-top:8px;padding:8px" @click="achieveBtn" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
            <input accept="image/png,image/jpeg,image/gif,image/jpg" style="display:none" multiple="multiple" id="achieveFile" type="file" @change="achieveAtt" ref="achieveFile" />
          </el-form-item>
          <el-form-item label="添加视屏" v-loading="courseLoading" element-loading-text="正在上传，请不要操作当前页面，以免文件丢失" element-loading-spinner="el-icon-loading" element-loading-background="rgba(226,226,226,0.2)">
            <div v-if="submitAtt.course.length!=0">
              <div>已提交的视屏：</div>
              <div v-for="(item,index) in submitAtt.course" :key="index">
                名称：{{item.realnmae}}。描述：{{item.summary}}
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div class="courseItem" v-for="(item,index) in achieveData.course" :key="index">
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
            <el-button style="margin-top:8px;padding:8px" @click="courseAdd" type="primary" icon="el-icon-plus" circle></el-button>
          </el-form-item>
          <el-form-item label="添加图册">
            <div v-if="submitAtt.atts.length!=0">
              <div>已提交的相册：</div>
              <div v-for="(item,index) in submitAtt.atts" :key="index">
                <a class="attPre" @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div>
              <span class="attList" v-for='(item, index) in achieveData.atts' :key="index">
                <a @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAtt(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </span>
            </div>
            <div style="width:100%;float:left">
              <el-button title="添加图册" style="margin-top:8px;padding:8px" @click="attBtn" type="primary" icon="el-icon-plus" circle></el-button>
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
      achieveData: {
        id: "", //修改时用的id
        name: "", //名称
        coverImg: "", //封面图
        achieveList: [], //成果介绍
        course: [], //添加的视屏
        atts: [] //添加的相册合集
      },
      submitAtt: {
        //已经上传的附件
        achieveList: [], //成果介绍
        course: [], //添加的视屏
        atts: [] //添加的相册合集
      },
      //表单校验
      rules: {
        name: [
          { required: true, message: "请输入成果名称", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "长度在 1 到 30 个字符",
            trigger: "change"
          }
        ]
      },
      processIndex: 0, //进度条index
      atts: {}, //附件——相册
      achieveFlie: {}, //附件——成果介绍
      attlist: [], //所有附件
      attFileDelList: [] //待删除的附件列表
    };
  },
  computed: {
    ...mapState(["hostUrl"])
  },
  mounted() {
    this.dataInit();
  },
  methods: {
    //初始化信息
    dataInit: function() {
      let param = {
        id: this.$route.query.id
      };
      this.achieveData.id = this.$route.query.id;
      let data = postAjax(this.hostUrl + "/resultsShow/select", param)
        .backValue;
      console.info(data);
      this.achieveData.name = data.resultsShow.name;
      this.achieveData.coverImg =
        data.resultsShow.titlePath == "0" ? "" : data.resultsShow.titlePath;
      let _this = this;
      data.attList.map(function(item) {
        if (item.type == "1") {
          _this.submitAtt.course.push(item);
        } else if (item.type == "2") {
          _this.submitAtt.atts.push(item);
        } else if (item.type == "3") {
          _this.submitAtt.achieveList.push(item);
        }
      });
    },
    //返回
    back: function() {
      this.$router.replace({
        path: "/backstageMan/demoarea",
        query: { id: "achieve" }
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
      let param = { id: null, path: this.achieveData.coverImg };
      let data = postAjax(this.hostUrl + "/att/delete", param);
      if (data.backValue == true) {
        this.achieveData.coverImg = "";
        this.$message({
          type: "success",
          message: "已删除封面图!"
        });
      }
    },
    //添加视屏
    courseAdd: function() {
      this.achieveData.course.push({
        id: "",
        percentage: 0, //上传进度
        summary: "",
        file: { realnmae: "" }
      });
    },
    //添加视频后的描述信息改变时事件
    courseChange: function(e, item, index) {
      this.achieveData.course[index].summary = e.target.value;
    },
    //删除视屏
    courseDel: function(index) {
      if (index !== -1) {
        this.achieveData.course.splice(index, 1);
      }
    },
    //触发附件上传按钮——视屏
    courseAtt: function(index) {
      $("#courseFile" + index).click();
    },
    //添加附件——视频
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
      this.achieveData.course[index].file = this.fil;
      console.info(this.achieveData);
      //this.attUpload(this.fil[0], false, "course", index);
      let formData = new FormData();
      formData.append("fileList", this.fil[0]);

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", this.hostUrl + "/att/upload", true);
      xhr.onload = function() {
        let dataJson = eval("(" + xhr.responseText + ")");
        dataJson.attlist[0].type = "1";
        _this.achieveData.course[index].file = dataJson.attlist[0];
      };
      xhr.upload.addEventListener("progress", this.progressFunction, false);
      xhr.send(formData);
    },
    progressFunction: function(evt) {
      if (evt.lengthComputable) {
        let max = evt.total;
        let value = evt.loaded;
        let process = Math.round((evt.loaded / evt.total) * 100);
        //console.info(process);
        this.achieveData.course[this.processIndex].percentage = process;
        this.courseLoading = true;
        if (evt.loaded == evt.total) {
          this.courseLoading = false;
          //alert("上传完成100%");
        }
      }
    },
    //触发附件上传按钮——成果介绍
    achieveBtn: function() {
      $("#achieveFile").click();
    },
    //触发附件上传按钮——相册
    attBtn: function() {
      $("#attFile").click();
    },
    //添加附件——成果介绍
    achieveAtt: function() {
      let inputDOM = this.$refs.achieveFile;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.attLen;
      let len = this.fil.length + oldLen;
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        this.attLen++;
        this.$set(this.achieveFlie, this.fil[i].name, this.fil[i]);
      }
      //console.info(this.achieveFlie);
      this.attUpload(this.achieveFlie, true, "achieve");
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
      console.info(item);
      let url = this.hostUrl + "/" + item.path;
      console.info(url);
      window.open(url);
    },
    //附件删除——成果介绍
    achieveDel: function(item) {
      $("#achieveFlie").val("");
      console.info(this.achieveFlie);
      this.$delete(this.achieveFlie, item.realnmae);
      this.attLen--;
      let param = { id: null, path: item.path };
      let data = postAjax(this.hostUrl + "/att/delete", param);
      if (data.backValue == true) {
        this.achieveData.achieveList = removeAaary(
          this.achieveData.achieveList,
          item
        );
        this.$message({
          type: "success",
          message: "附件：" + item.realnmae + "已删除"
        });
      }
    },
    //附件删除——相册
    delAtt: function(item) {
      $("#attFile").val("");
      console.info(this.atts);
      this.$delete(this.atts, item.realnmae);
      this.attLen--;
      //console.info(item);
      let param = { id: null, path: item.path };
      let data = postAjax(this.hostUrl + "/att/delete", param);
      if (data.backValue == true) {
        this.achieveData.atts = removeAaary(this.achieveData.atts, item);
        //this.attlist = removeAaary(this.achieveData.atts, item);
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
        this.achieveData.coverImg = data.attlist[0].path;
      } else if (name == "atts") {
        let _this = this;
        //附件——图册
        data.attlist.map(function(item) {
          item.type = "2";
        });
        this.achieveData.atts = data.attlist;
      } else if (name == "achieve") {
        let _this = this;
        //附件——介绍
        data.attlist.map(function(item) {
          item.type = "3";
        });
        this.achieveData.achieveList = data.attlist;
      }
      console.info(this.achieveData);
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
    delAttsList: function(item) {
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
          if (item.type == "1") {
            this.submitAtt.course = removeAaary(this.submitAtt.course, item); //删除列表中的数据
          } else if (item.type == "2") {
            this.submitAtt.atts = removeAaary(this.submitAtt.atts, item); //删除列表中的数据
          } else if (item.type == "3") {
            this.submitAtt.achieveList = removeAaary(
              this.submitAtt.achieveList,
              item
            ); //删除列表中的数据
          }
          this.attFileDelList.push({ id: item.id, path: item.path }); //向待删除的数组中加入待删除附件的id
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
      this.$refs["achieveData"].validate(valid => {
        if (valid) {
          //alert("sumbit");
          console.info(this.achieveData);
          let filelist = this.achieveData.course.map(function(item) {
            item.file.summary = item.summary;
            return item.file;
          });
          let list = this.attlist
            .concat(filelist)
            .concat(this.achieveData.achieveList)
            .concat(this.achieveData.atts); //所有附件（包括视屏）
          this.attFileDel(); //删除附件
          let param = {
            resultsShow: {
              id: this.achieveData.id,
              name: this.achieveData.name, //名称
              titlePath:
                this.achieveData.coverImg == ""
                  ? "0"
                  : this.achieveData.coverImg, //封面图
              introducePath: "",
              status: status, //状态
              createUser: userData().userinfo.loginUser.userName //创建者
            },
            attList: list //所有附件,包括课程(视屏type为1,图册type为2,介绍type为3)
          };
          console.info(param);
          let data = postAjax(this.hostUrl + "/resultsShow/update", param);
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
.ahcieveAdd {
  padding: 0px 2%;
  margin: 15px 5%;
  width: 90%;
  background: #fff;
  .el-form {
    width: 100%;
    float: left;
  }
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
    margin: 20px 0px;
    float: left;
    width: 100%;
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


<template>
  <div>
    <el-row>
      <el-col :offset="1" :sm="22" class="trainAdd">
        <p class="title"><a onclick="window.history.go(-1)"><i class="el-icon-back"></i>返回</a>编辑课程培训</p>
        <el-col :sm="24" class="oprate">
          <el-button @click="submit('0')" class="oprateBtn" type="success" icon="el-icon-check">保存并启用</el-button>
          <el-button @click="submit('1')" class="oprateBtn" type="info" icon="el-icon-document">保存</el-button>
        </el-col>
        <el-form ref="trainData" :model="trainData" label-width="100px" :rules="rules">
          <div class="label">基础信息填写</div>
          <el-form-item prop="name" label="课程名称：">
            <el-input v-model="trainData.name"></el-input>
          </el-form-item>
          <el-form-item prop="time" label="开课时间：">
            <el-date-picker style="width:100%" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="trainData.time" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="授课老师：" prop="teacher">
            <el-input v-model="trainData.teacher"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="授课类别：">
            <el-select style="width:100%" v-model="trainData.type" placeholder="请选择">
              <el-option v-for="item in typeOption" :key="item.value" :label="item.text" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="label">简介填写</div>
          <el-form-item label="课程简介">
            <el-input type="textarea" v-model="trainData.desc"></el-input>
          </el-form-item>
          <div class="label">封面图设置</div>
          <el-form-item label="封面图：">
            <div>图片格式为：JPEG/PNG/GIF，大小不超过5M，只限上传1张</div>
            <div>
              <button type="button" v-if="trainData.coverImg==''" @click="coverImgAtt">选择封面图</button>
              <input v-if="trainData.coverImg==''" style="display:none" id="coverImgFile" type="file" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg" />
            </div>

            <img v-if="trainData.coverImg!=''" class="coverImg" :src="hostUrl+'/'+trainData.coverImg">
            <a class="delImg" v-show="trainData.coverImg!=''" @click="delImg(trainData.coverImg)">删除图片</a>
          </el-form-item>
          <div class="label">收费设置</div>
          <el-form-item label="是否收费：">
            <el-switch v-model="trainData.ifFree" active-text="收费" inactive-text="免费"></el-switch>
          </el-form-item>
          <el-form-item v-if="trainData.ifFree" label="收费金额" prop="price">
            <el-input v-model.number="trainData.price" placeholder="收费金额"></el-input>
          </el-form-item>
          <div class="label">培训视频</div>
          <el-form-item v-loading="courseLoading" element-loading-text="正在上传，请不要操作当前页面，以免文件丢失" element-loading-spinner="el-icon-loading" element-loading-background="rgba(226,226,226,0.2)" label="添加课程">
            <div v-if="courseList.length>0">
              <div class="courseList">已上传的课程：</div>
              <div class="courseList" v-for="(item,index) in courseList" :key="index">
                课程名：{{item.realnmae}};描述：{{item.summary}}<el-button style="padding:8px" class="courseDel" @click="courseListDel(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
            <div class="courseItem" v-for="(item,index) in trainData.course" :key="index">
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
            <div style="width:100%;float:left">
              <el-button style="margin-top:8px;padding:8px" @click="courseAdd" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
          </el-form-item>
          <div class="label">培训材料</div>
          <el-form-item label="添加培训材料">
            <span v-if="attsList.length>0">已上传的附件：</span>
            <span class="attList" v-for='(item, index) in attsList' :key="index">
              <a @click="attPre(item)">{{item.realnmae}}</a>
              <el-button title="删除" style="padding:8px" class="courseDel" @click="delAttsList(item)" type="danger" icon="el-icon-delete" circle></el-button>
            </span>

            <div>
              <span class="attList" v-for='(item, index) in trainData.atts' :key="index">
                <a @click="attPre(item)">{{item.realnmae}}</a>
                <el-button title="删除" style="padding:8px" class="courseDel" @click="delAtt(item)" type="danger" icon="el-icon-delete" circle></el-button>
              </span>
            </div>
            <div style="width:100%;float:left">
              <el-button title="添加附件" style="margin-top:8px;padding:8px" @click="attBtn" type="primary" icon="el-icon-plus" circle></el-button>
            </div>
            <input style="display:none" multiple="multiple" id="attFile" type="file" @change="addAtt" ref="attFile" />
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
  removeAaary
} from "../../../../../js/common.js"; //引入post交互方法
import $ from "jquery";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      courseLoading:false,//视屏上传是loading
      //课程类型
      typeOption: [
        { value: "类型1", text: "类型1" },
        { value: "类型2", text: "类型2" },
        { value: "类型3", text: "类型3" },
        { value: "类型4", text: "类型4" }
      ],
      trainData: {
        id: "", //修改时必要的id
        name: "", //课程名称
        time: "", //开课时间
        teacher: "", //授课老师
        desc: "", //简介
        coverImg: "", //封面图
        ifFree: true, //是否免费
        price: "", //收费金额
        type: "", //课程类别
        course: [], //添加的课程
        atts: []
      },
      courseList: [], //添加的课程
      attsList: [], //添加的附件列表
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
        ],
        time: [{ required: true, message: "请输入开课时间", trigger: "blur" }],
        price: [
          {
            type: "number",
            message: "请输入正确的金额",
            trigger: ["blur", "change"]
          }
        ]
      },
      atts: {},
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
    //数据初始化获取
    dataInit: function() {
      let param = {
        id: this.$route.query.id
      };
      this.trainData.id = this.$route.query.id;
      let data = postAjax(this.hostUrl + "/train/select", param).backValue;
      console.info(data);
      this.trainData.name = data.title;
      this.trainData.time = data.trainTime;
      this.trainData.teacher = data.lecturer;
      this.trainData.desc = data.summary;
      this.trainData.coverImg = data.trainPath == "0" ? "" : data.trainPath;
      this.trainData.ifFree = data.feeScale == "true" ? true : false;
      this.trainData.price = data.price;
      this.trainData.type = data.type;
      for (let i = 0; i < data.attList.length; i++) {
        if (data.attList[i].type == "2") {
          this.attsList.push(data.attList[i]);
        } else {
          this.courseList.push(data.attList[i]);
        }
      }
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
    delImg(path) {
      this.trainData.coverImg = "";
      this.attFileDelList.push({ id: "", path: path }); //向待删除的数组中加入待删除附件的id
    },
    //添加视屏
    courseAdd: function() {
      this.trainData.course.push({
        id: "",
        percentage: 0, //上传进度
        summary: "",
        file: { realnmae: "" }
      });
    },
    //添加视频后的描述信息改变时事件
    courseChange:function(e,item,index){
      this.trainData.course[index].summary=e.target.value
     },
    //删除视屏
    courseDel: function(index) {
      if (index !== -1) {
        this.trainData.course.splice(index, 1);
      }
    },
    //删除已上传的视屏——伪删除（提交后才删除）
    courseListDel: function(item) {
      console.info(item);
      this.$confirm(
        "该条信息已上传提交,是否确认删除”" + item.realnmae + "“ 该条信息?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          this.courseList = removeAaary(this.courseList, item); //删除列表中的数据
          this.attFileDelList.push({ id: item.id, path: item.path }); //向待删除的数组中加入待删除附件的id
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //删除已上传的附件
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
          this.attsList = removeAaary(this.attsList, item); //删除列表中的数据
          this.attFileDelList.push({ id: item.id, path: item.path }); //向待删除的数组中加入待删除附件的id
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
    //触发附件上传按钮——培训课程
    courseAtt: function(index) {
      $("#courseFile" + index).click();
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
      this.trainData.course[index].file = this.fil;
      console.info(this.trainData);
      //this.attUpload(this.fil[0], false, "course", index);
      let formData = new FormData();
      formData.append("fileList", this.fil[0]);

      // XMLHttpRequest 对象
      var xhr = new XMLHttpRequest();
      xhr.open("post", this.hostUrl + "/att/upload", true);
      xhr.onload = function() {
        let dataJson = eval("(" + xhr.responseText + ")");
        _this.trainData.course[index].file = dataJson.attlist[0];
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
        this.trainData.course[this.processIndex].percentage = process;
        this.courseLoading=true;
        if (evt.loaded == evt.total) {
          this.courseLoading=false;
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
      console.info(item);
      let url = this.hostUrl + "/" + item.path;
      console.info(url);
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
        this.trainData.atts = removeAaary(this.trainData.atts, item);
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
        this.trainData.coverImg = data.attlist[0].path;
      } else if (name == "atts") {
        let _this = this;
        //附件
        data.attlist.map(function(item) {
          item.type = "2";
        });
        this.trainData.atts = data.attlist;
        this.attlist = data.attlist;
        console.info(this.attlist);
      } else if (name == "course") {
        //课程
        data.attlist[0].type = "1";
        data.attlist[0].summary = this.trainData.course[index].summary;
        this.trainData.course[index].file = data.attlist[0];
      }
    },
    //提交信息
    submit: function(status) {
      this.$refs["trainData"].validate(valid => {
        if (valid) {
          //alert("sumbit");
          this.attFileDel(); //删除附件
          console.info(this.trainData);
          let filelist = this.trainData.course.map(function(item) {
            item.file.summary=item.summary
            return item.file;
          });
          let list = this.attlist.concat(filelist); //所有附件（包括视屏）
          let param = {
            id: this.trainData.id,
            title: this.trainData.name, //名称
            trainTime: this.trainData.time, //开课时间
            summary: this.trainData.desc, //简介
            lecturer: this.trainData.teacher, //授课老师
            trainPath:
              this.trainData.coverImg == "" ? "0" : this.trainData.coverImg, //封面图地址
            type: this.trainData.type, //课程类型
            status: status, //状态
            feeScale: this.trainData.ifFree, //是否免费
            price: this.trainData.ifFree == true ? this.trainData.price : "0", //课程价格
            createUser: "admin",
            attList: list //所有附件,包括课程
          };
          console.info(param);
          let data = postAjax(this.hostUrl + "/train/update", param);
          if (data.backValue == true) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.$router.replace({ path: "/backstageMan/train" });
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
.trainAdd {
  padding: 0px 2%;
  margin: 15px 5%;
  width: 90%;
  background: #fff;
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
  .courseList {
    width: 100%;
    i {
      cursor: pointer;
      margin-left: 15px;
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
  .progress {
    width: 60%;
    float: left;
    margin-top: 6px;
    margin-left: 1%;
  }
}
</style>


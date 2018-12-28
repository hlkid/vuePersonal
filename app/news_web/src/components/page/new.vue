<template>
  <div>
    <!-- <headnav></headnav> -->
    <el-row class="main">
      <el-col :offset="2" :sm="20">
        <el-row class="oprate">
          <el-col :sm="24">
            <el-button style="float:left;margin-left:150px" @click="$router.replace({path:'/list'})" class="oprateBtn" type="info" icon="el-icon-back">返回</el-button>
            <el-button @click="submit('0')" class="oprateBtn" type="success" icon="el-icon-check">保存并启用</el-button>
            <el-button @click="submit('1')" class="oprateBtn" type="info" icon="el-icon-document">保存</el-button>
            <!-- <el-button @click="preview()" class="oprateBtn" type="primary" icon="el-icon-view">内容预览</el-button> -->
          </el-col>
        </el-row>
        <el-form style="margin-top:20px" :model="newsForm" status-icon :rules="rules" ref="newsForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="所属栏目：" prop="cloumn">
            <treeSelect v-on:cloumnChose="cloumnChose"></treeSelect>
          </el-form-item>
          <el-form-item :label="labelName" prop="title">
            <el-input v-model="newsForm.title"></el-input>
          </el-form-item>
          <el-form-item label="封面图：" v-show="coverFlag">
            <div>图片格式为：JPEG/PNG/GIF，大小不超过5M，只限上传1张</div>
            <div>
              <button type="button" v-if="newsForm.coverImg==''" @click="coverImgAtt">选择封面图</button>
              <input v-if="newsForm.coverImg==''" style="display:none" id="coverImgFile" type="file" @change="addImg" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg" />
            </div>
            <img v-if="newsForm.coverImg!=''" class="coverImg" :src="hostUrl+'/'+newsForm.coverImg">
            <a class="delImg" v-show="newsForm.coverImg!=''" @click="delImg()">删除图片</a>
          </el-form-item>
          <el-form-item label="编辑内容：" v-show="editFlag">
            <quill-editor v-model="newsForm.content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" @ready="onEditorReady($event)"></quill-editor>
          </el-form-item>
          <el-form-item label="添加附件：" v-show="attsFlag">
            <div>
              <span class="attList" v-for='(item, index) in newsForm.atts' :key="index">
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
import { postAjaxAtt, postAjax, removeAaary } from "../../js/common.js"; //引入post交互方法
import { addQuillTitle } from '../../js/quill-title.js'
import headnav from "../../components/common/header.vue";
import treeSelect from "../common/treeSelect.vue";
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import VueQuillEditor, { Quill } from "vue-quill-editor";
//import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
//Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  data() {
    return {
      labelName:"标题：",//标题动态改变
      coverFlag:false,//是否显示封面图
      editFlag:false,//是否显示编辑器
      attsFlag:false,//是否显示附件上传
      //表单信息
      newsForm: {
        title: "", //标题
        cloumn: "", //所属栏目
        content: "", //编辑器内容
        //封面图附件信息
        coverImg: "",
        //附件信息
        atts: []
      },
      //表单校验
      rules: {
        title: [
          { required: true, message: "请输入新闻标题", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "change"
          }
        ],
        cloumn: [
          { required: true, message: "请选择所属栏目", trigger: "change" }
        ]
      },
      //编辑器参数配置
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向
            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式
            ["clean"], //清除字体样式
            ["image"] //上传图片、上传视频
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          //imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      },
      formData: new FormData(), //给后台的数据
      imgFile: null, //封面图数据
      atts: {}, //上传的附件
      attLen: 0 //附件数量
    };
  },
  computed: {
    ...mapState(["hostUrl","baseUrl"])
  },
  mounted(){
    addQuillTitle();
  },
  components: { treeSelect, headnav },
  methods: {
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    cloumnChose: function(data) {
      //接收所属栏目组件传递的方法
      this.newsForm.cloumn = data.id;
      console.info(data);
      this.coverFlag=false;
      this.editFlag=false;
      this.attsFlag=false;
      switch (data.label) {
        case "在线QQ":
          this.labelName="QQ号码："
          break;
          case "合作伙伴":
          this.labelName="伙伴名称："
          this.coverFlag=true;
          this.editFlag=true;
          break;
          case "友情链接":
          this.labelName="链接地址："
          this.coverFlag=true;
          break;
          case "服务内容":
          case "增值服务":
          case "服务流程":
          this.labelName=data.label+"名称："
          this.editFlag=true;
          break;
        default:
        this.labelName="标题："
        this.coverFlag=true;
        this.editFlag=true;
        //this.attsFlag=true;
          break;
      }
      
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      this.newsForm.content = html;
    },
    preview: function() {
      //预览编辑页面
      window.open(this.baseUrl+"preView", "_blank");
      localStorage.setItem("preViewData", this.newsForm.content);
    },
    //触发封面图片上传按钮
    coverImgAtt: function() {
      $("#coverImgFile").click();
    },
    //添加封面图片
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      //let oldLen=this.imgLen;
      //let len=this.fil.length+oldLen;
      let size = Math.floor(this.fil[0].size / 1024);
      if (size > 5 * 1024) {
        alert("请选择5M以内的图片！");
        return false;
      }
      //this.imgLen++;
      this.imgFile = this.fil[0];
      console.info(this.imgFile);
      this.attUpload(this.imgFile, false, "coverImg");
    },
    //删除上传的封面图
    delImg() {
      let param = { id: null, path: this.newsForm.coverImg };
      let data = postAjax("/image/delete", param);
      if (data.backValue == true) {
        this.newsForm.coverImg = "";
        this.$message({
          type: "success",
          message: "已删除封面图!"
        });
      }
    },
    //触发附件上传按钮
    attBtn: function() {
      $("#attFile").click();
    },
    //添加附件
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
      let data = postAjax("/image/delete", param);
      if (data.backValue == true) {
        this.newsForm.atts = removeAaary(this.newsForm.atts, item);
        this.$message({
          type: "success",
          message: "附件：" + item.realnmae + "已删除"
        });
      }
    },
    //调用附件上传方法
    attUpload: function(atts, isMuiti, name) {
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

      let data = postAjaxAtt("/image/upload", formData);
      console.info(data);
      if (name == "coverImg") {
        //附件上传的类别（名字）——封面图
        this.newsForm.coverImg = data.attlist[0].path;
      } else if (name == "atts") {
        //附件
        this.newsForm.atts = data.attlist;
      }
    },
    //提交信息
    submit: function(status) {
      this.$refs["newsForm"].validate(valid => {
        if (valid) {
          let param = {
            parentid: this.newsForm.cloumn,
            newsPath: this.newsForm.coverImg==""?"0":this.newsForm.coverImg,
            newsTitle: this.newsForm.title,
            newsContent: this.newsForm.content,
            status: status,
            createUser: "admin",
            attlist: this.newsForm.atts
          };
          console.info(param);
          let data = postAjax("/NewsDetail/newsAdd", param);
          if (data.backValue == true) {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            this.$router.replace({path:"/list"});
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
.main {
  padding-top: 20px;
  margin: 0px 0px 60px 0px;
  background: #f8f8f8;
}
.oprate {
  .oprateBtn {
    float: right;
    padding: 8px 15px;
    margin-left: 20px;
  }
}
.formList {
  margin: 15px 0px;
  line-height: 40px;
  .label {
    text-align: right;
  }
}
.checkErrorMsg {
  color: #f56c6c;
}
.coverImg {
  width: 45%;
  float: left;
}
.delImg {
  margin-left: 15px;
  cursor: pointer;
}
.delImg:hover {
  color: #10a6b4;
}
.ql-editor {
  min-height: 400px !important;
  background: #fff;
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
</style>

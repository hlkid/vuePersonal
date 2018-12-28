<template>
    <div>
        <input id="file_id" type="file"><button @click="postFile()">提交</button>
        <el-input v-model="video_name" placeholder="视屏名称"></el-input>
        <el-input v-model="video_text" placeholder="视屏说明"></el-input>
        <el-button v-model="video_name" type="primary" @click="onSubmit">提交</el-button>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      uploadUrl: "10.147.87.83:3000/file/uploading",
      video_name: "",
      video_text: "",
      video_url: ""
    };
  },
  created() {
    var url = window.location.href;
    if (url.indexOf("import") != -1) {
      this.navFlag = 2;
    } else {
      this.navFlag = 1;
    }
  },
  methods: {
    //视屏上传
    postFile: function() {
      var _this = this;
      var files = $("#file_id")[0].files;
      console.info(files);
      var file = files[0];
      window.formData = new FormData();
      window.formData.append("file", file);
      var reqUrl = "http://10.147.87.83:3000/file/uploading";
      $.ajax({
        type: "Post",
        url: reqUrl,
        data: window.formData,
        processData: false,
        contentType: false,
        dataType: "text",
        xhr: function() {
          var myXhr = $.ajaxSettings.xhr();
          return myXhr;
        },
        success: function(res) {
          let data = eval("(" + res + ")");
          console.info(data.path);
          _this.video_url = data.path;
          if (data) {
            alert("文件上传成功");
          }
        },
        error: function(err) {}
      });
    },
    //视屏信息
    onSubmit: function() {
      if (this.video_url == "") {
        alert("请上传视频");
      } else {
        var _this = this;
        let paramStr = {
          name: this.video_name,
          url: this.video_url,
          text: this.video_text
        };
        $.ajax({
          url: "http://10.147.87.83:3000/videoMsg",
          type: "post",
          dataType: "json",
          data: paramStr,
          async: false,
          success: function(data) {
            console.info(data);
            if (data.state == "sucess") {
              alert("上传成功");
              _this.$router.push({ path: "/" });
            }
          },
          error: function(e) {
            // alert("网络错误，请重试！！");
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>


<template>
    <div id="listBox">
        <div v-for="item in listV" :key="item.id" class="list">
            <video style="float:left" :src="hosturl+item.url" width="60%" controls loop></video>
            <div style="float:left;width:35%;margin-left:5%" class="oprate">
                <i title="删除该视屏" @click="videoDel(item)" class="el-icon-delete delV"></i>
                <h4>标题：{{item.name}}</h4>
                <div><b>描述：</b>{{item.text}}</div>
            </div>
        </div>
        <slideMenu></slideMenu>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import slideMenu from "../common/slideMenu.vue";
import {deldata} from "../../js/common.js";

export default {
  data() {
    return {
      url: require("../../assets/video/v1.mp4"),
      listV: []
    };
  },
  created() {
    this.getData();
  },
  components: {
    slideMenu
  },
  computed: {
    ...mapState(["hosturl"])
  },
  methods: {
    //获取视屏
    getData: function() {
      var _this = this;
      $.get("http://10.147.87.83:3000/videolist", function(data) {
        console.info(data);
        _this.listV = data.recordset;
      });
    },
    //删除视屏
    videoDel: function(item) {
      let _this=this;
      deldata(this,{
        delname:item.name,
        id: item.id,
        url: "http://10.147.87.83:3000/videodel"
      },function(){
          //alert("删除成功");
          _this.getData();
      });
    }
  }
};
</script>

<style lang="less" scoped>
#listBox {
  font-size: 1em;
  .list {
    width: 100%;
    background: #fff;
    margin: 10px 0px;
    float: left;
    .delV {
      cursor: pointer;
      width: 40px;
      float: right;
    }
  }
}
</style>

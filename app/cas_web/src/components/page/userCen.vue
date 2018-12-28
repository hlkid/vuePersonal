<template>
  <div>
    <div class="userCen">
    <el-row>
      <el-col :sm="6" :offset="3" class="img-col">
        <div class="word-top">{{personName}}</div>
        <div class="line"></div>
        <div class="word-down">欢迎来到个人中心</div>
      </el-col>
      <el-col :sm="4" :offset="10" class="button-col">
        <el-button @click="listChoose({id: 'list4',pagePath: '/userCen/account'})" type="button">账号信息设置</el-button>
      </el-col>
    </el-row>
    </div>
    <div class="mainRow">
    <el-row>
      <el-col :offset="3" :sm="4">
        <div class="sliderbar">
          <div :class="{listActive:item.id==listActive}" @click="listChoose(item)" class="list" v-for="item in listData" :key="item.id">
            <icon class="icon" scale="2" :name="item.icon"></icon>{{item.text}}<i class="el-icon-arrow-right"></i>
          </div>
        </div>
        

      </el-col>
      <el-col :sm="14">
          <router-view></router-view>
        </el-col>
    </el-row>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import { getCookie,postAjax,dateToString } from "../../js/common.js";

export default {
  data() {
    return {
      personName:"管理员",//登录者名称
      listActive: "list1",
      listData: [
        { id: "list1", text: "文库收藏夹", pagePath: "/userCen/library", icon: "library_collection" },
        { id: "list2", text: "培训课程收藏夹", pagePath: "/userCen/course", icon: "collection_book" },
        { id: "list3", text: "我的服务申请", pagePath: "/userCen/apply", icon: "apply" },
        { id: "list4", text: "账户信息", pagePath: "/userCen/account", icon: "account" }
      ]
    }
  },
  mounted(){
      this.init()
  },
    computed: {
    ...mapState(["hostUrl","permison_url"])
  },
  mounted(){
    this.init()
    let router=this.$route.path;
    //页面加载根据路由显示侧边栏颜色状态
    for (let i = 0; i < this.listData.length; i++) {
      if(this.listData[i].pagePath==router){
        this.listActive=this.listData[i].id;
      }
    }
  },
  components: {},
  methods: {
    //初始化信息
        init:function(){
            //切换背景
            $(".userCen").css({
              background:'url("' +
                this.hostUrl+"/assets/banner/userCen.png" +
                '") no-repeat center'
            })

            //显示人员名称
            let userid=getCookie("userid");
          if(userid){
            let param={
                id:userid,
              }
              let data = postAjax(this.permison_url+"/usermanage/select", param);
              console.info(data);
              this.personName=data.userinfo.loginUser.personName;
          }
            
         },
    //点击侧边栏事件
    listChoose: function (item) {
      this.listActive = item.id;//改变侧边栏样式颜色
      this.$router.push({ path: item.pagePath });//加载子页面
    },
  }
}
</script>

<style lang="less" scoped>
.userCen {
  background: url("../../assets/banner/userCen.png") no-repeat center;
  height: 100px;
  .img-col {
    padding-top: 12px;
    cursor: pointer;
  }
  .button-col {
    padding-top: 2%;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .el-button {
    color: #fff;
    background-color: inherit;
    border-color: #fff;
  }
  .line {
    background-color: #a4f3d8;
    height: 1px;
    width: 400px;
  }
  .word-top {
    color: #fff;
    line-height: 40px;
    font-size: 22px;
  }
  .word-down {
    color: #a6f3d9;
    line-height: 30px;
    font-size: 15px;
  }
}
.icon {
    width: 21px;
    float: left;
    margin-top: 15px;
    margin-right: 12px;
  }
.mainRow {
    padding: 30px 0px;
    background: #fff;
    width: 100%;
    .sliderbar {
    background: #fff;
    margin-right: 30px;
    .list {
      padding: 0px 10px;
      line-height: 48px;
      border: 1px solid #ececec;
      margin-top: -1px;
      cursor: pointer;
      font-size: 14px;
      color: #93999f;
      .el-icon-arrow-right {
        float: right;
        line-height: 40px;
      }
    }
    .list:hover {
      background: #45b97a;
      color: #fff;
    }
    .listActive {
      background: #45b97a;
      color: #fff;
    }
  }
  }
</style>

<template>
<div>
    <el-row class="nav">
            <el-col :offset="3" :sm="5">
                <div class="hello" v-html="hello"></div>
            </el-col>
            <el-col :sm="13">
              <div style="width:100%">
                <div v-show="manage==true||item.id!='li9'" class="liWidth" :class="{liActive:item.id==urlid}" @click="linkHref(item)" v-for="item in liList" :key="item.id">
                   <b>{{item.name}}</b>
                </div>
                </div>
            </el-col>
        </el-row>
    
</div>  
</template>

<script>
import $ from "jquery";
import { getCookie,postAjax,dateToString } from "../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      manage:false,//是否展示后台管理
      hello: "国家农业标准化</br>信息公共服务与推广平台",
      urlid:"",//当前路由
      liList: [
        { id: "li1", name: "首页", url: "/" ,urlid:"/"},
        { id: "li2", name: "动态信息", url: "/activeMsg",urlid:"/activeMsg" },
        { id: "li3", name: "标准查询", url: "/searchSta" ,urlid:"/searchSta" },
        { id: "li4", name: "标准服务", url: "/serviceSta/rev/content",urlid:"/serviceSta" },
        { id: "li5", name: "体系服务", url: "/serviceSys/sta/content" ,urlid:"/serviceSys" },
        { id: "li6", name: "推广服务", url: "/serviceExt" ,urlid:"/serviceExt" },
        { id: "li7", name: "培训服务", url: "/serviceTrain" ,urlid:"/serviceTrain" },
        { id: "li8", name: "关于我们", url: "/aboutUs" ,urlid:"/aboutUs" },
        { id: "li9", name: "管理中心", url: "/backstageMan" ,urlid:"/backstageMan" }
      ]
    };
  },
  created() {},
  mounted() {
    this.initData();
    this.urlidInit();
    this.navWidth();
  },
  computed: {
    ...mapState(["permison_url"])
  },
  watch: {
      //监听路由变化
    $route(to, from) {
      this.urlidInit();
      window.scrollTo(0,0);
      //this.navWidth();
    }
  },
  beforeDestroy() {},
  methods: {
    //li导航长度动态改变
    navWidth:function(){
      //console.info("父",$(".liWidth").parent().width())
      let num=8;
      if(this.manage==true){
        num=9;
      }
      let liwidth=($(".liWidth").parent().width()-10)/num;
      ///console.info("子",liwidth);
      $(".liWidth").css({
        width:liwidth+"px"
      })
    },
    //路由跳转
      linkHref:function(item){
        this.urlid=item.id;
        this.$router.push({ path: item.url});
      },
      //初始化urlid
      urlidInit:function(){
        let routeNow=this.$route.path;
        //alert(routeNow)
        if(routeNow=="/"){
          this.urlid="li1";
        }else{
          for(let i=0;i<this.liList.length;i++){
              if(this.liList[i].url!="/"){
                //console.info(this.liList[i].urlid)
                if(routeNow.indexOf(this.liList[i].urlid)!=-1){
                  this.urlid=this.liList[i].id;
                }
            }
          }
        }
      },
      //初始化liList方法——是否显示管理中心
      initData:function(){
        let userid=getCookie("userid");
        if(userid){
          let param={
              id:userid,
            }
            let data = postAjax(this.permison_url+"/usermanage/select", param);
            let moudleList=data.userinfo.moduleList;
            console.info(moudleList)
            for(let i=0;i<moudleList.length;i++){
              if(moudleList[i].id.indexOf("1")!=-1){
                this.manage=true;
              }
            }
            //this.navWidth();
        }else{
          //this.navWidth();
        }
      }
    }
};
</script>

<style lang="less" scoped>
.nav {
  background: #45b97a;
  color: #fff;
  min-height: 68px;
  line-height: 68px;
  .hello{
    line-height: 34px;
    font-size: 22px;
    font-weight: bold;
  }
  .liWidth {
      float: left;
      display: block;
      white-space: nowrap;
      text-align: center;
      cursor: pointer;
      b{
        font-weight: normal;
        font-size: 15px;
      }
    }
    .liWidth:hover {
      background: #148648;
    }
    .liWidth:active {
      background: #148648;
    }
    .liActive {
      background: #148648;
      color: #f1f6ef;
    }
  }

</style>



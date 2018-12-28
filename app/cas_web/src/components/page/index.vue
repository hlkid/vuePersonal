<template>
    <div>
        <navs></navs>
        <headers></headers>
        <router-view></router-view>
        <el-row style="margin-top:20px">
            <el-col :offset="3" :sm="5"><demoShow v-show="router=='/'"></demoShow></el-col>
            <el-col :sm="8"><newsAndnotice v-show="router=='/'"></newsAndnotice></el-col>
            <el-col :sm="5"><searchSta v-show="router=='/'"></searchSta></el-col>
            <el-col v-show="router=='/'" :sm="3"><contactus></contactus></el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :offset="3" :sm="5"><partner v-show="router=='/'"></partner></el-col>
            <el-col :sm="8"><service v-show="router=='/'"></service></el-col>
            <el-col :sm="5"><demonstration v-show="router=='/'"></demonstration></el-col>
          </el-row>
          <el-row style="margin-top:20px">
            <el-col :offset="3" :sm="13"><experts v-show="router=='/'"></experts></el-col>
            <el-col :sm="5"><help v-show="router=='/'"></help></el-col>
          </el-row>
        <linkFriend v-show="router=='/'"></linkFriend>
        <bottom></bottom>
    </div>
</template>

<script>
import headers from "../common/header.vue"; //引用头部
import navs from "../common/nav.vue"; //引用导航
import contactus from "../children/index_contactus.vue"; //引用标准检索
import searchSta from "../children/index_searchSta.vue"; //引用标准检索
import partner from "../children/index_partner.vue"; //引用标准检索
import demoShow from "../children/index_demoshow.vue"; //引用成果展示子页面 
import newsAndnotice from "../children/index_newsAndnotice.vue"; //引用成果展示子页面
import service from "../children/index_service.vue"
import demonstration from "../children/index_demonstration.vue"
import experts from "../children/index_experts.vue"; //引用专家风采子页面 
import help from "../children/index_help.vue"; //引用专家风采子页面 
import linkFriend from "../children/linkFriend.vue"; //引用友情链接子页面
import bottom from "../common/bottom.vue"; //引用底部  


export default {
  data() {
    return {
      router: this.$route.path,
      dataNews:{
        name_zh:"新闻动态",
        name_en:"NEW CENTER",
        path:"/activeMsg/news",
        param:{
          type:"1"
        }
      },
      industry:{
        name_zh:"行业动态",
        name_en:"INDUSTRY",
        path:"/activeMsg/industry",
        param:{
          type:"1"
        }
      },
      spsAndtbt:{
        name_zh:"SPS/TBT通报",
        name_en:"SPS/TBT",
        path:"/activeMsg/apsAndtat",
        param:{
          type:"1"
        }
      },
      notice:{
        name_zh:"培训通知",
        name_en:"NOTIFICATION",
        path:"/serviceTrain/notice",
        param:{
          type:"1"
        }
      },
      chat:{
        name_zh:"经验交流",
        name_en:"EXPERIENCE",
        path:"/serviceExt/chat",
        param:{
          type:"1"
        }
      },
      contactus:{
        name_zh:"联系我们",
        name_en:"CONTACT US",
        path:"/serviceExt/chat",
        param:{
          type:"1"
        }
      }
    };
  },
  components: {
    headers,
    navs,
    demoShow,
    newsAndnotice,
    contactus,
    searchSta,
    partner,
    service,
    demonstration,
    experts,
    help,
    linkFriend,
    bottom
  },
  mounted() {},
  watch: {
      //监听路由变化
    $route(to, from) {
      this.router=to.path;
    }
  }
};
</script>

<style lang="less" scoped>
.main{
  background: #fff;
  padding: 20px 0px;
  .cardRow{
    padding-top: 15px;
  }
}
</style>

<template>
    <div class="serviceExt">
        <banner v-bind:bannerData="bannerData"></banner>
        <el-row class="mainRow">
            <el-col :offset="3" :sm="4">
                <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
                <qqOnline :queryParam="queryParamQQ"></qqOnline>
            </el-col>
            <el-col :sm="14">
                <tags :tagsData="tagsData"></tags>
                <router-view></router-view>
            </el-col>
        </el-row>
        
    </div>
    </template>

<script>
import banner from "../common/banner.vue"; //引用底部  
import slidebar from "../common/slidebar.vue"; //引用侧边栏
import tags from "../common/tags.vue"; //引用位置标签
import qqOnline from "../common/qqOnline.vue"; //引用侧边栏
import { mapState, mapActions } from "vuex";

export default {
    data(){
        return{
            bannerData:{//banner数据
                background:'url("'+require('../../assets/banner/serviceExt.png')+'") no-repeat center',
                title:"推广服务",
                msg:"围绕全国农业标准化示范区或其他农业标准化试点的建设成果，对建设成效良好、经验做法优秀的示范区进行推广展示。"
            },
            queryParamQQ:{//在线QQ数据
                type:"5_10"
            },
            slideBarData:{//侧边栏数据
                title:{text:"推广服务"},
                listData:[
                    {id:"list1",text:"示范区查询",pagePath:"/serviceExt/search"},
                    {id:"list2",text:"示范区建设分析",pagePath:"/serviceExt/analysis"},
                    {id:"list3",text:"典型案例",pagePath:"/serviceExt/case"},
                    {id:"list4",text:"经验交流",pagePath:"/serviceExt/chat"},
                    {id:"list5",text:"合作伙伴",pagePath:"/serviceExt/partner"},
                    {id:"list6",text:"成果展示",pagePath:"/serviceExt/demo"}
                ]
            },
            tagsData:{//tags位置标签
                title:"推广服务",
                seat:{path:"",text:"推广服务",
                        child:{
                            path:"",
                            text:"农业标准化示范区体系",
                            child:{
                                path:"",
                                text:""
                            }
                        }
                    }
            }
        }
    },
    mounted(){
      this.init()
  },
    computed: {
    ...mapState(["hostUrl"])
  },
    components: {banner,slidebar,tags,qqOnline},
    methods:{
        //初始化信息
        init:function(){
            //切换背景
            this.bannerData.background='url("' +
                this.hostUrl+"/assets/banner/serviceExt.png" +
                '") no-repeat center';
        },
        //接收sliderBar组件点击事件
        seatChange:function(data){
            this.tagsData.seat.child.text=data.text;
        }
    }
}
</script>

<style lang="less" scoped>
.serviceExt{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


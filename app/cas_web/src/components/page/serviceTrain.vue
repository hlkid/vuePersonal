<template>
    <div class="serviceTrain">
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
                background:'url("'+require('../../assets/banner/serviceTrain.png')+'") no-repeat center',
                title:"培训服务",
                msg:"提供相关文件和资料的下载和在线视频培训服务，为我国农业标准化人才队伍的发展壮大提供服务。"
            },
            queryParamQQ:{//在线QQ数据
                type:"6_10"
            },
            slideBarData:{//侧边栏数据
                title:{text:"培训服务"},
                listData:[
                    {id:"list1",text:"服务介绍",pagePath:"/serviceTrain/introduce"},
                    {id:"list2",text:"培训计划",pagePath:"/serviceTrain/plan"},
                    {id:"list3",text:"培训通知",pagePath:"/serviceTrain/notice"},
                    {id:"list4",text:"培训课程",pagePath:"/serviceTrain/course"}
                ]
            },
            tagsData:{//tags位置标签
                title:"培训服务",
                seat:{path:"",text:"培训服务",
                        child:{
                            path:"",
                            text:"服务介绍",
                            child:{
                                path:"",
                                text:""
                            }
                        }
                    }
            }
        }
    },
    computed: {
    ...mapState(["hostUrl"])
  },
  mounted(){
      this.init()
  },
    components: {banner,slidebar,tags,qqOnline},
    methods:{
        //初始化信息
        init:function(){
            //切换背景
            this.bannerData.background='url("' +
                this.hostUrl+"/assets/banner/serviceTrain.png" +
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
.serviceTrain{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


<template>
    <div class="serviceSta">
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
                title:"标准查询",
                msg:"提供国际、国内标准的检索、预览、下载或购买服务。"
            },
            queryParamQQ:{//在线QQ数据
                type:"2_10"
            },
            slideBarData:{//侧边栏数据
                title:{text:"标准查询"},
                listData:[
                    {id:"list1",text:"国际标准",pagePath:"/searchSta/internation"},
                    {id:"list2",text:"国内标准",pagePath:"/searchSta/home"}
                ]
            },
            tagsData:{//tags位置标签
                title:"标准查询",
                seat:{path:"",text:"标准查询",
                        child:{
                            path:"",
                            text:"国际标准",
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
.serviceSta{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


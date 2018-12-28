<template>
    <div class="aboutUs">
        <banner v-bind:bannerData="bannerData"></banner>
        <el-row class="mainRow">
            <el-col :offset="3" :sm="4">
                <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
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
import { mapState, mapActions } from "vuex";

export default {
    data(){
        return{
            bannerData:{//banner数据
                background:'url("'+require('../../assets/banner/aboutUs.png')+'") no-repeat center',
                title:"关于我们",
                msg:"提供国家农业标准化信息公共服务与推广平台相关信息和在线交流服务。"
            },
            slideBarData:{//侧边栏数据
                title:{text:"关于我们"},
                listData:[
                    {id:"list1",text:"平台介绍",pagePath:"/aboutUs/introduce"},
                    {id:"list3",text:"通知公告",pagePath:"/aboutUs/notice"},
                    {id:"list2",text:"专家风采",pagePath:"/aboutUs/experts"},
                    //{id:"list3",text:"版权说明",pagePath:"/aboutUs/copyright"},
                    //{id:"list4",text:"管理规范",pagePath:"/aboutUs/standard"},
                    {id:"list4",text:"汇款方式",pagePath:"/aboutUs/remit"},
                    {id:"list5",text:"联系我们",pagePath:"/aboutUs/contact"},
                    //{id:"list7",text:"在线QQ",pagePath:"/aboutUs/qq"}
                ]
            },
            tagsData:{//tags位置标签
                title:"关于我们",
                seat:{path:"",text:"标准服务",
                        child:{
                            path:"",
                            text:"平台介绍",
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
    components: {banner,slidebar,tags},
    methods:{
        //初始化信息
        init:function(){
            //切换背景
            this.bannerData.background='url("' +
                this.hostUrl+"/assets/banner/aboutUs.png" +
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
.aboutUs{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


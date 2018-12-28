<template>
    <div class="activeMsg">
        <banner v-bind:bannerData="bannerData"></banner>
        <el-row class="mainRow">
            <el-col :offset="3" :sm="4">
                <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
            </el-col>
            <el-col :sm="14">
                <tags :tagsData="tagsData"></tags>
                <div class="mainMsg">
                    <router-view></router-view>
                </div>
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
                background:'url("'+require('../../assets/banner/activeMsg.png')+'") no-repeat center',
                title:"动态信息",
                msg:"展示国内外关于农业标准化相关信息，以便及时了解市场、政策等情况。"
            },
            slideBarData:{//侧边栏数据
                title:{text:"动态信息"},
                listData:[
                    {id:"list1",text:"新闻动态",pagePath:"/activeMsg/news"},
                    {id:"list2",text:"行业动态",pagePath:"/activeMsg/industry"},
                    {id:"list3",text:"SPS/TBT通报",pagePath:"/activeMsg/apsAndtat"}
                ]
            },
            tagsData:{//tags位置标签
                title:"动态信息",
                seat:{path:"",text:"动态信息",
                        child:{
                            path:"",
                            text:"新闻动态",
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
                this.hostUrl+"/assets/banner/activeMsg.png" +
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
.activeMsg{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
        .mainMsg{
            border: 1px solid #EBEBEB
        }
    }
}

</style>


<template>
    <div class="serviceSys_support">
        <el-row class="mainRow">
            <el-col :sm="6">
                <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
                <qqOnline :queryParam="queryParamQQ"></qqOnline>
            </el-col>
            <el-col :sm="18">
                <tags :tagsData="tagsData"></tags>
                <div class="mainMsg">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
        
    </div>
    </template>

<script>
import slidebar from "../common/slidebar.vue"; //引用侧边栏
import tags from "../common/tags.vue"; //引用位置标签
import qqOnline from "../common/qqOnline.vue"; //引用侧边栏

export default {
    data(){
        return{
            slideBarData:{//侧边栏数据
                title:{text:"标准托管"},
                listData:[
                    {id:"list1",text:"服务内容",pagePath:"/serviceSta/support/price"},
                    {id:"list2",text:"服务流程",pagePath:"/serviceSta/support/process"},
                    {id:"list3",text:"在线服务",pagePath:"/serviceSta/support/line"},
                    {id:"list4",text:"联系方式",pagePath:"/serviceSta/support/contact"}
                ]
            },
            queryParamQQ:{//在线QQ数据
                type:"3_3_10"
            },
            tagsData:{//tags位置标签
                title:"标准托管",
                seat:{path:"",text:"体系服务",
                        child:{
                            path:"",
                            text:"标准托管",
                            child:{
                                path:"",
                                text:"服务价格"
                            }
                        }
                    }
            }
        }
    },
    components: {slidebar,tags,qqOnline},
    methods:{
        //接收sliderBar组件点击事件
        seatChange:function(data){
            this.tagsData.seat.child.child.text=data.text;
        }
    }
}
</script>

<style lang="less" scoped>
.serviceSys_support{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
        .mainMsg{
            border: 1px solid #EBEBEB
        }
    }
}

</style>


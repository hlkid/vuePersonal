<template>
    <div class="serviceSys_rev">
        <el-row class="mainRow">
            <el-col :sm="6">
                <slidebar :slideBarData="slideBarData" v-on:seatChange="seatChange"></slidebar>
                <qqOnline :queryParam="queryParamQQ"></qqOnline>
            </el-col>
            <el-col :sm="18">
                <tags :tagsData="tagsData"></tags>
                <router-view></router-view>
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
                title:{text:"标准制修订"},
                listData:[
                    {id:"list1",text:"服务内容",pagePath:"/serviceSta/rev/content"},
                    {id:"list2",text:"标准制编写的依据和质量",pagePath:"/serviceSta/rev/data"},
                    {id:"list5",text:"服务流程",pagePath:"/serviceSta/rev/process"},
                    {id:"list7",text:"增值服务",pagePath:"/serviceSta/rev/add"},
                    {id:"list6",text:"联系方式",pagePath:"/serviceSta/rev/contact"}
                ]
            },
            queryParamQQ:{//在线QQ数据
                type:"3_1_10"
            },
            tagsData:{//tags位置标签
                title:"标准制修订",
                seat:{path:"",text:"体系服务",
                        child:{
                            path:"",
                            text:"标准制修订",
                            child:{
                                path:"",
                                text:"服务内容"
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
.serviceSys_rev{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


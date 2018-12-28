<template>
    <div class="serviceSys_sta">
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
                title:{text:"农业标准体系建设"},
                listData:[
                    {id:"list1",text:"服务内容",pagePath:"/serviceSys/sta/content"},
                    {id:"list2",text:"农业标准体系编制相关资料",pagePath:"/serviceSys/sta/data"},
                    {id:"list3",text:"搭建范本",pagePath:"/serviceSys/sta/model"},
                    //{id:"list4",text:"通用标准体系框架图",pagePath:"/serviceSys/sta/frame"},
                    {id:"list5",text:"服务流程",pagePath:"/serviceSys/sta/process"},
                    {id:"list6",text:"联系方式",pagePath:"/serviceSys/sta/contact"},
                    {id:"list7",text:"增值服务",pagePath:"/serviceSys/sta/add"}
                ]
            },
            queryParamQQ:{//在线QQ数据
                type:"4_1_10"
            },
            tagsData:{//tags位置标签
                title:"农业标准体系建设",
                seat:{path:"",text:"体系服务",
                        child:{
                            path:"",
                            text:"农业标准体系建设",
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
.serviceSys_sta{
    .mainRow{
        padding: 30px 0px;
        background: #fff;
    }
}

</style>


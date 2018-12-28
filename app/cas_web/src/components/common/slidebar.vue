<template>
    <div class="sliderbar">
        <div class="head">
            {{slideBarData.title.text}}
        </div>
        <div :class="{listActive:item.id==listActive}" @click="listChose(item)" class="list" v-for="item in slideBarData.listData" :key="item.id">{{item.text}}<i class="el-icon-arrow-right"></i></div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data(){
        return{
            listActive:"list1"
        }
    },
    props:["slideBarData"],
    computed: {//引入vuex仓库中的属性
        ...mapState(["localSeat"])
    },
    mounted(){
        this.listInit();
    },
    methods:{
        ...mapActions(["stateChangae"]),//引入vuex中的改变值方法
        listChose:function(item){
            this.listActive=item.id;//改变侧边栏样式颜色
            this.$router.push({path:item.pagePath});//加载子页面
            this.$emit("seatChange",item);
        },
        //初始化list选中以及位置信息改变
        listInit:function(){
            for(let i=1;i<this.slideBarData.listData.length;i++){
                if(this.$route.path==this.slideBarData.listData[i].pagePath){
                    this.listActive=this.slideBarData.listData[i].id;
                    this.$emit("seatChange",this.slideBarData.listData[i]);
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.sliderbar{
    background: #fff;
    margin-right: 30px;
    .head{
        background: #45B97A;
        line-height: 45px;
        font-size: 18px;
        color: #fff;
        padding: 0px 10px;
        border-radius: 10px 10px 0 0;
        border:1px solid #ECECEC;
    }
    .list{
        padding: 0px 10px;
        line-height: 40px;
        border:  1px solid #ECECEC;
        border-top: none;
        cursor: pointer;
        font-size: 14px;
        .el-icon-arrow-right{
            float: right;
            line-height: 40px;
        }
    }
    .list:hover{
        background: #F9F9F9;
        color: #45B97A;
    }
    .listActive{
        background: #F9F9F9;
        color: #45B97A;
    }
}

</style>


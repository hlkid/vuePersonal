<template>
    <div class="banner">
        <el-row v-bind:style="{background:bannerData.background}" class="cardRow head">
            <el-col :sm="24">
                <div class="title">{{bannerData.title}}</div>
                <div class="msg">{{bannerData.msg}}</div>
            </el-col>
          </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    props:["bannerData"]
}
</script>

<style lang="less" scoped>
.banner{
    .head{
        background-size: 100% 100%;
        height: 150px;
        text-align: center;
        vertical-align: middle;
        color: #fff;
        .title{
            height: 90px;
            line-height: 120px;
            font-size: 26px
        }
        .msg{
            height: 60px;
            line-height: 30px;
        }
    }
}
</style>


<template>
    <div class="tags">
        <el-row>
            <el-col :sm="8" class="tagTitle">
                {{tagsData.title}}
            </el-col>
            <el-col :sm="16" class="tagMsg">
                <div v-show="tagsData.seat.child.child.text!=''"> > {{tagsData.seat.child.child.text}}</div><div v-show="tagsData.seat.child"> > {{tagsData.seat.child.text}}</div><div v-show="('seat' in tagsData)">{{tagsData.seat.text}}</div>
                <div>您的位置：</div>
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
    props:["tagsData"]
}
</script>

<style lang="less" scoped>
.tags{
    line-height: 45px;
    border: 1px solid #EBEBEB;
    background: #FAFAFA;
    padding: 0px 25px;
    .tagTitle{
        font-size: 16px;
        color: #000;
    }
    .tagMsg{
        font-size: 14px;
        float: right;
        text-align: right;
        color: #A2A2A2;
        div{
            float: right;
        }
    }
}
</style>


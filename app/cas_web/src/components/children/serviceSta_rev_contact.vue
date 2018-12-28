<template>
    <div>
        <newscommon :queryParam="queryParam"></newscommon>
    </div>
</template>

<script>
import newscommon from "../common/newscommon.vue"; //引用新闻组件

export default {
    data(){
        return{
            queryParam:{
                text:"联系方式",
                type:"3_1_4"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

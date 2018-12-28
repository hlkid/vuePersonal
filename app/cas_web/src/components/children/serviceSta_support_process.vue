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
                text:"托管——服务流程",
                type:"3_3_2"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

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
                text:"对比——比对示例",
                type:"3_5_6"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

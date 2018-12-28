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
                text:"增值服务",
                type:"4_1_5"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

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
                type:"5_3",
                text:"平台介绍"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

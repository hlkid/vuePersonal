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
                text:"服务介绍",
                type:"6_1"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

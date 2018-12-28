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
                text:"示范——联系方式",
                type:"4_2_4"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

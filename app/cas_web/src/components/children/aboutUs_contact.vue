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
                text:"联系我们",
                type:"7_4"
            }
        }
    },
    components:{newscommon}
}
</script>

<style>

</style>

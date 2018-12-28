<template>
    <div>
        <list :queryParam="queryParam"></list>
    </div>
</template>

<script>
import list from "../common/list.vue"; //引用卡片

export default {
    data(){
        return{
            queryParam:{//传递查询参数
                url:"www",
                type:"7_5"
            }
        }
    },
    components:{
        list
    }
}
</script>

<style>

</style>

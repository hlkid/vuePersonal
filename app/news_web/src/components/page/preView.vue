<template>
    <div v-html="news"></div>
</template>

<script>
import "../../css/quill.css";//引入编辑器样式

export default {
    data(){
        return{
            news:""
        }
    },
    mounted(){
        this.news=localStorage.getItem("preViewData");;
    }
}
</script>

<style>

</style>

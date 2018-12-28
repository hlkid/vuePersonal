<template>
    <div class="serviceTec">
        <banner v-bind:bannerData="bannerData"></banner>
    </div>
    </template>

<script>
import banner from "../common/banner.vue"; //引用底部  

export default {
    data(){
        return{
            bannerData:{//banner数据
                background:'url("'+require('../../assets/temp/banner.png')+'") no-repeat',
                title:"技术服务",
                msg:"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            }
        }
    },
    components: {banner}
}
</script>

<style lang="less" scoped>

</style>


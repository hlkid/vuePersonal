<template>
    <div>
        <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="item in carouselArr" :key="item.id" interval="2000">
        <img :src="item.url">
      </el-carousel-item>
    </el-carousel>
    </div>
</template>

<script>
export default {
    data(){
        return{
            carouselArr:[
                {id:"t1",name:"",url:require("../../assets/temp/t1.jpg")},
                {id:"t2",name:"",url:require("../../assets/temp/t2.jpg")},
                {id:"t3",name:"",url:require("../../assets/temp/t3.jpg")}
            ]
        }
    }
}
</script>

<style>

</style>


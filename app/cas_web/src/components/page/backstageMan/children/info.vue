<template>
    <div><a class="open" @click="full">点击此处可在新页面中全屏显示</a>
        <div><iframe :src="news_url"></iframe>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import { mapState, mapActions } from "vuex";

export default {
    data(){
        return{
           
            
        }

    },
    computed: {
    ...mapState(["hostUrl","news_url"])
  },
    methods:{
        full:function(){
            window.open(this.hostUrl+"/info")
        }
    }
}
</script>

<style lang="less" scoped>
.open{
    cursor: pointer;
    padding-left: 2%;
    line-height: 25px;
}
.open:hover{
    color: #10a6b4;
    text-decoration: underline;
}
iframe{
    width: 96%;
    margin: 0px 2%;
    height: auto;
    min-height: 400px;
 }
</style>


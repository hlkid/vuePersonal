<template>
    <div v-html="news"></div>
</template>

<script>
import "../../css/quill.css";//引入编辑器样式
import { postAjax } from "../../js/common.js"; //引入post交互方法
import { mapState, mapActions } from "vuex";
import $ from "jquery";

export default {
    data(){
        return{
            news:""
        }
    },
    computed: {
    ...mapState(["hostUrl","baseUrl"])
  },
    mounted(){
        this.dataInit();
    },
    methods:{
        //初始化查询数据
    dataInit:function(){
      console.info(this.$route.query.id);
      let param={
        id:this.$route.query.id
      };
      let data=postAjax("/NewsDetail/newsSelect",param);
      console.info(data);
      let initData=data.backValue;
      this.news= initData.newsContent; //编辑器内容
    },
    }
}
</script>

<style>

</style>

<template>
    <div class="chat">
        <a @click="init">点击此进入经验交流</a>
    </div>
</template>

<script>
import { getCookie,postAjax,dateToString } from "../../js/common.js";
import { mapState, mapActions } from "vuex";

export default {
    data() {
    return {
      
    };
  },
   mounted() {
    this.init();
  },
  computed: {
    ...mapState(["host"])
  },
  methods:{
      init:function(){
          let userid=getCookie("userid");
          if(userid&&userid!=""){
            window.open(this.host+"forumServices/forum/list?userId="+userid);
          }else{
              window.open(this.host+"forumServices/forum/list");
          }
        }
  }
}
</script>

<style lang="less" scoped>
.chat{
    a{
        cursor: pointer;
    }
    a:hover{
        text-decoration: underline;
        color: #45B97A;
    }
}
</style>


<template>
<div>
    <div @mouseout="menuClose()" @mouseover="menuShow()" v-show="menuFlg" class="slide">
          <div class="li" @click="toMenu(item)" :id="item.id" v-for="item in menu" :key="item.id">
                {{item.name}}
          </div>
        <div style="font-size:26px" class="li" @click="goTop()"><i class="el-icon-arrow-up"></i></div>
    </div>
    <div @mouseover="menuShow" v-show="!menuFlg" @click="menuShow()" class="menuIcon">
      <icon class="cardIcon" scale="4" name="menu"></icon>
    </div>
</div>
</template>

<script>
import $ from "jquery";

export default {
  name: "slideMenu",
  data() {
    return {
      menuFlg:false,
      menu:[
        {id:"menu1",name:"使用帮助",path:"/help"},
        {id:"menu2",name:"汇款方式",path:"/aboutUs/remit"},
        {id:"menu3",name:"联系我们",path:"/aboutUs/contact"},
        {id:"menu4",name:"在线QQ",path:"/aboutUs/qq"}
      ]
    };
  },
  created(){
    
  },
  methods: {
    goTop: function() {//回到顶部
      $("html,body").animate({ scrollTop: 0 }, 600);
    },
    liHover: function(elemnt) {//鼠标划上显示
      this.menuFlg=true;
    },
    liMouseout:function(elemnt){//鼠标划出隐藏
      this.menuFlg=false;
    },
    menuShow:function(){
      this.menuFlg=true;
    },
    menuClose:function(){
      this.menuFlg=false;
    },
    toMenu:function(item){//跳转对应菜单
    //let url="tencent://message/?Menu=yes&uin=872803518&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45";
      this.$router.push({path:item.path});
    }
  }
};
</script>

<style lang="less" scoped>
.menuIcon{
  opacity: 1;
  position: fixed;
  width: 60px;
  height: 60px;
  font-size: 22px;
  border-radius: 30px;
  line-height: 80px;
  right: 60px;
  bottom: 50px;
  z-index: 99;
  background: #45b97a;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.menuIcon:hover{
  opacity: 1;
}
.slide {
  opacity: 1;
  background: #fff;
  position: fixed;
  width: 80px;
  right: 50px;
  bottom: 50px;
  z-index: 100;
  border: 1px solid #ccc;
  .li{
    font-size: 14px;
    line-height: 40px;
    padding: 0px 6px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
  .li:hover{
    color: #fff;
    background: #45b97a;
  }
}
</style>



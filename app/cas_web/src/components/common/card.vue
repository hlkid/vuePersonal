<template>
    <div class="card">
      <div class="header">
        <span class="title">
          <b>{{queryParam.name_zh}}</b>
          <br>{{queryParam.name_en}}
        </span>
        <span class="more"><i @click="toPath()" class="el-icon-d-arrow-right"></i></span>
      </div>
      <div class="main">
        <li v-for="item in cardData" :key="item.id" :title="item.name">
          <a href="">{{item.time}}  {{item.name}}</a>
        </li>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      cardData:[
          {id:"card1",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card2",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card3",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card4",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card5",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card6",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"},
          {id:"card7",name:"关于国家农业标准化标准化信息公共服务",time:"2018-05-28"}
        ]
    }
  },
  props:["queryParam"],
  methods:{
    toPath:function(){//跳转到对应页面
      this.$router.push({path:this.queryParam.path});
    }
  }
};
</script>

<style lang="less" scoped>
.card{
  background: #fff;
  width: 100%;
  .header{
    height: 40px;
    line-height: 20px;
    .title{
      color: #B2B2B2;
      b{
        color: #000;
      }
    }
    span{
      float: left;
    }
    .more{
      float: right;
      line-height: 40px;
      cursor: pointer;
      .el-icon-d-arrow-right:hover{
        color: #45B97B;
      }
    }
  }
  .main{
    padding: 10px 0px;
    font-size: 13px;
    li{
      list-style: none;
      white-space: nowrap;  
      text-overflow:ellipsis; 
      overflow:hidden;
      line-height: 28px;
      border-bottom: 1px solid #ccc;
      a{
        text-decoration: none;
        color: #373737;
      }
      a:hover{
        text-decoration: underline;
        color: #45B97B;
      }
    }
  }
}
</style>


<!--培训课程列表-->
<template>
    <div class="list">
        <el-row v-for="(item,index) in courseData.listData" :key="index">
            <el-col :sm="1">
                <el-checkbox v-if="courseData.checkbox" v-model="item.checked"></el-checkbox>
            </el-col>
            <el-col :sm="20">
                <div class="title">
                    <div :title="item.name" class="name">{{item.title}}</div>
                </div>
                <div class="content">{{item.content|content}}</div>
                <div class="sign">
                    <div class="status">
                        <span :class="buyStatusClass(item.buyStatus)" class="buyStatusBtn1 btn">{{item.buyStatus|buyStatus}}</span>
                    </div>
                    <div class="msg">
                        <span class="time" :title="item.time">开课时间：{{item.time}}</span>
                        <span class="orgin" :title="item.orgin">授课老师：{{item.lecturer}}</span>
                        <span class="type" :title="item.type">类别：{{item.type}}</span>
                        <span class="price" :title="item.price">价格：{{item.price}}</span>
                    </div>
                </div>
            </el-col>
            <el-col class="sliderOprate" :offset="1" :sm="2">
                <button @click="summary(item)" class="btn">预览</button>
                <button :disabled="item.buyStatus!='2'" :class="item.buyStatus=='2'?'':'disableBtn'" class="btn">购买</button>
                <button @click="study(item)" :disabled="item.buyStatus=='2'" :class="item.buyStatus!='2'?'':'disableBtn'" class="btn">学习</button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:["courseData"],
    methods: {
        //点击预览按钮
        summary:function(item){
          this.$router.push({path:"/trainSummary",query:{id:item.id,type:"preview"}})
        },
        //点击学习按钮
        study:function(item){
            this.$router.push({path:"/trainSummary",query:{id:item.id,type:"study"}})
        },
        //改变购买状态颜色类型
        buyStatusClass: function(item) {
        switch (item) {
            case "1":
            return "buyStatusBtn1";
            break;
            case "2":
            return "buyStatusBtn2";
            break;
            case "3":
            return "buyStatusBtn3";
            break;
        }
        }
    },
    filters: {
    //过滤标准内容
    content: function(val) {
      if(val){
        return val.slice(0, 120) + "......";
      }else{
        return "暂无简介";
      }
      
    },
    //过滤标准购买状态
    buyStatus: function(val) {
        switch (val) {
        case "1":
          return "免费";
        case "2":
          return "未购买";
        case "3":
          return "已购买";
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  padding: 0px 15px;
  line-height: 25px;
  font-size: 13px;
  .el-row {
    padding: 5px 0px;
    border-bottom: 1px solid #ebebeb;
  }
  .title {
    width: 100%;
    float: left;
    div {
      float: left;
      font-weight: bold;
    }
    .name {
      width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .num {
      width: 65%;
      float: right;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
      i {
        margin: 0px 5px;
      }
    }
  }
  .content {
    line-height: 20px;
    margin-top: 10px;
  }
  .sign {
    div {
      float: left;
    }
    .status {
      width: 12%;
      .btn {
        padding: 2px 10px;
        color: #fff;
      }
      .statusBtn1 {
        background: #45ba7a;
      }
      .statusBtn2 {
        background: #ed4042;
      }
      .buyStatusBtn1 {
        background: #66cf4f;
      }
      .buyStatusBtn2 {
        background: #709eec;
      }
      .buyStatusBtn3 {
        background: #28c9a0;
      }
    }
    .msg {
      width: 88%;
      span {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 2%;
      }
      .time {
        width: 34%;
        border-left: 1px solid #8b8b8b;
        margin-left: 0;
        padding-left: 3%;
        line-height: 15px;
        margin-top: 5px;
      }
      .orgin {
        width: 18%;
      }
      .type {
        width: 16%;
      }
      .price {
        width: 13%;
      }
    }
  }
  .sliderOprate {
    .btn {
      margin: 2px 0px;
      padding: 3px 10px;
      color: #fff;
      border: none;
      cursor: pointer;
      background: #45b97a;
      float: right;
    }
    .disableBtn {
      background: #c6c6c6;
      cursor:no-drop;
    }
  }
}
</style>

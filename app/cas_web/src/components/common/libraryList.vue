<!--文库列表-->
<template>
    <div class="list">
        <el-row v-for="item in libraryData.listData" :key="item.id">
            <el-col :sm="1">
                <el-checkbox v-if="libraryData.checkbox" v-model="item.checked"></el-checkbox>
            </el-col>
            <el-col :sm="20">
                <div class="title">
                    <div :title="item.name" class="name">{{item.name}}</div>
                    <div class="num"><i class="el-icon-document"></i>中国标准分类号(CCS)：{{item.num1}}<i class="el-icon-document"></i>国际标准分类号(ICS)：{{item.num2}}</div>
                </div>
                <div class="content">{{item.content|content}}</div>
                <div class="sign">
                    <div class="status">
                        <span :class="statusClass(item.status)" class="btn">{{item.status|status}}</span>
                        <span :class="buyStatusClass(item.buyStatus)" class="buyStatusBtn1 btn">{{item.buyStatus|buyStatus}}</span>
                    </div>
                    <div class="msg">
                        <span class="time" :title="item.time">有效开始时间：{{item.time}}</span>
                        <span class="orgin" :title="item.orgin">发布组织：{{item.orgin}}</span>
                        <span class="type" :title="item.type">类别：{{item.type}}</span>
                        <span class="price" :title="item.price">价格：{{item.price}}</span>
                    </div>
                </div>
            </el-col>
            <el-col class="sliderOprate" :offset="1" :sm="2">
                <button @click="summary(item)" class="btn">简介</button>
                <button :disabled="item.buyStatus!='2'" :class="item.buyStatus=='2'?'':'disableBtn'" class="btn">购买</button>
                <button :disabled="item.buyStatus=='2'" :class="item.buyStatus!='2'?'':'disableBtn'" class="btn">下载</button>
                <button :disabled="item.buyStatus=='2'" :class="item.buyStatus!='2'?'':'disableBtn'" class="btn">阅读</button>
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
    props:["libraryData"],
    methods: {
        //点击简介按钮
        summary:function(item){
            this.$router.push({path:"/librarySummary"})
        },
        //改变发行状态颜色类型
        statusClass: function(item) {
        switch (item) {
            case "1":
            return "statusBtn1";
            break;
            case "2":
            return "statusBtn2";
            break;
        }
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
      return val.slice(0, 120) + "...";
    },
    //过滤发行购买状态
    status: function(val) {
      switch (val) {
        case "1":
          return "已发行";
        case "2":
          return "未发行";
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
      width: 23%;
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
      width: 77%;
      span {
        float: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 2%;
      }
      .time {
        width: 27%;
        border-left: 1px solid #8b8b8b;
        margin-left: 0;
        padding-left: 3%;
        line-height: 15px;
        margin-top: 5px;
      }
      .orgin {
        width: 28%;
      }
      .type {
        width: 13%;
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

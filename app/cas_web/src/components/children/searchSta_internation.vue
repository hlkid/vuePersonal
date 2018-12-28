<template>
    <div class="box">国际标准——建设中
        <!-- <div class="oprate">
            <el-row v-show="!isDetail" class="rowSearch">
                <el-col :sm="18" class="searchInput"><i class="el-icon-search"></i><input type="text"/></el-col>
                <el-col :sm="4" class="search"><button class="btn">查询</button></el-col>
                <el-col :sm="2" class="highSearchBtn"><a @click="isDetail=true">高级查询</a></el-col>
            </el-row>
            <el-row v-show="isDetail" class="highSearch">
                <el-col :offset="1" :sm="11">
                  <div class="label">标准号：</div>
                  <div class="print"><el-input v-model="highSearch.num" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">标准名称：</div>
                  <div class="print"><el-input v-model="highSearch.name" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">发布日期：</div>
                  <div class="print"><el-date-picker class="input" v-model="highSearch.publictime" type="daterange" range-separator="至"></el-date-picker></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">实施日期：</div>
                  <div class="print"><el-date-picker class="input" v-model="highSearch.realtime" type="daterange" range-separator="至"></el-date-picker></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">有效性：</div>
                  <div class="print"><el-select clearable v-model="highSearch.effect"><el-option v-for="item in selectOption.effectOption" :key="item.value" :label="item.label" :value="item.value"> </el-option></el-select></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">国别：</div>
                  <div class="print"><el-select clearable v-model="highSearch.contry"><el-option v-for="item in selectOption.effectOption" :key="item.value" :label="item.label" :value="item.value"> </el-option></el-select></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">发布组织：</div>
                  <div class="print"><el-input v-model="highSearch.publicOrg" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">发布号：</div>
                  <div class="print"><el-input v-model="highSearch.publicNum" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">国际标准分类号：</div>
                  <div class="print"><el-input v-model="highSearch.internationNum" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">国内标准分类号：</div>
                  <div class="print"><el-input v-model="highSearch.homeNum" class="input" clearable></el-input></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">是否免费：</div>
                  <div class="print"><el-select clearable v-model="highSearch.free"><el-option v-for="item in selectOption.freeOption" :key="item.value" :label="item.label" :value="item.value"> </el-option></el-select></div>
                </el-col>
                <el-col :offset="1" :sm="11">
                  <div class="label">是否现行：</div>
                  <div class="print"><el-select clearable v-model="highSearch.have"><el-option v-for="item in selectOption.haveOption" :key="item.value" :label="item.label" :value="item.value"> </el-option></el-select></div>
                </el-col>
                <el-col :offset="13" :sm="11">
                  <button class="btn">查询</button>
                  <a class="quickSearchBtn" @click="isDetail=false">快速查询</a>
                </el-col>
            </el-row>
            <el-row class="rowOprate">
                <el-col :sm="1">
                    <el-checkbox></el-checkbox>
                </el-col>
                <el-col :sm="1">全选</el-col>
                <el-col :offset="1" :sm="4"><el-button class="btnCollect" icon="el-icon-sold-out">收藏</el-button></el-col>
                <el-col :offset="13" :sm="4"><el-button class="myCollect" icon="el-icon-star-off">我的收藏</el-button></el-col>
            </el-row>
        </div>
        <libraryList :libraryData="libraryData"></libraryList>
        <pagination></pagination> -->
    </div>
</template>

<script>
import pagination from "../common/pagination.vue"; //引用分页
import libraryList from "../common/libraryList.vue"; //引用分页

export default {
  data() {
    return {
      checkAll: false,
      isDetail:false,//是否显示高级查询
      //高级搜索中的下拉框选项
      selectOption:{
        effectOption:[{label:"无效",value:"0"},{label:"有效",value:"1"}],
        contryOption:[{label:"国内",value:"0"},{label:"国外",value:"1"}],
        freeOption:[{label:"否",value:"0"},{label:"是",value:"1"}],
        haveOption:[{label:"否",value:"0"},{label:"是",value:"1"}],
      },
      //高级搜索值
      highSearch:{
        num:"",//标准号
        name:"",//标准名称
        publictime:"",//发布时间
        realtime:"",//实施时间
        effect:"",//有效性
        contry:"",//国别
        publicOrg:"",//发布组织
        publicNum:"",//发布号
        internationNum:"",//国际标准分类号
        homeNum:"",//国内标准分类号
        free:"",//是否免费
        have:""//是否现行
      },
      libraryData:{
        checkbox:true,
        listData: [
          {
            id: "list1",
            name: "中华人民共和国农业标准化",
            content:
              "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地",
            num1: "xxxx",
            num2: "xxx",
            time: "2018-10-19",
            orgin: "中华人名共和国农业部",
            type: "国家标准",
            price: "200元",
            status: "1",
            buyStatus: "2",
            checked: false
          },
          {
            id: "list2",
            name: "中华人民共和国农业标准化",
            content:
              "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地",
            num1: "xxxx",
            num2: "xxx",
            time: "2018-10-19",
            orgin: "中华人名共和国农业部",
            type: "国家标准",
            price: "200元",
            status: "1",
            buyStatus: "1",
            checked: false
          },
          {
            id: "list3",
            name: "中华人民共和国农业标准化",
            content:
              "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地",
            num1: "xxxx",
            num2: "xxx",
            time: "2018-10-19",
            orgin: "中华人名共和国农业部",
            type: "国家标准",
            price: "200元",
            status: "2",
            buyStatus: "1",
            checked: false
          },
          {
            id: "list4",
            name: "中华人民共和国农业标准化",
            content:
              "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地",
            num1: "xxxx",
            num2: "xxx",
            time: "2018-10-19",
            orgin: "中华人名共和国农业部",
            type: "国家标准",
            price: "200元",
            status: "2",
            buyStatus: "3",
            checked: false
          },
          {
            id: "list5",
            name: "中华人民共和国农业标准化",
            content:
              "是指国民经济中一个重要产业部门，是以土地资源为生产对象的部门，它是通过培育动植物产品从而生产食品及工业原料的产业。农业属于第一产业。利用土地资源进行种植生产的部门是种植业，利用土地上水域空间进行水产养殖的是水产业，又叫渔业，利用土地资源培育采伐林木的部门，是林业，利用土地资源培育或者直接利用草地",
            num1: "xxxx",
            num2: "xxx",
            time: "2018-10-19",
            orgin: "中华人名共和国农业部",
            type: "国家标准",
            price: "200元",
            status: "1",
            buyStatus: "1",
            checked: false
          }
        ]
      }
    };
  },
  components: { pagination,libraryList},
  methods: {
    
  },
  filters: {
    
  }
};
</script>

<style lang="less">
.box {
  border: 1px solid #ebebeb;
  padding: 10px 2% 45px 2%;
}
.el-input__inner{
    height: 30px !important;
}
.el-range-editor.el-input__inner{
  padding: 0px 10px;
}
.el-date-editor .el-range__icon{
  line-height: 28px;
}
.oprate {
  line-height: 45px;
  padding: 0px 2%;
  .rowSearch {
    .searchInput {
      position: relative;
      .el-icon-search {
        position: absolute;
        top: 18px;
        left: 2%;
        padding: 0px 2% 0px 1%;
        border-right: 2px solid #fff;
      }
      input {
        height: 35px;
        line-height: 35px;
        width: 80%;
        border-radius: 15px;
        background: #f2f2f2;
        border: none;
        outline: none;
        padding: 0px 5% 0px 12%;
      }
    }
    .search {
      .btn {
        width: 60%;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #45b779;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    }
    .highSearchBtn {
      text-align: right;
      a {
        color: #45b779;
        font-size: 14px;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .highSearch{
    line-height: 45px;
    font-size: 13px;
    .label{
      width: 40%;
      float: left;
    }
    .print{
      width: 60%;
      float: left;
      .input{
        width: 100%;
      }
    }
    .btn {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: #45b779;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    .quickSearchBtn{
      margin-left: 20px;
      cursor: pointer;
      color: #45b779;
    }
    .quickSearchBtn:hover{
      text-decoration: underline;
    }
  }
  .rowOprate {
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
    .btnCollect {
      background: #45b779;
      color: #fff;
      padding: 6px 12px;
      border-radius: 0px;
    }
    .myCollect {
      background: #697cb4;
      color: #fff;
      padding: 6px 12px;
      border-radius: 0px;
      float: right;
    }
  }
}

#pagination {
  width: 96% !important;
  float: left;
  line-height: 25px !important;
  padding: 0px 2%;
}
</style>


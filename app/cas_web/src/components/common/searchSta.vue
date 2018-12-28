<template>
    <el-row class="searchSta">
      <el-col :offset="3" :sm="4">
          <icon class="cardIcon" scale="3" name="all"></icon>
          <b>标准检索</b> 
      </el-col>
      <el-col :sm="10" class="search">
          <input class="inputSearch" type="text">
      </el-col>
      <el-col :sm="2">
          <el-button>检索</el-button>
      </el-col>
      <el-col :sm="2">
          <a class="searchMore" href="">更多检索</a>
      </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.searchSta{
    margin: 3px 0px;
    color: #45B97B;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    position: relative;
    b{
        font-weight: normal;
        margin-left: 50px;
    }
    .cardIcon{
        position: absolute;
        top: 7px;
        float: left;
    }
    .el-icon-search{
        width: 30px;
        height: 30px;
        margin-right: 15px;
        font-size: 22px;
    }
    .searchMore{
        color:#45B97B;
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
    }
    .searchMore:hover{
        text-decoration: underline;
    }
    .el-button{
        padding: 7px 16px;
        background: #45B97A;
        color: #fff;
        border-radius: 0px;
    }
    .inputSearch{
        padding: 5px 3%;
        width: 90%;
    }
}
</style>

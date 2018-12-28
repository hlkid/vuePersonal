<template>
  <div id="app">
    <!-- <headnav></headnav> -->
    <el-row class="main">
        <el-col :sm="4">
          <slidebar :slideBarData="slideBarData"></slidebar>
        </el-col>
        <el-col :offset="1" :sm="19">
          <router-view></router-view> 
        </el-col>
    </el-row>
  </div>
</template>

<script>
import headnav from "./components/common/header.vue";
import slidebar from "./components/common/slidebar.vue";

export default {
  name: 'App',
  data(){
    return {
      slideBarData:{
        title:{text:"权限管理"},
          listData:[
              {id:"list1",text:"用户管理",pagePath:"/user"},
              {id:"list2",text:"角色管理",pagePath:"/role"}
          ]
      }
    }
  },
  components:{
      headnav,slidebar
  },
}
</script>

<style scoped>
body{
  margin:0;
}
.main{
  background: #F8F8F8;
  padding-top: 20px;
}
</style>

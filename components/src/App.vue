<template>
  <div id="app">
    <a class="title" @click="toPath(item)" v-for="(item,index) in list" :key="index">{{item.name}}</a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      list:[
        {name:"首页",path:"/"},
        {name:"组件应用页面",path:"index"},
      ]
    }
  },
  methods:{
    toPath:function(item){
      this.$router.push({path:item.path})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title{
  margin-left: 20px;
  cursor: pointer;
}
</style>

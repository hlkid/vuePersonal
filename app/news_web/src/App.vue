<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>
import "babel-polyfill";

export default {
  name: 'App',
  data(){
    return {

    }
  }
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

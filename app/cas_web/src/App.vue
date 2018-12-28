<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import headnav from "./components/common/header.vue";

export default {
  name: 'App',
  data(){
    return {

    }
  },
  components:{
      headnav
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

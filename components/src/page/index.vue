<template>
  <div>
    <div>
      加载loading页面：
      <loading :dotColorVal="dotColor" :dotNums="dotNums" :loadingRadiusVal="loadingRadius" :dotRadiusVal="dotRadius" :style="changeStyle"></loading>
    </div>
  </div>
</template>

<script>
import loading from "../components/loading.vue";

export default {
  data() {
    return {
      loadingRadius: 168,
      dotRadius: 20,
      dotColor: "#ff3366",
      dotNums: 13
    };
  },
  components: {
    loading
  },
//   methods:{
//       changeStyle: function() { 
//           let rootEle = document.documentElement; 
//           rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`) 
//           rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`) 
//           rootEle.style.setProperty('--dotColor', this.dotColor) }
//   },
  computed:{
      changeStyle: function() { 
          let rootEle = document.documentElement; 
          rootEle.style.setProperty('--loadingRadius', `${this.loadingRadius}px`) 
          rootEle.style.setProperty('--dotRadius', `${this.dotRadius}px`) 
          rootEle.style.setProperty('--dotColor', this.dotColor) }
  }
};
</script>

<style>
</style>

<template>
  <div class="demoarea">
    <el-tabs :value="tabname" name="demo" type="border-card">
      <el-tab-pane label="示范区信息">
        <demo></demo>
      </el-tab-pane>
      <el-tab-pane name="casemange" label="案例管理">
        <casemange></casemange>
      </el-tab-pane>
      <el-tab-pane name="achieve" label="成果展示">
        <achieve></achieve>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import demo from "./components/demo.vue"; //示范区信息
import casemange from "./components/casemange.vue"; //案例管理
import achieve from "./components/achieve.vue"; //成果展示

export default {
  data() {
    return {
      tabname: ""
    };
  },
  components: { demo, casemange, achieve },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      if(this.$route.query.id){
          if(this.$route.query.id=="demo"){
            this.tabname=""
          }else{
              this.tabname = this.$route.query.id;
          }
      }else{
          this.tabname=""
      }
    }
  }
};
</script>

<style lang="less" scoped>
.demoarea {
  margin: 2%;
}
</style>


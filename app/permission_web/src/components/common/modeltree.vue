<template>
    <div>
        <el-tree
            :default-checked-keys="defalutChecked" ref="tree"
            :data="modeltree"
            show-checkbox
            node-key="id"
            :props="defaultProps">
        </el-tree>
    </div>
</template>

<script>
import {moduleGet} from "../../js/common.js"

export default {
  data() {
    return {
      modeltree: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  props:["defalutChecked"],
  mounted(){
    this.getmodeltree();
  },
  methods:{
    //获取模块树
    getmodeltree:function(){
      this.modeltree=moduleGet();
    },
    //获取选中的模块
    moduleSelected:function(){
      return this.$refs.tree.getCheckedKeys();
    }
  }
};
</script>

<style>
</style>

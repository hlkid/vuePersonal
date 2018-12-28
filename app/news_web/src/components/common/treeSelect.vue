<template>
    <div class="treeSelect">
        <el-input class="input" placeholder="请选择栏目" v-model="formData.inspectObjectName" readonly="readonly" @click.native="isShowSelect = !isShowSelect"></el-input>
        <i :class="!isShowSelect?'el-icon-caret-right':'el-icon-caret-bottom'"></i>
        <el-tree v-if="isShowSelect" empty-text="暂无数据" accordion :expand-on-click-node="true" :data="inspectionObjectOptions" :props="defaultProps" @node-click="handleNodeClick" class="tree">
        </el-tree>
    </div>
</template>

<script>
import {columnGet} from "../../js/common.js"//从公用方法中获取——栏目树

export default {
  props:["columInit"],
  data() {
    return {
      formData: {
        // 传给后台的id
        inspectObject: "",
        // 输入框显示的
        inspectObjectName: this.columInit
      },
      // 是否显示巡检对象的树状选择器
      isShowSelect: false,
      // 巡检对象的选项数据
      inspectionObjectOptions: [],
      // 巡检对象的选项的配置参数
      defaultProps: {
        children: 'children',
          label: 'label'
      }
    };
  },
  mounted(){
      this.columnGet();
  },
  methods: {
    // 点击巡检对象的选择器的树节点
    handleNodeClick(data, Node) {
      console.info(data)
      // 如果是顶级父节点
      if (data.children.length>0) {
        // 不会触发事件
      } else {
        this.formData.inspectObjectName = data.label;
        this.formData.inspectObject = data.id;
        // 关闭选择器
        this.isShowSelect = false;
        //给服组件传值
        this.$emit("cloumnChose",{id:data.id,label:data.label});
      }
    },
    //获取栏目数据
      columnGet:function(){
          this.inspectionObjectOptions=columnGet();
      }
  }
};
</script>

<style lang="less" scoped>
.treeSelect{
    position: relative;
    .input{
        cursor: pointer;
    }
    i{
        width: 10px;
        height: 10px;
        display: block;
        position: absolute;
        top: 12px;
        right: 25px;
        color: #dcdfe6;
    }
    .tree {
        position: absolute;
        overflow: auto;
        z-index: 100;
        width: 100%;
    }
}
</style>

<style>

</style>

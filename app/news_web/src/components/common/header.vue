<template>
<div>
    <el-row class="head">
            <el-col>
                <div class="logo">信息编辑</div>
            </el-col>
        </el-row>
    </div>  
</template>

<script>
import { dateToString } from "../../js/common.js";

export default {
  data() {
    return {
      navFlag: 1, //当前地址栏页
      time: ""
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.head {
  height: 50px;
  background: linear-gradient(to right, #10a6b4, #19c7fa);
  color: #fff;
  .logo {
    width: 100%;
    text-align: center;
    font-size: 23px;
    height: 23px;
    line-height: 20px;
    margin: 10px 0px 0px 0px;
    -webkit-box-reflect: below 4px -webkit-linear-gradient(transparent, transparent
          50%, white);
  }
}
</style>



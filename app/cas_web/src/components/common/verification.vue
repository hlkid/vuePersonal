<template>
    <div @click="createCode"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 图片验证码
    createCode() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(0,1,2,3,4,5,6,7,8,9,
      );
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 36);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    }
  }
};
</script>

<style>
</style>

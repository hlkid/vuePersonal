<template>
  <div id="pagination">
    <div class="text">当前显示第<b>{{paginationData.currentPage}}</b>页，共<b>{{paginationData.pages}}</b>页，共<b>{{paginationData.totalCount}}</b>条数据</div>
    <div class="oprate">
      <button @click="next()">下一页</button>
      <button @click="skip()">跳页</button>
      <input min="1" type="number" v-model="skipNum">
      <button @click="pre()">上一页</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["paginationData"],
  data() {
    return {
      skipNum: this.paginationData.currentPage
    };
  },
  methods: {
    next: function() {
      if (this.paginationData.currentPage >= this.paginationData.pages) {
        this.$message({
          type: "error",
          message: "没有更多页了!"
        });
      } else {
        this.skipNum = this.paginationData.currentPage + 1;
        this.$emit("listPagination", this.skipNum);
      }
    },
    pre: function() {
      if (this.paginationData.currentPage <= 1) {
        this.$message({
          type: "error",
          message: "已经是最前页了!"
        });
      } else {
        this.skipNum = this.paginationData.currentPage - 1;
        this.$emit("listPagination", this.skipNum);
      }
    },
    skip: function() {
      if (this.skipNum < 1 || this.skipNum > this.paginationData.pages) {
        this.$message({
          type: "error",
          message:
            "请输入最大页面数" + this.paginationData.pages + "以内的正确整数"
        });
      } else {
        this.$emit("listPagination", Number(this.skipNum));
      }
    }
  }
};
</script>

<style scoped>
#pagination {
  float: left;
  width: 96%;
  padding: 15px 2%;
}
#pagination {
  height: 25px;
  line-height: 25px;
  color: #464646;
  font-size: 14px;
}
#pagination .text {
  float: left;
  width: 46%;
}
#pagination b {
  color: #2f93f6;
  margin: 0px 5px;
}
#pagination .oprate {
  float: right;
  width: 46%;
  line-height: 50px;
}
#pagination .oprate button {
  float: right;
  margin-left: 8px;
  background: linear-gradient(to bottom, #fefefe, #fafafa);
  border: 1px solid #c5c5c5;
  height: 25px;
  line-height: 25px;
  padding: 3px 8px;
  cursor: pointer;
}
#pagination .oprate input {
  float: right;
  width: 50px;
  height: 18px;
  margin-left: 8px;
  text-align: center;
}
</style>

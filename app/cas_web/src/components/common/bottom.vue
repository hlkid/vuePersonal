<template>
  <div class="bottom">
    <el-row>
      <el-col :sm="10" :offset="7">
        <ul>
          <li v-for="item in liList" :key="item.id">
            <a @click="linkHref(item)">
              <i v-show="item.id=='li1'"></i>
              <i v-show="item.id=='li2'"></i>
              {{item.name}}</a>
          </li>
        </ul>
        <p>地址：{{address}}
          <span class="info">电话：{{telephone}} </span>
          <span class="info">E-MAIL：{{mail}}</span>
        </p>
        <p>版权所有：{{copyRight}}
          <span class="info">技术支持：{{support}}</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liList: [
        { id: "li1", name: "网站首页", url: "/" },
        { id: "li2", name: "关于我们", url: "/aboutUs" },
        { id: "li3", name: "版权说明", url: "aboutUs/copyright" },
        { id: "li4", name: "帮助中心", url: "/help" }
      ],
      address: "安徽省合肥包河区包河大道xxx号",
      telephone: "0551-xxxxxx",
      mail: "anhuizjj@163.com",
      copyRight: "安徽质量监督检测中心",
      support: "阳信软件",
      allAccess: "86541"
    };
  },
  methods: {
    //跳转对应路由
    linkHref: function(item) {
      this.$router.push({ path: item.url });
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
  background: #45b779;
  ul {
    list-style: none;
    margin: 10px 0px;
    font-size: 14px;
    padding-left: 0px;
    text-align: left;
    width: 100%;
    float: left;
    li {
      float: left;
      a {
        border-right: 1px #fff solid;
        color: #fff;
        display: block;
        text-decoration: none;
        white-space: nowrap;
        padding: 0px 19px;
        height: 15px;
        line-height: 15px;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  p{
    margin: 10px 0px;
    font-size: 12px;
    color: #fff;
    .info{
      margin-right: 15px;
      float: left;
    }
  }
}
</style>

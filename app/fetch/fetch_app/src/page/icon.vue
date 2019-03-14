<template>
  <div class="catalog">
    <div class="head">目录<span class="icon">
        <icon scale="2" name="backstage_slidehide"></icon>
      </span></div>
    <div class="listBox">
      <div :class="{listActive:item.id==listActive}" v-for="item in list" :key="item.id" class="list">
        <icon class="icon" scale="2" :name="item.icon"></icon>{{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      listActive: "list1",
      list: [
        {
          id: "list1",
          name: "标准管理",
          path: "/backstageMan/data",
          icon: "backstage_data"
        },
        {
          id: "list5",
          name: "比对示例",
          path: "/backstageMan/settle",
          icon: "backstage_settle"
        },
        {
          id: "list2",
          name: "培训管理",
          path: "/backstageMan/train",
          icon: "backstage_train"
        },
        {
          id: "list8",
          name: "购买确认",
          path: "/backstageMan/application",
          icon: "backstage_application"
        },
        {
          id: "list3",
          name: "推广服务管理",
          path: "/backstageMan/demoarea",
          icon: "backstage_demoarea"
        },
        {
          id: "list4",
          name: "在线申请管理",
          path: "/backstageMan/application",
          icon: "backstage_application"
        },
        {
          id: "list6",
          name: "信息管理",
          path: "/backstageMan/info_view",
          icon: "backstage_info"
        },
        {
          id: "list7",
          name: "权限管理",
          path: "/backstageMan/basic_view",
          icon: "backstage_basic"
        }
      ]
    };
  },
  mounted() {},
  computed: {
    ...mapState(["news_url", "permison_url"])
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.catalog {
  margin: 20px;
  background: #fff;
  border: 1px solid #dddddd;
  .head {
    line-height: 35px;
    font-size: 16px;
    font-weight: bold;
    padding: 0px 15px;
    border-bottom: 1px solid #dddddd;
    position: relative;
    .icon {
      position: absolute;
      top: 2px;
      right: 20px;
      cursor: pointer;
    }
  }
  .listBox {
    padding: 10px 15px;
    .list {
      line-height: 30px;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 5px 10px;
      margin: 8px 0px;
      font-size: 14px;
      border: 1px solid #dddddd;
      cursor: pointer;
      .icon {
        float: left;
        width: 21px;
        margin-top: 6px;
        margin-right: 8px;
      }
    }
    .list:hover {
      background: #10a6b4;
      color: #fff;
      border: 1px solid #008794;
    }
    .listActive {
      background: #10a6b4;
      color: #fff;
      border: 1px solid #008794;
    }
  }
}
</style>


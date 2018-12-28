<template>
    <div class="serviceSys">
        <el-row>
            <el-col :offset="3" :sm="18">
                <div class="head">
                    <b>体系服务</b><br>
                    SYSTEM SERVICE
                </div>
                <div class="main">
                    <div @click="toPath(item)" class="card" v-for="item in cardData" :key="item.id">
                        <icon class="cardIcon" scale="8" :name="item.icon"></icon><br>
                        <b>{{item.name}}</b>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cardData: [
        { id: "card1", name: "农业标准体系建设", icon: "sta",path:"/serviceSys/sta" },
        { id: "card2", name: "标准制修订", icon: "rev",path:"/serviceSys/rev" },
        { id: "card3", name: "标准查新", icon: "new",path:"/serviceSys/new" },
        { id: "card4", name: "标准托管", icon: "support",path:"/serviceSys/support" },
        { id: "card5", name: "标准化试点示范", icon: "demo",path:"/serviceSys/demo" },
        { id: "card6", name: "标准评估", icon: "ass",path:"/serviceSys/ass" },
        { id: "card7", name: "标准对比", icon: "vs",path:"/serviceSys/vs" }
      ]
    };
  },
  methods:{
    toPath:function(item){//跳转到对应页面
      this.$router.push({path:item.path});
    }
  }
};
</script>

<style lang="less" scoped>
.serviceSys{
    padding-top: 10px;
    background: #fff;
    .head{
        height: 40px;
        color: #B2B2B2;
        b{
            color: #000;
        }
    }
    .main{
        .card{
            width: 120px;
            height: 120px;
            color: #45B97A;
            text-align: center;
            margin-right: 15px;
            margin-top: 10px;
            background: #FAFAFA;
            border: 1px solid #ECECEC;
            float: left;
            font-size: 14px;
            cursor: pointer;
            b{
                font-weight: normal;
            }
            .cardIcon{
                width: 50px;
                height: 50px;
                margin: 15px 30px;
            }
        }
        .card:hover{
            background: #45B97A;
            color: #fff;
        }
    }
}
</style>


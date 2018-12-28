<template>
    <div class="demoshow">
        <el-row>
            <el-col :offset="3" :sm="18">
                <div class="head">
                    <b>专家风采</b><br>
                    EXPERTS
                </div>
                <div class="main">
                    <div class="swiper-container experts">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in demoData" :key="item.id">
                                <img :src="item.url" alt="">
                                <div class="text">{{item.name}}</div>
                            </div>
                         </div>
                         
                    </div>
                    <div class="swiper-button-prev"></div><!--左箭头-->
                          <div class="swiper-button-next"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  data() {
    return {
      demoData: [
        {
          id: "card1",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇1",
          url: require("../../assets/temp/expert1.jpg")
        },
        {
          id: "card2",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇2",
          url: require("../../assets/temp/expert2.jpg")
        },
        {
          id: "card3",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇3",
          url: require("../../assets/temp/expert3.jpg")
        },
        {
          id: "card4",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇4",
          url: require("../../assets/temp/expert4.jpg")
        },
        {
          id: "card5",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇5",
          url: require("../../assets/temp/expert5.jpg")
        },
        {
          id: "card6",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇1",
          url: require("../../assets/temp/expert1.jpg")
        },
        {
          id: "card7",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇2",
          url: require("../../assets/temp/expert2.jpg")
        },
        {
          id: "card8",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇3",
          url: require("../../assets/temp/expert3.jpg")
        },
        {
          id: "card9",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇4",
          url: require("../../assets/temp/expert4.jpg")
        },
        {
          id: "card10",
          name: "袁隆平是杂交水稻研究领域的开创者和带头法”杂交 水稻、技术成果， [2]  出版中、英文专著6部，发表论文60余篇5",
          url: require("../../assets/temp/expert5.jpg")
        }
      ]
    };
  },
  mounted: function() {
    //配置Swiper  建议关于Swiper配置方面可以前往Swiper官网
    new Swiper(".experts", {
      slidesPerView: 5,
      spaceBetween: 30,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.demoshow {
  padding-top: 15px;
  background: #fff;
  .head {
    height: 40px;
    color: #b2b2b2;
    b {
      color: #000;
    }
  }
  .main {
    height: 200px;
    .experts{
      width: 84%;
    }
    .swiper-button-prev{
      position: absolute;
      left: 13%;;
    }
    .swiper-button-next{
      position: absolute;
      right: 13%;;
    }
    .swiper-slide {
      width: 100px;
      height: 180px;
      cursor: pointer;
      img {
        width: 100%;
        position: absolute;
        min-height: 180px;
      }
      .text {
        padding: 10px;
        height: 180px;
        background: #45b97a;
        opacity: 0;
        z-index: 666;
      }
      .text:hover {
        opacity: 0.7;
      }
    }
    .swiper-slide:hover {
      background: #45b97a;
      color: #fff;
    }
  }
}
</style>


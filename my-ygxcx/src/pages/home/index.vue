<template>
  <div>
    <!-- search 头部 -->
    <div class="top_hoder">
      <input type="search" />
      <div class="search_wz">
        <icon type="search" size="14" color="#bbbbbb" />
        <p>搜索</p>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="lunbo">
      <swiper indicator-dots autoplay interval="3000" duration="300" circular>
        <swiper-item v-for="(item,index) in lubList" :key="index">
          <img class="lunbo_t" :src="item.image_src" />
        </swiper-item>
      </swiper>
    </div>

    <!-- 中部导航 -->
    <div class="nav_zbtab">
      <ul>
        <li>
          <a href="#">
            <img
              src="//img.alicdn.com/bao/uploaded/i3/TB17fLDFVXXXXbAXXXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp"
            />
            <p>首页</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="//img.alicdn.com/bao/uploaded/i3/TB17fLDFVXXXXbAXXXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp"
            />
            <p>分类</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="//img.alicdn.com/bao/uploaded/i3/TB17fLDFVXXXXbAXXXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp"
            />
            <p>购物车</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="//img.alicdn.com/bao/uploaded/i3/TB17fLDFVXXXXbAXXXXXXXXXXXX_!!0-item_pic.jpg_180x180q90.jpg_.webp"
            />
            <p>我</p>
          </a>
        </li>
      </ul>
    </div>

    <!-- banner -->
    <div class="banner_1">
      <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
    </div>

    <!-- 时尚女装 -->
    <div class="boxNnrcl">
      <div class="boxNnrcl_dc">
        <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
      </div>
      <div class="boxNnrcl_dc">
        <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
      </div>
      <div class="boxNnrcl_dc">
        <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
      </div>
      <div class="boxNnrcl_dc">
        <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
      </div>
      <div class="boxNnrcl_dc">
        <img src="https://aecpm.alicdn.com/simba/img/TB1X6uHLVXXXXcCXVXXSutbFXXX.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/wxrequest.js";
export default {
  data() {
    return {
      //轮播图数据源
      lubList: []
    };
  },
  methods: {
    //轮播图接口
    async lunbFun() {
      let res = await wxrequest({
        url: "home/swiperdata",
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.lubList = message;
      }
    }
  },
  created() {
    this.lunbFun();
  }
};
</script>

<style scoped lang="less">
// 头部搜索栏
.top_hoder {
  background-color: #ff2d4a;
  padding: 0 16rpx;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100rpx;
  width: 100%;
  z-index: 999;
  input {
    border-radius: 4px;
    height: 60rpx;
    line-height: 60rpx;
    background: #fff;
    width: 100%;
    margin-top: 20rpx;
  }
  .search_wz {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    p {
      color: #bbbbbb;
      display: inline-block;
      font-size: 14px;
      padding-left: 8rpx;
    }
  }
}
.lunbo {
  margin-top: 100rpx;
  swiper {
    height: 300rpx;
    .lunbo_t {
      width: 100%;
    }
  }
}
//中部导航
.nav_zbtab {
  width: 100%;
  height: 188rpx;
  ul {
    width: 100%;
    overflow: hidden;
    li {
      width: 25%;
      height: 188rpx;
      float: left;
      a {
        width: 25%;
        display: block;
        width: 120rpx;
        margin-left: 50%;
        margin-top: 50%;
        overflow: hidden;
        transform: translate(-50%, -50%);
        img {
          width: 120rpx;
          height: 120rpx;
        }
        p {
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
}
.banner_1 {
  width: 100%;
  height: 88rpx;
  img {
    width: 100%;
    height: 100%;
  }
}

// 列表
.boxNnrcl {
  overflow: hidden;
  box-sizing: border-box;
  padding: 18rpx;
  .boxNnrcl_dc {
    float: left;
    width: 233rpx;
    height: 186rpx;
    margin-bottom: 10rpx;
    img {
      width: 100%;
      height: 100%;
    }
    &:nth-child(2n) {
      margin-right: 10rpx;
    }
    &:first-child {
      height: 382rpx;
      margin-right: 10rpx;
    }
  }
}
</style>

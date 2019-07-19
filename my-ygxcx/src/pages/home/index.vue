<template>
  <div>
    <!-- search 头部 -->
    <div class="top_hoder">
      <input @click="tosearch" type="search" />
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
        <li v-for="(item,index) in navList" :key="index">
          <a href="#">
            <img :src="item.image_src" />
            <p>{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>

    <div class="nrlb_box" v-for="(item,index) in nrclList" :key="index">
      <!-- banner -->
      <div class="banner_1">
        <img :src="item.floor_title.image_src" />
        <span>{{item.floor_title.name}}</span>
      </div>
      <!-- 时尚女装 -->
      <div class="boxNnrcl">
        <div class="boxNnrcl_dc" v-for="(item2,index2) in item.product_list" :key="index2">
          <img :src="item2.image_src" />
        </div>
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
      lubList: [],
      //获取分类列表
      navList: [],
      //内容列表
      nrclList: []
    };
  },
  methods: {
    //轮播图接口
    async lunbFun() {
      let res = await wxrequest({
        url: "api/public/v1/home/swiperdata",
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.lubList = message;
      }
    },
    //获取分类列表
    async zbDh() {
      let res = await wxrequest({
        url: "api/public/v1/home/catitems",
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.navList = message;
      }
    },
    //内容列表
    async nrLbFun() {
      let res = await wxrequest({
        url: "api/public/v1/home/floordata",
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.nrclList = message;
        console.log(this.nrclList);
      }
    },
    tosearch() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    }
  },
  mounted() {
    this.lunbFun();
    this.zbDh();
    this.nrLbFun();
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
        width: 80rpx;
        margin-left: 50%;
        margin-top: 50%;
        overflow: hidden;
        transform: translate(-50%, -50%);
        img {
          width: 80rpx;
          height: 80rpx;
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
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    top: 50%;
    left: 30rpx;
    transform: translate(0, -50%);
  }
}

// 列表
.nrlb_box {
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
}
</style>

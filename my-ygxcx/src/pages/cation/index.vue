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
    <!-- 内容区域 -->
    <div class="content">
      <!-- 左边 -->
      <div class="content_left">
        <div
          @click="changeActiveNul(index)"
          class="content_left_nr"
          :class="{active:activeNul === index}"
          v-for="(item,index) in leftList"
          :key="index"
        >{{item.cat_name}}</div>
      </div>
      <!-- 右边 -->
      <div class="content_right">
        <img
          class="nrimg"
          src="//img.alicdn.com/imgextra/i3/1699606091346068557/TB2yd6RaeUkyKJjSsphXXbdaVXa_!!0-saturn_solar.jpg_220x220.jpg_.webp"
          alt
        />
        <div class="content_right_box" v-for="(item2,index2) in nrtList" :key="index2">
          <div class="title">
            <span>/</span>
            {{item2.cat_name}}
            <span>/</span>
          </div>
          <div class="nrxx_lec" v-for="(item3,index3) in item2.children" :key="index3">
            <a :href="'/pages/searchNcc/main?query='+item3.cat_name">
              <img class="nrxx_lec_img" :src="'https://autumnfish.cn/wx/'+item3.cat_icon" alt />
              <span>{{item3.cat_name}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容区域end -->
  </div>
</template>

<script>
import wxrequest from "../../utils/wxrequest.js";
export default {
  data() {
    return {
      //左侧 active 是否显示
      activeNul: 0,
      //分类数据源
      leftList: [],
      //右边内容数据源
      nrtList: []
    };
  },
  methods: {
    //传入标识 改变 activeNul 的值
    changeActiveNul(index) {
      // 动态设置导航选中状态
      this.activeNul = index;
      // 动态设置右边内容数据源
      this.nrtList = this.leftList[index].children;
    },
    //获取左导航数据
    async nleftFun() {
      let res = await wxrequest({
        url: "api/public/v1/categories",
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.leftList = message;
        this.nrtList = this.leftList[this.activeNul].children;
      }
    }
  },
  mounted() {
    this.nleftFun();
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
//中部内容
.content {
  position: absolute;
  top: 100rpx;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  .content_left {
    width: 198rpx;
    height: 100%;
    overflow: auto;
    color: #363636;
    .content_left_nr {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
    }
    .active {
      color: #ff2d4a;
      position: relative;
      &:before {
        content: "";
        width: 8rpx;
        height: 60rpx;
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        background: #ff2d4a;
        transform: translate(0, -50%);
      }
    }
  }
  .content_right {
    flex: 1;
    box-sizing: border-box;
    padding: 20rpx 16rpx;
    overflow: auto;
    .nrimg {
      width: 100%;
      height: 180rpx;
    }
    .content_right_box {
      color: #333333;
      display: flex;
      flex-wrap: wrap;
      .title {
        height: 96rpx;
        width: 100%;
        line-height: 96rpx;
        text-align: center;
        color: #363636;
        font-size: 16px;
        margin-bottom: 20rpx;
        span {
          &:first-child {
            margin-right: 20rpx;
          }
          &:last-child {
            margin-left: 20rpx;
          }
        }
      }
      .nrxx_lec {
        width: 33.3333%;
        text-align: center;
        margin-bottom: 30rpx;
        img {
          width: 80%;
          height: 80rpx;
        }
        span {
          font-size: 14px;
          display: block;
        }
      }
    }
  }
}
</style>

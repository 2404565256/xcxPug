<template>
  <div>
    <!-- search 头部 -->
    <div class="top_hoder" :style="{position :topc}">
      <input type="search" v-model="query" placeholder="请输入内容" />
      <div class="search_wz">
        <icon type="search" size="14" color="#bbbbbb" />
      </div>
    </div>
    <!-- 排序导航 -->
    <div class="nav_box" :style="{position:topc}">
      <div
        class="nav_box_ck"
        @click="activeFun(index)"
        :class="{active:nvNun === index}"
        v-for="(item,index) in navData"
        :key="index"
      >{{item}}</div>
    </div>

    <!-- 内容区域 -->
    <div class="nerBox" :style="{ marginTop:topcTop}">
      <div class="nerBox_list" v-for="(item,index) in dataList" :key="index">
        <div class="nerBox_lb_left">
          <img :src="item.goods_small_logo" alt />
        </div>
        <div class="nerBox_lb_right">
          <div class="nerBox_lb_right_nr">{{item.goods_name}}</div>
          <div class="nerBox_lb_right_jg">
            ￥
            <span>{{item.goods_price}}</span>
          </div>
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
      //初始搜索参数
      query: "",
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 10,
      // 导航数据源
      navData: ["综合", "销量", "价格"],
      //默认选中状态 nav_box
      nvNun: 0,
      //数据源
      dataList: [],
      //数据总条数
      total: -1,
      //开关
      navKg: true,
      //滚动条===0 的时候改为标准定为
      topc: "static",
      topcTop: "0px"
    };
  },
  methods: {
    // active 选中状态
    activeFun(index) {
      this.nvNun = index;
    },
    //获取综合数据列表
    async getFun() {
      wx.showLoading({
        title: "加载中"
      });
      // 如果当前 数据源的长度  =  总条数   就 return
      if (this.dataList.length === this.total) {
        this.pagenum--;
        return;
      }
      //开关 如果数据加载完毕 才往下执行
      if (this.navKg === false) {
        return;
      }
      this.navKg = false;
      let res = await wxrequest({
        url: "api/public/v1/goods/search",
        data: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        header: {
          "content-type": "json" // 默认值
        }
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        this.total = message.total;
        this.dataList = [...this.dataList, ...message.goods];
      }
      wx.hideLoading();
      this.navKg = true;
      wx.stopPullDownRefresh();
    }
  },
  onLoad(options) {
    this.query = options.query;
    //获取综合数据列表 调用
    this.getFun();
  },
  //上拉触底事件
  onReachBottom() {
    this.pagenum++;
    this.getFun();
  },
  //下拉事件刷新
  onPullDownRefresh() {
    // 当前页
    this.pagenum = 1;
    // 页容量
    this.pagesize = 10;
    this.total = -1;
    this.dataList = [];
    //开关
    this.navKg = true;
    this.getFun();
    console.log("下拉了");
  },
  //页面滚动触发事件的处理函数
  onPageScroll(scroll) {
    if (scroll.scrollTop === 0) {
      this.topc = "static";
      this.topcTop = "0px";
    } else {
      this.topc = "flex";
      this.topcTop = "200px";
    }
  }
};
</script>

<style scoped lang="less">
// 头部搜索栏
.top_hoder {
  background-color: #eeeeee;
  padding: 0 16rpx;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100rpx;
  padding-top: 20rpx;
  width: 100%;
  z-index: 999;
  input {
    border-radius: 4px;
    height: 60rpx;
    line-height: 60rpx;
    background: #fff;
    width: 100%;
    // margin-top: 20rpx;
    box-sizing: border-box;
    padding-left: 40rpx;
    font-size: 14px;
  }
  .search_wz {
    position: absolute;
    top: 50%;
    left: 25rpx;
    transform: translate(0, -50%);
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
//nav 导航
.nav_box {
  display: flex;
  top: 100rpx;
  height: 100rpx;
  width: 100%;
  left: 0;
  position: fixed;
  flex-wrap: wrap;
  border-bottom: 1px solid #999;
  background: #fff;
  .nav_box_ck {
    flex: 1;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
  }
  .active {
    color: #ff2d4a;
  }
}
//内容
.nerBox {
  width: 100%;
  margin-top: 200rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  .nerBox_list {
    width: 100%;
    height: 200rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
    padding: 30rpx 0;
    .nerBox_lb_left {
      width: 200rpx;
      height: 200rpx;
      img {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .nerBox_lb_right {
      flex: 1;
      margin-left: 25rpx;
      .nerBox_lb_right_nr {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .nerBox_lb_right_jg {
        margin-top: 66rpx;
        color: #ff2d4a;
        span {
          font-size: 22px;
        }
      }
    }
  }
}
</style>

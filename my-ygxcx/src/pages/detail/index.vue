<template>
  <div class="big-box">
    <!-- 轮播图 -->
    <swiper class="lunbo" indicator-dots autoplay interval="3000" duration="300" circular>
      <swiper-item
        @click="yultp(item.pics_big_url)"
        v-for="(item,index) in detailObj.pics"
        :key="index"
      >
        <image mode="aspectFit" :src="item.pics_big_url" />
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <div class="msg">
      <div class="price">
        ￥
        <span>{{detailObj.goods_price}}</span>.00
      </div>
      <div class="word">
        <div class="left">{{detailObj.goods_name}}</div>
        <div class="right">
          <i class="iconfont icon-fenxiang"></i>
          转发
          <button open-type="share">转发</button>
        </div>
      </div>
      <div class="send">快递:免运费</div>
    </div>
    <!-- 促销 -->
    <div class="cuxiao">
      <div class="item">
        促销:
        <span class="color">满300减30</span>
      </div>
      <div class="item">
        已选:
        <span>黑色/XL/一件</span>
      </div>
    </div>

    <!-- 图文介绍 -->
    <div class="jshao">
      <div @click="selIndex =0" class="item" :class="{active:selIndex ===0}">图文介绍</div>
      <div @click="selIndex =1" class="item" :class="{active:selIndex ===1}">规格参数</div>
    </div>
    <!-- 选项 -->
    <div class="xuxiang">
      <div v-if="selIndex===0" class="item" v-html="detailObj.goods_introduce"></div>
      <div v-if="selIndex===1" class="item">规格参数</div>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      <div class="start">
        <i class="iconfont icon-kefu"></i>
        联系客服
        <button open-type="contact"></button>
      </div>
      <div class="start" @click="toCart">
        <i class="iconfont icon-gouwuche"></i>
        购物车
      </div>
      <button class="end one">加入购物车</button>
      <button class="end tow">立即购买</button>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/wxrequest.js";

export default {
  data() {
    return {
      selIndex: 0,
      //商品详情参数
      detailObj: {},
      // 传过来的商品ID
      goode_id: 0,
      // 保存图片的数组
      imgList: []
    };
  },
  methods: {
    //点击跳转到 购物车页面
    toCart() {
      wx.switchTab({
        url: "/pages/cart/main"
      });
    },
    async getUl() {
      let res = await wxrequest({
        url: `api/public/v1/goods/detail?goods_id=${this.goode_id}`
      });
      let { message, meta } = res;
      if (meta.status === 200) {
        message.pics.forEach(item => {
          this.imgList.push(item.pics_big_url);
        });
        this.detailObj = message;
      }
    },
    //点击轮播图  图片预览
    yultp(item) {
      wx.previewImage({
        current: item, // 当前显示图片的http链接
        urls: this.imgList // 需要预览的图片http链接列表
      });
    }
  },
  onLoad(options) {
    this.goode_id = options.id;
    this.getUl();
  },
  //点击转发后触发的事件
  onShareAppMessage() {
    console.log("点击了转发");
  }
};
</script>

<style scoped lang="less">
//引入字体图标
@import "../../utils/css/iconfont.css";

@import "./index.less";
</style>

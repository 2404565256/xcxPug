<template>
  <div>
    <!-- search 头部 -->
    <div class="top_hoder" :style="{position :topc}">
      <div class="search_wz">
        <icon type="search" size="14" color="#bbbbbb" />
        <input type="search" v-model="query" placeholder="请输入内容2" />
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
      <a
        :href="'/pages/detail/main?id='+item.goods_id"
        class="nerBox_list"
        v-for="(item,index) in dataList"
        :key="index"
      >
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
      </a>
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
      //改变导航激活的下标
      this.nvNun = index;
      //判断是否点击的是价格
      if (index === 2) {
        //升序排列
        this.dataList.sort((a, b) => a.goods_price - b.goods_price);
      }
    },
    //获取综合数据列表
    async getFun() {
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
      this.navKg = true;
      wx.stopPullDownRefresh();
    }
  },
  onLoad(options) {
    //重置数据  vue 有个特点 请求同一地址时 它会把请求地址 缓存起来 第二次打开 会从缓存中拿   为了解决这个BUG
    // 当前页
    this.pagenum = 1;
    //默认选中综合
    this.nvNun = 0;
    // 数据源
    this.dataList = [];
    // 总条数
    this.total = -1;
    this.navKg = true;
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
    // console.log(scroll.scrollTop);
    console.log(3);
    if (scroll.scrollTop >= 200) {
      this.topc = "fixed";
      this.topcTop = "200px";
    } else {
      this.topc = "static";
      this.topcTop = "0px";
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>

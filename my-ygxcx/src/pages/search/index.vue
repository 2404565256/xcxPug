<template>
  <div>
    <!-- search 头部 -->
    <div class="top_hoder">
      <input @confirm="confirmNet" v-model="query" type="search" placeholder="请输入内容" />
      <button @click="queryNC" v-if="query.length !== 0">取消</button>
      <div class="search_wz">
        <icon type="search" size="14" color="#bbbbbb" />
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="hls">
      <div class="title">
        <span>历史搜索</span>
        <icon @click="removeList" type="clear" size="14" color="#ccc" />
      </div>
      <div class="list">
        <div
          @click="itemSearch(item)"
          class="item"
          v-for="(item,index) in dataList"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/wxrequest.js";

export default {
  data() {
    return {
      //搜索关键字
      query: "",
      //历史记录数据源
      dataList: []
    };
  },
  methods: {
    //点击取消按钮
    queryNC() {
      this.query = "";
    },
    //点击完成触发   移动端会多一个完成按钮  测试就是回车按钮
    confirmNet() {
      wx.navigateTo({
        url: `/pages/searchNcc/main?query=${this.query}`
      });
      this.dataList.unshift(this.query);
      this.dataList = [...new Set(this.dataList)];
      wx.setStorageSync("query", JSON.stringify(this.dataList));
    },
    //点击搜索历史里的记录 触发搜索
    itemSearch(item) {
      this.query = item;
      wx.navigateTo({
        url: `/pages/searchNcc/main?query=${this.query}`
      });
    },
    // 点击X  删除历史记录
    removeList() {
      wx.showModal({
        title: "提示",
        content: "您确定删除么?",
        success: res => {
          if (res.confirm) {
            wx.removeStorageSync("query");
            this.dataList = [];
          }
        }
      });
    }
  },
  onLoad(options) {
    console.log(this.query);
    let res = wx.getStorageSync("query");
    this.dataList = res ? JSON.parse(res) : [];
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>

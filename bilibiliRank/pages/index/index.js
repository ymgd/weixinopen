//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    bili: {
      list: [
        {
          id: 0,
          name: '全区排行榜'
        }, 
        {
          id: 1,
          name: '番剧排行榜'
        }, 
        {
          id: 2,
          name: '原创视频排行榜'
        }
    ]}
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this
    //调用应用实例的方法获取全局数据
  }
})

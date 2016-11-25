// 拿到全局应用程序实例
const app = getApp()
// Douban API 操作
const douban = require('../../utils/douban.js')

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    id:"",
    title: '',
    loading: true,
    movie: {}
  },

   onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    this.data.id = options.id

    douban.subject(this.data.id,function(data){
      //console.log(data.subjects)
      that.setData({title: data.title,movie:data, loading: false })
    })
  },

  onReady:function() {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
  }
})

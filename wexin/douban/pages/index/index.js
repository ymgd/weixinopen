
// Douban API 操作
const douban = require('../../utils/douban.js')
var app = getApp()

Page({
  data:{
   boards: [
      { key: 'in_theaters', name: '正在热映' },
      { key: 'coming_soon', name: '即将上映' },
      { key: 'top250', name: 'T0P250' }
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //app.theme('in_theaters',1,5,function(data){
    douban.theme('in_theaters',1,5,function(data){
      //console.log(data.subjects)
      that.setData({ in_movies: data.subjects, loading: false })
    })
    douban.theme('coming_soon',1,5,function(data){
      //console.log(data.subjects)
      that.setData({ coming_movies: data.subjects, loading: false })
    })

    douban.theme('top250',1,5,function(data){
     // console.log(data.subjects)
      that.setData({ top250_movies: data.subjects, loading: false })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})








var app = getApp()
var WxSearch = require('../../utils/wxSearch/wxSearch.js')

Page({
  data: {
  },
  // 监听页面加载
  onLoad () {
    console.log('Search Page: onLoad.')
    var that = this
    // wxSearch 热门搜索
    WxSearch.init(that, 43, [
      app.globalData.api.data[0].title,
      app.globalData.api.data[1].title,
      app.globalData.api.data[2].title
    ])
    // wxSearch 自动补全
    var mindKeys = new Array()
    for (var i in app.globalData.api.data) {
      mindKeys.push(app.globalData.api.data[i].title)
    }
    WxSearch.initMindKeys(mindKeys)
  },
  // 监听页面初次渲染完成
  onReady () {
    console.log('Search Page: onReady.')
  },
  // 监听页面显示
  onShow () {
    console.log('Search Page: onShow.')
  },
  // 监听页面隐藏
  onHide () {
    console.log('Search Page: onHide.')
  },
  // 监听页面卸载
  onUnload () {
    console.log('Search Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh () {
    console.info('Search Page: onPullDownRefresh.')
  },
  // wxSearch 功能
  wxSearchFn: function(e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that)
  },
  wxSearchInput: function(e) {
    var that = this
    WxSearch.wxSearchInput(e, that)
  },
  wxSearchFocus: function(e) {
    var that = this
    WxSearch.wxSearchFocus(e, that)
  },
  wxSearchBlur: function(e) {
    var that = this
    WxSearch.wxSearchBlur(e, that)
  },
  wxSearchKeyTap:function(e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that)
  },
  wxSearchDeleteKey: function(e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that)
  },
  wxSearchDeleteAll: function(e) {
    var that = this
    WxSearch.wxSearchDeleteAll(that)
  },
  wxSearchTap: function(e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that)
  }
})

const util = require('../../utils/util.js')

Page({
  data: {
    hidden: false,
    events: []
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self = this
    util.getEvents().then(function(data) {
      self.setData({
        hidden: true,
        events: data
      })
    })
  }
})
const api = require('../../lib/api.js');
const util = require('../../lib/util.js');
Page({
  data: {
    text: ""
  },
  onShow: function(options) {
    // Do something when page show.
    },
  onReady: function() {
    // Do something when page ready.一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互.对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
    // wx.setNavigationBarTitle({
    //   title: ""
    // })
  },
  onLoad: function() {
        // Do some initialize when page load.
        var that = this
        util.loadPieceData(function(data){
              // console.log(data);
              that.setData({
                title: data.work + " - " + data.author,
                text: data.quote
              })
        }); 
  },
  onPullDownRefresh: function() {
      // Do something when pull down
      var that = this
      util.loadPieceData(function(data){
              // console.log(data);
              that.setData({
                title: data.work + " - " + data.author,
                text: data.quote
              })
      });
      wx.stopPullDownRefresh()
  },
})
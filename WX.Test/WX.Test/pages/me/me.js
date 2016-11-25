var networkTool = require('../tool/networkRequestTool.js');
Page({
    data:{
        imgUrls:[],
        cells:[]
    },
    onShow:function(){
        //wx.stopPullDownRefresh  停止刷新数据 
    var that = this
    networkTool.getNewsByType('top')
  },
  onPullDownRefresh: function() {
    //   要判断是否正在请求数据，是的话就return
    console.log('下拉刷新数据了...')
  },
  onReachBottom: function() {
     //   要判断是否正在请求数据，是的话就return 
    console.log('滚动到底部了...')
  },

})
//获取应用实例
var app = getApp()
Page({
  data: {
    merchandiseInfo: [],
    startIndex: 80,
    imgShow: 'hidden',
    wHeight: 0,
    wWidth: 0,
    testImg: "../../images/图片丢失.png"
  },

  errImg: function(e){  
    console.log('111')
    console.log(e)
  },  

  //跳转到闲置商品详情界面
  goToMerchandiseInfo: function(event){
    var merchandiseID = event.currentTarget.dataset.merchandiseid
    wx.navigateTo({
      url: '../merchandiseInfo/merchandiseInfo?merchandiseID=' + merchandiseID
    })
  },

  goToTop: function(){
    var that = this
    that.scroll(0, 0)
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    var requestInfo = {}
    requestInfo['startIndex'] = 80
    requestInfo['pageCount'] = 10
    requestInfo['cityID'] = "0"
    requestInfo['provinceID'] = "0"
    requestInfo['merchandiseType'] = "0"
    requestInfo['sortType'] = "0"
    requestInfo['collegeID'] = "0"
    app.getSystemInfo(function(systemInfo){
      that.setData({
        wHeight:systemInfo.windowHeight,
        wWidth:systemInfo.windowWidth,
      })
    }
    )
    app.getMerchandiseList(
      function(merchandiseInfo){
      that.setData({
        merchandiseInfo:merchandiseInfo,
      })},
      requestInfo
    )
  },
  
  //下拉刷新加载
  onPullDownRefresh: function(){
    var that = this
    var requestInfo = {}
    wx.showNavigationBarLoading()
    setTimeout(function(){wx.hideNavigationBarLoading()}, 1000);
    requestInfo['startIndex'] = 80
    console.log(requestInfo['startIndex'])
    requestInfo['pageCount'] = 10
    requestInfo['cityID'] = "0"
    requestInfo['provinceID'] = "0"
    requestInfo['merchandiseType'] = "0"
    requestInfo['sortType'] = "0"
    requestInfo['collegeID'] = "0"
    app.getMerchandiseList(
      function(merchandiseInfo, newStartIndex){
      that.setData({
        merchandiseInfo:merchandiseInfo,
      })}, 
      requestInfo
    )
  },

  //上拉加载
  onReachBottom: function(){
    var that = this
    var requestInfo = {}
    wx.showNavigationBarLoading()
    setTimeout(function(){wx.hideNavigationBarLoading()}, 1000);
    requestInfo['startIndex'] = that.data.startIndex
    console.log(requestInfo['startIndex'])
    requestInfo['pageCount'] = 10
    requestInfo['cityID'] = "0"
    requestInfo['provinceID'] = "0"
    requestInfo['merchandiseType'] = "0"
    requestInfo['sortType'] = "0"
    requestInfo['collegeID'] = "0"
    app.getMerchandiseList(function(merchandiseInfo, newStartIndex){
      if (newStartIndex != 90){
        that.data.imgShow = 'show'
        for (var i=0; i<10; i++)
        {
          that.data.merchandiseInfo.push(merchandiseInfo[i])
        }
      }
      that.setData({
        merchandiseInfo: that.data.merchandiseInfo,
        startIndex: newStartIndex, 
        imgShow: that.data.imgShow
      })
      
      },
      requestInfo
    )
  },


})


//index.js
var imageHelper = require('../../utils/imageHelper.js')

var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    bannerList:[]
  },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    console.log('onLoad')
    this.reqData(this.renderData)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

/**
 * 网络请求
 */
reqData:function(callback){
  var url = getApp().globalData.mainhost+'/banners/All';
  wx.request({
    url:url,
    data:{},
    header:{
      'Content-Type': 'application/json'
    },
    success:function(res){
        callback && callback.call(null,res.data)
    },
    complete:function(){
        console.log('请求完成')
    },
    fail:function(){
       console.log('请求失败')
    }
  })
},
renderData:function(res){
    var result = res.result
    for (var i=0;i<result.length;i++)
    {
      result[i].ImageUrl=imageHelper.imageUrlDispatcher(result[i].ImageUrl,imageHelper.DISKCOVER)                            
    }
    //console.log(result)
    this.setData({
      bannerList:result
    })
}

})

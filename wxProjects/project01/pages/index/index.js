//index.js
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
    interval: 5000,
    duration: 1000,
    proItems:[{
        id:"1001",
        url:"../../images/img_protype_02.jpg",
        proName:"超级好吃1"
      },{
        id:"1002",
         url:"../../images/img_protype_03.jpg",
        proName:"超级好吃2"
        },{
          id:"1003",
           url:"../../images/img_protype_04.jpg",
          proName:"超级好吃3"
          },
          {
            id:"1004",
            url:"../../images/img_protype_05.jpg",
            proName:"超级好吃4"
         }],
  listItems:[{
        id:"1001",
        url:"../../images/demo2.jpg",
        proName:"超级好吃1"
      },{
        id:"1002",
        url:"../../images/demo2.jpg",
        proName:"超级好吃2"
        }]
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('index onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  }
})

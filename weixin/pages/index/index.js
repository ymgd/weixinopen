//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo:{},
    topNews:[],
    techNews:[]
  },
  //事件处理函数
  bindViewTap: function(event) {
    wx.navigateTo({
       url: "../detail/detail?title="+event.currentTarget.dataset.title+"&url="+event.currentTarget.dataset.url
    })
  },
  onLoad: function () {
    //网络请求
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index',
      data: {
        type:'',
        key:'4f7345f035d2c0cbaac6590dff0f2797'
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }, 
      success: function(res){
        
       if (res.data.error_code == 0) {

          that.setData({
          topNews:res.data.result.data.slice(0,5),
          techNews:res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })

    //console.log('onLoad')
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

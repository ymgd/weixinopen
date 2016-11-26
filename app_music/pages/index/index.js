//index.js
//获取应用实例
var app = getApp();
var api = 'http://app.fuckui.com/api.php';
Page({
  data: {
    userInfo: {},
    musicList: {},
    musicInfo: {},
    hasMusic: 0,
    isPlay: 0
  },
  searchMusci: function(e){
    var that = this;
     wx.request({
        url: api,
        data: {
          method: 'music',
          name:e.detail.value.name,
        },
        success: (res)=>{
          that.setData({
            musicList: res.data.data,
            hasMusic: 1
          })
        }
     })
  },
  playThis:function(e){
    this.setData({
      action: {
        method: 'pause'
      },
      isPlay: 0
    })
     wx.request({
       url: api,
       data: {
         method: 'play',
         hash: e.target.dataset.hash
       },
       success: (res)=>{
          this.setData({
            musicInfo: res.data,
            action: {
              method: 'play'
            },
            isPlay: 1
          })
       }
     })
  },
  onLoad: function () {
    console.log('onLoad')
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

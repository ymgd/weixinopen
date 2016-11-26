//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    jokepicData:null
  },
  // 获取笑话
  showjoypic:function(){
    var that=this;
    wx.request({
      url:"http://japi.juhe.cn/joke/img/text.from",
      data:{
        key:'01153a1533485e9e57e5164a5f8c8427',
        page:3,
        pagesize:10
      },success(res){
        console.log(res.data);
        that.setData({
          jokepicData:res.data.result.data
        })
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.showjoypic();
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})

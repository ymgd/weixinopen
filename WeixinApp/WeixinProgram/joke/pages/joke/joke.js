//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    jokeData:null
  },
  // 获取笑话
  showjoke:function(){
    var that=this;
    wx.request({
      url:"http://japi.juhe.cn/joke/content/list.from",
      data:{
        key:'01153a1533485e9e57e5164a5f8c8427',
        page:1,
        pagesize:10,
        sort:'desc',
        time:parseInt(new Date().getTime()/1000)
      },success(res){
        var now = new Date().getTime()/1000;
        console.log(parseInt(new Date().getTime()/1000));
        console.log(res.data.result.data);
        that.setData({
          jokeData:res.data.result.data
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
    this.showjoke();
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

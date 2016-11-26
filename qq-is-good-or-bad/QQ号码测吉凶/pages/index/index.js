//index.js
//获取应用实例
var app = getApp();
var qqNum ;
Page({
  data: {
    userInfo: {},
    qqNum:'',
    content:'',
    analysis:'',
    conclusion:'',
    isEmpty:false
  },
  bindChange:function(e){
     qqNum = e.detail.value
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  submitQQ : function(){
    var that = this;
    that.setData({ loading: true });
    if(!qqNum){
      that.setData({ isEmpty: true ,loading: false });
      return;
    }
    wx.request({
      url: 'http://japi.juhe.cn/qqevaluate/qq?key=1ea8af7d90f278622637877c43bee18c&qq=' + qqNum,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        var data = res.data.result.data;
         that.setData({
            loading: false,
            analysis:data.analysis,
            conclusion:data.conclusion,
            isEmpty: false 
        })
      }
    })
  }
})

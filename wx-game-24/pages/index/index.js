
var app = getApp()
Page({
  data: {
    specification: '玩法说明：\n 进入游戏后，点击数字及运算符得出结果；前几步计算出的结果同样可以点击进行下一步运算。将给出的牌数用尽并得出24即为胜出。',
    userInfo: {},
    gradeArr:[{name: '初级', value: '初级', checked: 'true'},{name: '中级', value: '中级'},{name: '高级', value: '高级'}],
    grade:'初级'
  },
   onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    wx.getStorage({
        key: 'lastScore',
        success: function(res) {
            that.setData({
              lastScore:res.data
            })
        } 
    })
  },
  radioChange: function(e) {
       this.setData({
         grade:e.detail.value
       })
    },
   //计算页
    gotoCount() {     
        wx.navigateTo({ url: '../count/count?grade='+this.data.grade+'&user='+this.data.userInfo.nickName});
    }
    
 
})

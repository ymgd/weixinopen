// 创建应用程序对象
App({
  onLaunch: function () {
    console.log('-----App Launch-----')
  },
  onShow: function () {
    console.log('-----App Show----')
  },
  onHide: function () {
    console.log('-----App Hide-----')
  },

// 获取用户信息
 getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        su ccess: function () {
          wx.getUserInfo({
             success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData:{
    userInfo:null
  }

// 豆瓣电影主题API调用作为全局方法，热映：in_theaters  coming_soon  top250
/* 调用的API可以写到全局js中，优点是方便调用，缺点是每次加载都会调用。不建议这么写，最好写到utils工具函数中
 theme:function(type,page=1,count=20,result){
   const params = { start: (page - 1) * count, count: count }
   wx.request({
      url: "https://api.douban.com/v2/movie/"+type,
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
         console.log(res.data)
          result(res.data)
      }
     })
 },
*/

})

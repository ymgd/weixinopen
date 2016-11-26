//app.js
App({
  detail: function(e){
    wx.navigateTo({//页面跳转
      url: "../detail/detail?id=" + e.currentTarget.id//获取电影id有两种方法，第一种是直接传入到onLoad函数中的参数中
    })
    wx.setStorageSync('movieID',e.currentTarget.id)//第二种方法是直接保存在本地缓存中
  }
})
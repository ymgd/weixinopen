// goods.js
var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    goods:{},
    modal:true,
    count:0,
    n:0,
    m:4
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.request({
        url: "https://romeo.wang/goods.php",
        data: {
            n:this.data.n,
            m:this.data.m
        },
        success: function(res){
            that.setData({
                goods: res.data.goods,
                count: res.data.count
            })
            //console.log(that.data.goods)
        },
        fail: function(){

        }
    })
  },
  onConfirm:function(){
      this.setData({
          modal:true
      }),
      wx.redirectTo({
          url: "../index/index"
      })
  },
  onPrevPage:function(){
      var that = this
      wx.request({
        url: "https://romeo.wang/goods.php",
        data: {
            n:this.data.n==0?0:this.data.n-4,
            m:this.data.n==0?4:this.data.m-4
        },
        success: function(res){
            that.setData({
                goods: res.data.goods,
            })
            //console.log(that.data.goods)
        },
        fail: function(){

        }
      })
  },
  onNextPage:function(){
      var that = this
      wx.request({
        url: "https://romeo.wang/goods.php",
        data: {
            n:this.data.m>=this.data.count?this.data.n:this.data.n+4,
            m:this.data.m>=this.data.count?this.data.m:this.data.m+4
        },
        success: function(res){
            that.setData({
                goods: res.data.goods,
            })
            //console.log(that.data.goods)
        },
        fail: function(){

        }
      })
  },
  onGoodInfo:function(e){
      wx.setStorage({
          key: 'goodInfo',
          data: this.data.goods[e.currentTarget.id],
          success: function(){
              wx.navigateTo({
                  url: "../goodInfo/goodInfo"
              })
          }
      })
  }
})
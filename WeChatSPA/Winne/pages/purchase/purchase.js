// purchase.js
var app = getApp()
Page({
  data:{
    // text:"这是一个页面"
    good: {},
    count: 1,
    price: 0,
    modal: true
  },
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.getStorage({
        key: "goodInfo",
        success:function(res){
            that.setData({
                good: res.data,
                price: res.data.price
            })
        },
        fail:function(res){
            that.setData({
                modal: false
            })
        }
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({
        count:1,
        price:this.data.good.price
    })
  },
  onConfirm:function(){
      this.setData({
          modal: true
      })
      wx.navigateBack()
  },
  onChange:function(e){
     this.setData({
         count: e.detail.value,
         price: this.data.good.price*e.detail.value
     })
  },
  onPay:function(){
    var date = new Date()
    wx.requestPayment({
      //此 API 调用仅为示例，数据均无效
        'timeStamp': date.getTime(),
        'nonceStr': app.randomString(),
        'package': 'prepay_id=1',
        'signType': 'MD5',
        'paySign': '9A0A8659F005D6984697E2CA0A9CF3B7',
        'success':function(res){
            console.log('支付成功！')
        },
        'fail':function(res){
            console.log('支付失败！')
        }
    })
  }
})
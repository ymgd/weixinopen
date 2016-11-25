var util = require('../../../utils/util.js')
Page({
  data:{
    key:"",
    val:"",
    show:""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindKeyInput: function(e) {
    this.setData({
      key: e.detail.value
    })
  },
  bindDataInput: function(e) {
    this.setData({
      val: e.detail.value
    })
  },
  validate:function(t){
      var _key = this.data.key
      var _val = this.data.val
      if(t == 0){
          if(util.isEmptyValue(_key) || util.isEmptyValue(_val)){
            wx.showModal({
                title: '提示',
                content: 'key和data都不能为空',
                showCancel:false,
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })

              return false
          }
       }else if(t == 1){
          if(util.isEmptyValue(_key)){
            wx.showModal({
                title: '提示',
                content: 'key不能为空',
                showCancel:false,
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })

              return false
          }
       }


      return {
          key:_key,
          val:_val
        };

  },
  setStorage:function(){
    var _res = this.validate(0)
    if(_res){
      wx.setStorage({
        key:_res.key,
        data:_res.val,
         success: function(res) {
            console.log('接口调用成功的回调函数')
         },
         fail:function(){
           console.log('接口调用失败的回调函数')
         },
         complete:function(){
           console.log('接口调用结束的回调函数（调用成功、失败都会执行）')
         }
      })
    }
    
  },
  getStorage:function(){

     var _res = this.validate(1);
     var that = this
     if(_res){
        wx.getStorage({
          key:_res.key,
          success: function(res) {
              console.log("getStorage:",res.data)
              that.setData({val:res.data,show:'show'});

          } 
        })
     }
  },
  removeStorage:function(e){

    console.log(e.target.dataset.val);

     var _res = this.validate(1);
     var that = this
     if(_res){
        wx.removeStorage({
          key:_res.key,
          success: function(res) {
            console.log(res.data)
            that.setData({key:"",val:"",show:""});
           
            wx.showToast({
              title: '移除成功',
              duration: 5000
            })

            setTimeout(function(){
              wx.hideToast()
            },2000)
          } 
        })
     }
  },
  clearStorage:function(){
    wx.clearStorage()
  }
  
})
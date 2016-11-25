Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.info("12314")
    this.alert()
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
  alert:function(){
     wx.request({
         url:"http://localhost:8080/SearchWeb/1.htm",
         success: function(res){
             console.info(res)
         },
         fail: function() {
             console.ifno("error")
         }
     })
  }
})
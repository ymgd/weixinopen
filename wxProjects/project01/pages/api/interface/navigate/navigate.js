Page({
  data:{
  
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
  navigateTo:function(){
     wx.navigateTo({
        url: 'test?id=navigateTo传来的参数',
        success:function(data){
            console.log("success:",data)
        },
        fail:function(error){
            console.log("fail:",error)
        },
        complete:function(data){
            console.log("complete:",data)
        }
    })
  },
  redirectTo:function(){
     wx.redirectTo({
        url: 'test?id=redirectTo传来的参数',
        success:function(data){
            console.log("success:",data)
        },
        fail:function(error){
            console.log("fail:",error)
        },
        complete:function(data){
            console.log("complete:",data)
        }
    })
  },
  navigateBack:function(){
    wx.navigateBack()
  }
 
  
})
Page({
  data:{
    model:"",
    pixelRatio:"",
    windowWidth:"",
    windowHeight:"",
    language:"",
    version:""
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
  getSystemInfo:function(){

    var that = this
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                model:res.model,
                pixelRatio:res.pixelRatio,
                windowWidth:res.windowWidth,
                windowHeight:res.windowHeight,
                language:res.language,
                version:res.version

            })
           
        }
    })
  }
})
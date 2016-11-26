Page({
  data:{
    text:"Page photo",
    isActionSheetHidden:true,
    isModalHidden:true,
    isToastHidden:true,
    isLoadingHidden:true
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
  handleTapEvent:function(){
    this.setData({
      isActionSheetHidden:!this.data.isActionSheetHidden
    })
  },
  handleModalEvent:function(){
    this.setData({
      isModalHidden:!this.data.isModalHidden
    })
  },
  handleLoadingEvent:function(){
     this.setData({
      isLoadingHidden:false
    })
    var _this =this;
    setTimeout(function() {
      _this.setData({
        isLoadingHidden:true
      })
    }, 1000);
  },
   handleToastEvent:function(){
     this.setData({
      isToastHidden:false
    })
  },
  doChange:function(){
    this.setData({
      isToastHidden:true
    })
  },
  handleNextPageEvent:function(){
    wx.navigateTo({
      url:"../photoDetail/photoDetail?id=100",
      success:function(){
        console.log("页面跳转成功");
      }
    })
  }

})
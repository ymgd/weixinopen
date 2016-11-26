var app = getApp()
Page({
  data:{
    autodown : true,
    autoplay : true,

    toastHidden : true,
    modalHidden : true
  },
  onLoad:function(options){
     var autodown = wx.getStorageSync(app.key.isAutoDown),autoplay = wx.getStorageSync(app.key.isAutoPlay);
     if(!autodown){ this.setData({autodown : autodown});}
     if(!autoplay){ this.setData({autoplay : autoplay});}
  }

  ,changeHandler : function(e){
    var key = '',tag = e.currentTarget.dataset.tag;
     if('autoplay' == tag){ key = app.key.isAutoPlay;}else
     if('autodown' == tag){ key = app.key.isAutoDown;}

     wx.setStorageSync(key, e.detail.value)
  }
  ,toastChange   : function(e){
    this.setData({toastHidden:true});
  }
  ,modalChange   : function(e){
    this.setData({ modalHidden : true});

    if(e.type == "confirm"){
        //执行清除操作 
        wx.clearStorage()
        this.setData({toastHidden:false});
     }
     
  } 
  ,clearStorageHandler : function(e){
      this.setData({ modalHidden : false});
  }
})
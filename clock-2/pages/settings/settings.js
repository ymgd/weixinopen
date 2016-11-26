Page({
  data:{
    // text:"这是一个页面"
    configs: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var configs = wx.getStorageSync('configs');
    this.setData({
      configs: configs
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    wx.setStorageSync("configs", this.data.configs);
  },
  onUnload:function(){
    // 页面关闭
  },

  switchChangeHandler(e){
    var configs = this.data.configs;
    
    if(!configs[e.target.id]){
      configs[e.target.id] = {};
    }
    configs[e.target.id].isActive = e.detail.value;
    
    this.setData({
      configs: configs
    })
  },

  timeSlideHandler(e){
    var configs = this.data.configs;
    
    if(!configs[e.target.id]){
      configs[e.target.id] = {};
    }
    configs[e.target.id].duration = e.detail.value;
    
    this.setData({
      configs: configs
    })
    console.log(this.data.configs)
  },

  notificationRadioHandler(e){
    
    var configs = this.data.configs;
    
    if(!configs[e.target.id]){
      configs[e.target.id] = {};
    }
    console.log(e.detail.value)
    configs[e.target.id].notificationTime = e.detail.value;
    
    this.setData({
      configs: configs
    })
    console.log(this.data.configs)
  }
})
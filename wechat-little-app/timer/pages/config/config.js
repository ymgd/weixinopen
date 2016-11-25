Page({
  data:{
    // text:"这是一个页面"
    configs:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      var configs = wx.getStorageSync('configs');
      this.setData({configs:configs});
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
  switchChange:function(e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if(!config){
      config = new Object();
      configs[id] = config;
    }
    config.state = e.detail.value;
    this.setData ({configs : configs});
    wx.setStorageSync('configs',configs);
  },

  sliderChange:function(e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if(!config){
      config = new Object();
      configs[id] = config;
    }
    config.time = e.detail.value;
    this.setData ({configs : configs});
    wx.setStorageSync('configs',configs);
  },
  radioChange:function(e){
    var id = e.target.id;
    var configs = this.data.configs;
    var config = configs[id];
    if(!config){
      config = new Object();
      configs[id] = config;
    }
    config.voice = e.detail.value;
    this.setData ({configs : configs});
    wx.setStorageSync('configs',configs);
  }
})
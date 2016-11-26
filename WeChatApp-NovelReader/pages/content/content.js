Page({
  data:{
    // text:"这是一个页面"
    content : ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
        url:'http://yhq1913.com/%E4%B8%8B%E4%B8%80%E7%AB%99%E5%A4%A9%E5%90%8E/'+options.data+".txt",
        success:function(res){
            that.setData({content:res.data});
        }
    });
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
  }
})
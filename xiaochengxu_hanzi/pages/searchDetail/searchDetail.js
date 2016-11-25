var app = getApp();
Page({
  data:{
      item:{},
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var key = app.globalData.key;
    var that = this;
    var url ='https://v.juhe.cn/xhzd/queryid?word='+id+'&key='+key;
    console.log(url);
    showLoading('加载中...');
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        hideToast();
        console.log(res.data.result);
        var pinyins = res.data.result.py.split(',');
        res.data.result.pinyins = pinyins;
        that.setData({
            item:res.data.result
        })
      },
      fail: function() {
        // fail
        hideToast();
      },
      complete: function() {
        // complete
      }
    })
  },
  morePyTap:function(e){
    var py = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?key='+py+'&type=pinyin',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  morebushouTap:function(e){
    var py = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?key='+py+'&type=bushou',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
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
   
  },
  onUnload:function(){
    // 页面关闭
   
  }
})
function showToast(toastTip){
  wx.showToast({
    title: toastTip,
    icon: 'success',
    duration: 2000
  })
}

function hideToast(){
  wx.hideToast();
}
function showModal(){
  var that = this;
  wx.showModal({
          title: '加载失败',
          content: '网络连接失败，稍后重试！',
          confirmText:'点击重试',
          success: function(res) {
            if (res.confirm) {
              that.onLoad();
            }
          }
        })
}
function showLoading(loadingTip){
  wx.showToast({
    title: loadingTip,
    icon: 'loading',
    duration: 10000
  })
}
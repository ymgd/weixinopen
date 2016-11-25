//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    inputValue: '',
    userInfo: {},
    toastTip:'搜索中...',
    item:{},
    showDetail:false,
    showChengyuDetail:false,
    chengYuItem:{},
  },
  //事件处理函数
  search: function() {
  var that = this;
     that.setData( {
       toastTip:'搜索中...',
    });
    showLoading('搜索中...');
    var wordLength = this.data.inputValue.length;
    var url = app.globalData.hostUrl;
    if(wordLength==0){
      showToast("请输入单个汉字或者成语");
      return;
    }else if(wordLength==1){
      url += "/xhzd/query?key="+app.globalData.key;
    }else{
      //chengyu = this.data.inputValue;
      url += "/chengyu/query?key="+app.globalData.keyChengyu;
    }
  
    //console.log(this.data.inputValue.length);
    var inputValue = encodeURI(this.data.inputValue);
    url +='&word='+inputValue;
    console.log(url);
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        var errorCode = res.data.error_code;
        if(errorCode == 0){
          if(wordLength==1){//拼音
          var pinyins = res.data.result.py.split(',');
          res.data.result.pinyins = pinyins;
          console.log('after '+res.data.result);
            that.setData({
                item:res.data.result,
                showDetail:true,
                showChengyuDetail:false,
              });
          }else {//成语
            console.log(res.data.result);
            res.data.result.zi=that.data.inputValue;
            that.setData({
                chengYuItem:res.data.result,
                showChengyuDetail:true,
                showDetail:false
              });
          }
            hideToast();
        }else{
          var reason = res.data.reason;
         // that.data.toastTip = reason;
          showToast(reason);
           if(215702==errorCode){
             var firstChar = that.data.inputValue.charAt(0);
             that.data.inputValue = firstChar;
             that.search();
            }
        }
      },
      fail: function(e) {
        console.log(e);
        // fail
        hideToast();
        wx.showModal({
          title: '加载失败',
          content: '网络连接失败，稍后重试！',
          confirmText:'点击重试',
          success: function(res) {
            if (res.confirm) {
              that.search();
            }
          }
        })
      },
      complete: function() {
        // complete
       
      }
    })
  },
  bindSearchInput:function(e){
    this.data.inputValue=e.detail.value;
    // this.setData({
    //   inputValue:e.detail.value
    // })
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
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
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
  wx.showModal({
          title: '加载失败',
          content: '网络连接失败，稍后重试！',
          confirmText:'点击重试',
          success: function(res) {
            if (res.confirm) {
              this();
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


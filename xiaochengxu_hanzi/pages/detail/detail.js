var app = getApp();
Page({
  data:{
      list:[],
      word:'',
      page:1,
      searchType:''
  },
  onLoad:function(options){
     // 页面初始化 options为页面跳转所带来的参数
     var that = this;
     that.data.page = 1;
     that.data.word = options.key;
     that.data.searchType = options.type;
     that.loadData();
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
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新...." );
    this.setData( {
      page: 1
    })
    this.loadData();
  },

  pullUpLoad: function( e ) {
    this.setData( {
      page: this.data.page + 1
    })

    console.log( "上拉拉加载更多...." + this.data.page );

    this.loadData();
  },
  Detail:function(e){
      var id = e.currentTarget.id;
      wx.navigateTo({
                url: '../../pages/searchDetail/searchDetail?id='+id,
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

  loadData:function(){
    var key = app.globalData.key;
    var that = this;
    var page = that.data.page;
    var word = that.data.word;
    var url ='';
    if('pinyin'==that.data.searchType){
        url ='https://v.juhe.cn/xhzd/querypy?key='+key+'&word='+word+'&dtype=&page='+page+'&isjijie=1&isxiangjie=1&pagesize=10'
    }else if('bushou'==that.data.searchType){
        url ='https://v.juhe.cn/xhzd/querybs?key='+key+'&word='+word+'&dtype=&page='+page+'&isjijie=1&isxiangjie=1&pagesize=10'
    
    }
    console.log('url: '+url);
    showLoading('加载中...');
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        hideToast();
        if(res.data.error_code==0){
          console.log(that.data.list.length+" added "+res.data.result.list.length);
          var newList;
          if(page >1){
            newList = that.data.list.concat(res.data.result.list);
          }else {
            newList = res.data.result.list;
          }
          
          console.log(newList);
          console.log("new length "+newList.length);
          that.setData({
              list:newList
          })
        }else{
          if(page >1){
            showToast('没有更多了');
          }else{
            showToast(res.data.reason);
          }
          
        }
        
      },
      fail: function() {
        var page = that.data.page;
        if(page > 1){
          page --;
        }
        // fail
        that.setData({
           page:page
        })
        hideToast();
      },
      complete: function() {
        // complete
      }
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
  var that = this;
  wx.showModal({
          title: '加载失败',
          content: '网络连接失败，稍后重试！',
          confirmText:'点击重试',
          success: function(res) {
            if (res.confirm) {
              
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
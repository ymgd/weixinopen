// list.js
var request = require('../../request/request');
Page({
  data:{
    isTag: '',
    query: '',
    deviceHeight: 0,
    resultCondition: false,
    loadingHidden: false,
    modalHidden: true,
    modalValue: '',
    items: [],
    bottomCondition: false
  },
  onLoad:function(options){
    var that = this;
    // 设置scroll-view的高度为设备高度
    wx.getSystemInfo({
      success: function(res){
        that.setData({
          deviceHeight: res.windowHeight + 'px'
        });
      }
    });
    this.setData({
      isTag: options.isTag,
      query: options.query
    });
    request.searchBook(this.data.isTag, this.data.query, this.searchSuccess, this.searchFail);
  },
  // 搜索图书成功
  searchSuccess: function(data){
    this.setData({
      loadingHidden: true
    });
    if(data.total === 0){
      this.setData({
        resultCondition: true
      });
    }else{
      this.setData({
        items: data.books
      });
    }
  },
  // 搜索图书失败
  searchFail: function(){
    this.setData({
      loadingHidden: true,
      modalHidden: false,
      modalValue: '搜索图书失败'
    })
  },
  // 跳转至图书详情页
  getBookDetail: function(e){
    var bookId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?bookId=' + bookId
    });
  },
  // 模态框确定事件处理
  modalChange: function(e){
    this.setData({
      modalHidden: true,
      modalValue: ''
    });
  },
  // 处理滚动事件
  handleToBottom: function(e){
    var that = this;
    this.setData({
      loadingHidden: false
    });
    request.getNextPage(this.data.isTag, this.data.query, function(data){
      that.setData({
        loadingHidden: true,
        items: that.data.items.concat(data.books)
      });
    }, function(){
      that.setData({
        loadingHidden: true,
        modalHidden: false,
        modalValue: '搜索图书失败'
      });
    });
  }
})
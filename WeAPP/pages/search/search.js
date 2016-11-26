// search.js
Page({
  data:{
    inputValue: '',
    isTag: false
  },
  // 检查网络状况
  onLoad: function(options){
    wx.getNetworkType({
      fail: function(){
        this.setData({
          modalHidden: false,
          modalValue: '请求网络失败！'
        });
      }
    });
  },
  // 处理用户输入  
  handleInput: function(event){ 
    this.setData({
      inputValue: event.detail.value.trim(),
      isTag: false
    });
    return event.detail.value;
  },
  // 选择某个标签
  selectTag: function(event){
    this.setData({
      inputValue: event.currentTarget.dataset.tag,
      isTag: true
    });
    this.searchBook();
  },
  // 搜索图书
  searchBook: function(){
    var that = this;
    var value = this.data.inputValue.trim();
    if(value){
       wx.navigateTo({
        url: '../list/list?isTag=' + that.data.isTag + 
              '&query=' + that.data.inputValue
       });
    }
  }
})
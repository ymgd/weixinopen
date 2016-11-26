var Api = require('../../utils/api.js');

Page({
  data: {
    title: '综合版1',
    Detail:[],
    pageId:1,
    itemId:'',
    hidden:true
  },
  onLoad: function (e) {
    var self = this;
    self.setData({
      hidden:false,
      itemId:e.id,
    });
    this.fetchData(self.data.itemId,self.data.pageId);
  },
  fetchData:function(itemId,pageId){
    var self = this;
    wx.request({
      url: Api.getItemDetail(itemId,pageId),
      success: function (res) {
        console.log(res);
        self.setData({
          Detail: res.data,
          hidden:true
        });
      },
      fail:function(res){
        console.log('fail'+res);
      }
    });
  },
  last:function(){
    var self = this;
    if(self.data.pageId>1){
      self.setData({
        hidden : false,
        pageId: self.data.pageId - 1,
      });
      this.fetchData(self.data.itemId,self.data.pageId);
    }
  },
  next: function(){
    var self = this;
    self.setData({
      hidden : false,
      pageId: self.data.pageId + 1,
    });
    this.fetchData(self.data.itemId,self.data.pageId);
  }
})
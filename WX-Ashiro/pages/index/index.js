var Api = require('../../utils/api.js');

Page({
  data: {
    blockShow:true,
    list:[],
    listItems:[],
    listId:4,
    listName:'综合版1',
    pageId:1,
    hidden:true
  },
  onLoad: function () {
    var self = this;
    this.fetchList();
    this.fetchData(self.data.listId,self.data.pageId);
  },
  redictDetail: function (e) {
    var id = e.currentTarget.id;
    var url = '../detail/detail?id=' + id+'&page=1';
    wx.navigateTo({
      url: url
    })
  },
  fetchList:function(){
    var self = this;
    wx.request({
      url:Api.getList(),
      success:function(res){
        console.log(res);
        self.setData({
          list: res.data
        });
      }
    });
  },
  fetchData:function(listId,pageId){
    var self = this;
    wx.request({
      url: Api.getItems(listId,pageId),
      success: function (res) {
        console.log(res);
        self.setData({
          listItems: res.data,
          hidden : true
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
      this.fetchData(self.data.listId,self.data.pageId);
    }
  },
  next: function(){
    var self = this;
    self.setData({
      hidden : false,
      pageId: self.data.pageId + 1,
    });
    this.fetchData(self.data.listId,self.data.pageId);
  },
  block:function(){
    var self = this;
    self.setData({
      blockShow : false,
    });
  },
  blockClose:function(){
    var self=this;
    self.setData({
      blockShow : true,
    });
  },
  redictBlock:function(e){
    var l = e.currentTarget.id;
    var n = e.currentTarget.dataset.name;
    console.log(n);
    var self=this;
    self.setData({
      listId:l,
      pageId:1,
      blockShow:true,
      listItems:[],
      listName:n,
    });
    this.fetchData(self.data.listId,self.data.pageId);
  }
})

var util = require('../../utils/util.js')
var Api = require('../../utils/api.js')
Page({
  data:{
    // text:"这是一个页面"
    datas: [],
    hidden: false,
    logs:[],
    title: "话题列表",
    offset: 0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    this.fetchData({node_id: 19});
  },

  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.offset) data.offset = 0;
    if (data.offset === 0) {
      self.setData({
        datas: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        self.setData({
          datas: self.data.datas.concat(res.data.topics.map(function (item) {
            item.created_at = util.getDateDiff(new Date(item.created_at));
            if (item.user.avatar_url.indexOf('testerhome') !== -1) {
              item.user.avatar_url = 'https:' + item.user.avatar_url;
            }else {
              item.user.avatar_url = 'https://testerhome.com/' + item.user.avatar_url;
            }
            return item;
          }))
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },

  pullDownRefresh: function () {
    var self = this;
    this.fetchData({node_id: 19});
    console.log('下拉刷新', new Date());
  },
  
  didSelectCell: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },

  lower: function (e) {
    var self = this;
    self.setData({
      offset: self.data.offset + 20
    });
    this.fetchData({node_id: 19, offset: self.data.offset});
  }
})
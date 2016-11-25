var api = require('../../api/api');
var util = require('../../utils/util');
var app = getApp();
Page({
  data: {
    topics: [],
    limit: 20,
    loading: false
  },
  onLoad: function() {

    this.fetchData();

  },
  onReady: function() {
    console.log('onReady');

  },
  onShow: function() {
    console.log('onShow');

  },
  onHide: function() {
    console.log('onHide');

  },
  onUnload: function() {
    console.log('onUnload');

  },
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh');
    this.fetchData(true);

  },
  onReachBottom: function() {

    console.log('onReachBottom');
    this.fetchData();

  },
  bindViewTap: function() {

  },
  fetchData: function(isRefresh) {
    var self = this;
    if (self.data.loading) return;
    self.setData({
      loading: true
    });
    var topics = isRefresh ? [] : self.data.topics;
    var page = isRefresh ? 1 : Math.ceil(topics.length / self.data.limit) + 1;
    api.topic.getTopics({
      tab: 'share',
      page: page,
      limit: self.data.limit
    }).then(function(res) {

      var data = res.data;
      var _d = data.data || [];
      if (data.success) {
        topics = topics.concat(_d.map(function(n) {
          n.create_at = util.dateFormat(n.create_at, 'yyyy-MM-dd hh:mm');
          return n;
        }))
        self.setData({
          topics: topics,
          loading: false
        });
      }
      isRefresh && wx.stopPullDownRefresh();
    }, function(res) {
      self.setData({
        loading: false
      });
      isRefresh && wx.stopPullDownRefresh();
    });
  },
})

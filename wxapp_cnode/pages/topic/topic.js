var api = require('../../api/api');
var util = require('../../utils/util');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
// app.globalData
Page({
  data: {
    topic: {},
    wxParseData: []
  },
  onLoad: function(options) {
    if (typeof options.id === undefined) return;
    this.fetchData(options.id);
  },
  fetchData: function(id) {
    var self = this;
    if (self.data.loading) return;
    api.topic.getTopic({
      id: id,
      mdrender: true
    }).then(function(res) {
      console.log(res);
      var data = res.data;
      var _d = data.data || {};
      if (data.success) {
        _d.create_at = util.dateFormat(_d.create_at, 'yyyy-MM-dd hh:mm:ss');
        self.setData({
          topic: _d,
        });
      }
      WxParse.wxParse('html', data.data.content, self);
    }, function(res) {

    });
  },
  wxParseImgTap: function(e) {
    WxParse.wxParseImgTap(e, this);
  }
})

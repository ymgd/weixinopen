var util = require('../../utils/util.js')
var Api = require('../../utils/api.js')
Page({
  data:{
    title: '话题详情',
    detail: {},
    hidden: false,
    replies: [],
    content_hidden: false,
    reply_hidden: true,
    flag_position: '0%',
    offset: 0,
    topicid:-1,
  },
  onLoad: function (options) {
    this.fetchData(options.id);
    this.fetchReplyData(options.id);
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false,
      topicid: id,
    });
    wx.request({
      url: Api.getTopicByID(id),
      success: function (res) {
        console.log(res);
        res.data.topic.body = res.data.topic.body.replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n');
        res.data.topic.created_at = util.getDateDiff(new Date(res.data.topic.created_at));
        self.setData({
          detail: res.data.topic
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });

    
  },

  fetchReplyData: function(id, data) {
    var self = this;
    if (!data) data = {};
    if (!data.offset) {
      data.offset = 0;
      self.setData({
        offset: 0
      });
    }

    if (data.offset === 0) {
      self.setData({
        replies: []
      });
    }
    wx.request({
      url: Api.getTopicReplies(id, data),
      success: function (res) {
        console.log(res);
        self.setData({
          replies: self.data.replies.concat(res.data.replies.map(item => {
            item.created_at = util.getDateDiff(new Date(item.created_at));
            if (item.user.avatar_url.indexOf('testerhome') !== -1) {
              item.user.avatar_url = 'https:' + item.user.avatar_url;
            }else {
              item.user.avatar_url = 'https://testerhome.com/' + item.user.avatar_url;
            }
            item.body_html = item.body_html.replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n');
            return item;
          }))
        });
      }
    });

  },

  onTapTag: function(e) {
    var self = this;
    var id = e.currentTarget.id;
    if (id === 'topic') {
      self.setData({
        content_hidden: false,
        reply_hidden: true,
        flag_position: '0%'
      });
    }else {
      self.setData({
        content_hidden: true,
        reply_hidden: false,
        flag_position: '50%' 
      });
    }
  },

  lower: function(e) {
    
    console.log("加载跟多");
    var self = this;
    if(self.data.replies.length >= 20 && self.data.replies.length%10 === 0) {
      self.setData({
            offset: self.data.offset + 20
      });
      self.fetchReplyData(self.data.topicid, {offset: self.data.offset});
    }
    
  },
  scorlls: function(e) {
    console.log(e.detail);
  }
})
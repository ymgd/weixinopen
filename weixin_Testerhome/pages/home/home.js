var util = require('../../utils/util.js')
var Api = require('../../utils/api.js')
Page({
  data:{
    // text:"这是一个页面"
    datas: [],
    hidden: false,
    logs:[],
    title: "话题列表",
    type: "recent",
    offset: 0,
    recent: '#000000',
    popular: '#cbcccd',
    no_reply: '#cbcccd',
    excellent: '#cbcccd',
    flag_position: '0%',
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    this.fetchData({type: 'recent'});
    this.fetchAds();
  },

  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.offset) {
      data.offset = 0;
      self.setData({
        offset: 0
      })
    }
    if (data.offset === 0) {
      self.setData({
        datas: []
      });
    }
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        console.log(res.data.topics);
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

  fetchAds: function () {
    var self = this;
    wx.request({
      url: Api.getTopicAds(),
      success: function(res) {
        self.setData({
          banner: res.data.ads,
        });
      }
    });
  },
  bindViewTap: function(e) {
    var self = this;
    var id = e.currentTarget.dataset.id;
    console.log(e.currentTarget);
    console.log('我要看详情');
    url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },

  onTapTag: function (e) {
    var self = this;
    var tab = e.currentTarget.id;
    self.setData({
      type: tab
    });
    self.setData({
        offest: 0,
        recent: '#cbcccd',
        popular: '#cbcccd',
        no_reply: '#cbcccd',
        excellent: '#cbcccd'
      });
    if (tab === 'recent') {
        self.setData({
            recent: '#000000',
            flag_position: '0%'
        });
    }
    if (tab === 'popular') {
        self.setData({
            popular: '#000000',
            flag_position: '25%'
        });
    }
    if (tab === 'no_reply') {
        self.setData({
            no_reply: '#000000',
            flag_position: '50%'
        });
    }
    if (tab === 'excellent') {
        self.setData({
            excellent: '#000000',
            flag_position: '75%'
        });
    }
    if (tab !== 'all') {
      this.fetchData({type: tab});
    } else {
      this.fetchData();
    }
    console.log(self.data.offset);
  },


  pullDownRefresh: function () {
    var self = this;
    console.log(self.data.type);
    this.fetchData({type: self.data.type});
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
    if (self.data.type !== 'recent') {
      this.fetchData({type: self.data.type, offset: self.data.offset});
    } else {
      this.fetchData({offset: self.data.offset});
    }
  }
})
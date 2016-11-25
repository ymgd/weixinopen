const kPageSize = 30;
var app = getApp();
var config = require("../../config.js");
var util = require("../../utils/util.js");
var apimanager = require("../../utils/apimanager.js");

Page({
  data:{
    left: 28,   //view 统一的左右边距.
    hasMore: false    //是否有更多数据.
  },
  customerData: {
    isloadingMore: false,
    lastId: 0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var info = app.globalData.adInfo;
    this.customerData.adInfo = info;
    var images = info.images && info.images;
    for (let i = 0; i < images.length; i++) {
      var image = images[i];
      if (images.length < 3) {
        image.isBig = true;
        image.right = 0;
      } else {
        if (images.length % 2 == 0) {
          if (i < 2) {
            image.isBig = true;
            image.right = 0;
          } else {
            image.isBig = false;
            image.right = (i % 2 == 0) ? this.data.left : 0;
          }
        } else {
          if (i < 3) {
            image.isBig = true;
            image.right = 0;
          } else {
            image.isBig = false;
            image.right = (i % 2 == 1) ? this.data.left : 0;
          }
        }
      }
    }

    this.setData({
      userInfo: {
        avatar: info.user.avatar.square,
        name: info.user.nick,
        giveCount: info.user.giveCount,
        appreciatedCount: info.user.appreciatedCount,
      },
      images: images,
      tags: info.tags,
      date: info.date,
      city: info.city,
      likers: info.likedUsers,
      description: info.description,
      readTimes: (info.readTimes + "次浏览"),
      applicationCount: info.applicationCount,
      hasMore: true
    });

    if (info.applicationCount > 0) {
      this.loadmoreApplicantors();
    }
  },
  onShow:function(){
    // 页面显示
    var that = this;
    wx.getSystemInfo( {
      success: ( res ) => {
        that.setData( {
          windowHeight: res.windowHeight
        });
      }
    })
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  imageLoaded: function(e) {
    var that = this;
    var idx = e.currentTarget.id - 0;
    var images = this.data.images;
    if (images.length < idx ){
      return;
    }
    //计算过的不再重新计算
    var image = images[idx];
    if (image.height) {
      return;
    }

    wx.getSystemInfo({
      success: function(res) {
        var endIdx = 0;
        var startIdx = 0;

        if (image.isBig) {
          if(images.length < 3) {
            endIdx = images.length;
          } else {
            endIdx = images.length % 2 == 0 ? 2 : 3;
          }
        } else {
          startIdx = images.length % 2 == 0 ? 2 : 3;
          endIdx = images.length;
        }

        var viewWidth = 0;
        var viewHeight = 0;
        var inteval = that.data.left;
        if (image.isBig) {
          viewWidth = res.windowWidth - inteval * 2;
          var imgWidth = e.detail.width;
          var imgHeight = e.detail.height;
          viewHeight = ( imgHeight / imgWidth ) * viewWidth;
        } else {
          viewWidth = (res.windowWidth - inteval * 3) / 2.0;
          viewHeight = viewWidth;
        }

        for (var i = startIdx; i < endIdx; i++) {
          var img = images[i];
          img.width = viewWidth;
          img.height = viewHeight;
        }

        that.setData({
          images: images
        });
      }
    })
  },
  scrolltolower: function() {
    //正在加载或者无数据，不在加载.
    if (this.customerData.isloadingMore || !this.data.hasMore) {
      return;
    }
    this.customerData.isloadingMore = true;
    this.loadmoreApplicantors();
  },
  loadmoreApplicantors: function() {
    var opts = {
      "size" : kPageSize
    };
    var params = {
      adId: this.customerData.adInfo.id,
      id: this.customerData.lastId,
      opts: JSON.stringify(opts)
    };

    var that = this;
    apimanager.request({
      url: config.getApplicantorListUrl(),
      data: params,
      method: 'GET',
      success: function(res){
        if(res.data.type == 'data') {
          that.loadmoreApplicantorsSuccess(res.data.result);
        } else {
          that.loadmoreApplicantorsFail();
        }
      },
      fail: function(){
        that.loadmoreApplicantorsFail();
      },
      complete:function() {
        that.loadingDataComplete();
      }
    });
  },
  loadmoreApplicantorsSuccess: function(res) {
    this.customerData.lastId = res.lastId;
    var items = res.items.new;
    var applicantors = this.data.applicantors;
    for (let i = 0; i < items.length; i++) {
      var item = items[i];
      var date = new Date(item.createdAt * 1000);
      
      var applicant = {
        avatar: item.applicant.avatar,
        name: item.applicant.nick,
        date: util.adFormatTime(date),
        reason: item.reason 
      }
      applicantors.push(applicant);
    }

    this.setData({
      hasMore: !res.endFlag,
      applicantors: applicantors
    });
  },
  loadmoreApplicantorsFail: function() {
    wx.showToast({
      title: "加载数据失败",
      duration: 2000
    });
  },
  loadingDataComplete(isRefresh) {
    var that = this;
    setTimeout(function() {
        that.customerData.isloadingMore = false;
    }, 1000);
  },
  appreciateimageloaded(e) {

  }
})
// journey.js
var FormData = require('../../utils/formData.js'),
  util = require('../../utils/util.js'),
  constants = require('../../utils/contants.js'),
  app = getApp();


Page({
  data: {
    // text:"这是一个页面"
    hidden: true,
    list: [
      {
        // 订单属性
        // {"orderno":2009620,"time":"2016-10-12 20:55:59","money":0,"carno":"169186"}
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('journey.js onLoad:' + JSON.stringify(options));

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      if (!userInfo.ofoInfo) {
        setTimeout(function () {
          wx.navigateTo({
            url: '../login/login'
          });
        }, 300);
        return;
      }
      that.setData({
        userInfo: userInfo
      })

      var formData = new FormData();
      formData.append('token', userInfo.ofoInfo.token);
      formData.append('classify', 0);
      formData.append('page', 1);

      wx.request({
        url: constants.API_SERVER + '/v3/detail',
        method: 'POST',
        data: formData.getContentData(),
        header: {
          'Content-Type': formData.getContentType()
        },
        success: function (res) {
          var data = res.data;
          if (data.errorCode == 200) {
            var orderList = data.values.info;
            that.setData({
              list: orderList
            });
          } else {
            console.error("获取订单错误：" + data);
          }
        }
      });
    });


  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  loadingChange: function () {
    this.setData({
      hidden: true
    })
  },
  widgetsToggle: function (e) {
    var orderno = e.currentTarget.id,
      money = 0,
      carno = 0,
      list = this.data.list;

    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].orderno == orderno) {
        carno = list[i].carno;
        money = list[i].money;
        break;
      }
    }

    var userInfo = this.data.userInfo;
    var formData = new FormData();
    var that = this;

    formData.append('token', userInfo.ofoInfo.token);
    formData.append('orderno', orderno);

    that.setData({
      hidden: false
    });

    wx.request({
      url: constants.API_SERVER + '/journeyPath',
      method: 'POST',
      data: formData.getContentData(),
      header: {
        'Content-Type': formData.getContentType()
      },
      success: function (res) {
        var data = res.data;
        if (data.errorCode == 200) {

          // 
          that.setData({
            hidden: true
          });
          var locationList = data.values.info;
          if (locationList && locationList.length) {
            var locationStr = encodeURIComponent(JSON.stringify(locationList))
            wx.navigateTo({ url: "../journeypath/journeypath?locations=" + locationStr + "&money=" + money + "&carno=" + carno });
          } else {
            console.error("该订单没有成功过的记录行程的轨迹，请确保您已经允许ofo后台定位。")
          }
        } else {
          console.error("获取订单错误：" + data);
        }
      }
    });
  }
})
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    legends: [],
  },
  onLoad: function () {
    // 加载时更新数据域
    this.getFreeLegendData()
  },
  
  getFreeLegendData: function () {
    var _this = this;
    wx.request({
      url: "http://lolapi.games-cube.com/Free",
      data: {
        qquin: "U14762379253352991681",
        vaid: 17,
      },
      header: {
        'DAIWAN-API-TOKEN': app.getAccessToken(),
      },
      success: function (res) {
        var temLegends = [];
        for (var i in res.data['data'][0]) {
            temLegends.push(res.data['data'][0][i])
        }
        wx.setStorageSync('temLegends', temLegends)
        console.log(wx.getStorageSync('temLegends'))

        _this.setData(
          {
            legends: wx.getStorageSync('temLegends'),
          }
        )
      },
      fail: function () {
        _this.showError();
      }
    })
  }
})

//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    cars:[{
        "id": 1,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      },{
        "id": 2,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      },{
        "id": 3,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      },{
        "id": 4,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      },{
        "id": 5,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      },{
        "id": 5,
        "car_image":"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "car_description": "斯柯达Yeti2014款 1.4TSI DSG极地版/野驱版",
        "price": 14.35,
        "guid_price": 20.08
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  },
  onPullDownRefresh: function() {
    console.log('下拉刷新...');
  },
  buy: function(e) {
    console.info("id", e.currentTarget.id);
    wx.navigateTo({url: '/pages/carDetail/carDetail?id=' + e.currentTarget.id});
  }
})

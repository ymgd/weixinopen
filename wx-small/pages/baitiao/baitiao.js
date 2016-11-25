//baitiao.js
//获取应用实例

Page({
  data: {
    limit: '29,102.00',
    background: ['green', 'red', 'yellow'],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200  
  },
  onLoad: function () {
    console.log('123');  
  },
  onReady: function () {
   console.log('123');  
  }
})

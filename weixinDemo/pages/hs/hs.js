// Page({
//   data: {
//     imgUrls: [
//       'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
//       'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
//     ],
//     indicatorDots: false,
//     autoplay: false,
//     interval: 5000,
//     duration: 1000
//   },
//   changeIndicatorDots: function(e) {
//     this.setData({
//       indicatorDots: !this.data.indicatorDots
//     })
//   },
//   changeAutoplay: function(e) {
//     this.setData({
//       autoplay: !this.data.autoplay
//     })
//   },
//   intervalChange: function(e) {
//     this.setData({
//       interval: e.detail.value
//     })
//   },
//   durationChange: function(e) {
//     this.setData({
//       duration: e.detail.value
//     })
//   }
// })
// Page({
//   data: {
//     markers: [{
//       latitude: 23.099994,
//       longitude: 113.324520,
//       name: 'T.I.T 创意园',
//       desc: '我现在的位置'
//     }],
//     covers: [{
//       latitude: 23.099794,
//       longitude: 113.324520,
//       iconPath: '../images/car.png',
//       rotate: 10
//     }, {
//       latitude: 23.099298,
//       longitude: 113.324129,
//       iconPath: '../images/car.png',
//       rotate: 90
//     }]
//   }
// })
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})
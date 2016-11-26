// Douban API 操作
const douban = require('../../libraries/douban.js')

Page({
  data: {
    switchOb:{relateTrainNumber:"G1350"},
    movies: [],
    loading: true,
    picArrs:['../../images/ALLUI/intro/intro_icon_0.jpg','../../images/ALLUI/intro/intro_icon_1.jpg','../../images/ALLUI/intro/intro_icon_2.jpg']
  },

  onLoad () {
      douban.getTrainInfo({relateTrainNumber:"G1359"}).then(data => console.log(data))

  },

  start () {
    // TODO: 访问历史的问题
    wx.redirectTo({ url: '../board/board' })
  }
})

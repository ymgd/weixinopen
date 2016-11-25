//app.js
App({
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  gobalData: {
    hasLogin: false
  },
  //聚合数据---菜谱的AppKey
  AppKey: '6958c7199ff2d94ddf276f776b2498b1'
})
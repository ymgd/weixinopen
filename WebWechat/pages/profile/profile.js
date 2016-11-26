// 拿到全局应用程序实例
const app = getApp()

const API_URL = 'http://localhost:8080/ShakeingPiggyBank/user/info'

// 创建一个页面对象用于控制页面的逻辑
Page({
  data: {
    title: '加载中...',
    info : [],
    loading: true,
    defaultSize: 'default',
    primarySize: 'mini',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: true
  },
  onLoad () {
    //调用应用实例的方法获取全局数据
      //更新数据
      app.fetchApi(API_URL , (err, data) => {
      this.setData({ 
          title : '个人页面',
          loading: false,
          info : data,
        defaultSize: 'mini', 
        primarySize: 'mini',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false })
      // wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
    })
  },
  setDisabled: function(e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function(e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function(e) {
    this.setData({
      loading: !this.data.loading
    })
  }
})
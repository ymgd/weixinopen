//index.js
//获取应用实例
const app = getApp()

const API_URL = 'http://localhost:4466/api/collection'

Page({
  data: {
    dec: "暂无收藏!",
    req: []
  },
  onLoad () {

    var that = this;

    app.fetchApi (API_URL, (err,data) => {
      that.setData({
        dec: '',
        req: data
      })
    })

  },	

})


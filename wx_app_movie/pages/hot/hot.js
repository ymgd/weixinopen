//index.js
//获取应用实例
import API from "../../api/api.js";
const app = getApp();
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    loading: true,
    images: [
      "http://static.show.wepiao.com/thumb/full/875/400/http://static.show.wepiao.com/upload/8/ccf/28d38/8ccf528d384863db4a82999a2022cbeb.jpg?v=cd221",
      "http://static.show.wepiao.com/thumb/full/875/400/http://static.show.wepiao.com/upload/5/08f/92cc5/508f992cc5e8c97e807ff5bf8ce6b5e8.jpg?v=cd221",
      "http://static.show.wepiao.com/thumb/full/875/400/http://static.show.wepiao.com/upload/3/3e3/c9240/33e3dc9240f4207f020d29cfc1451a68.jpg?v=cd221",
      "http://static.show.wepiao.com/thumb/full/875/400/http://static.show.wepiao.com/upload/5/894/bdc97/58941bdc9702422e141c51a927967c64.jpg?v=cd221"
    ]
  },
  onLoad: function () {
      wx.hideToast();
      app.fetch(API.top, (err, data) => {
        this.setData({
          movies: data.subjects,
          loading: false
        });
      })
  }
})

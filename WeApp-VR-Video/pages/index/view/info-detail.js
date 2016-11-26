
const app = getApp()

const INFO_URL = "http://www.vrhouzi.com/api/v1/videos/"

Page({
  onLoad: function(options) {
    console.log(options)
    this.setData({
      title: options.title,
      id:options.id,
      req_type:options.req_type,
      toast2Hidden: true
    })
    var that = this
    console.log(this.data.req_type)
    
    wx.request({
        url: INFO_URL + that.data.id,
        success: function(response) {
          console.log(response.data.result)
          that.setData({
              info_detail: response.data.result
          })
        }
      });
  },
  onReady: function() {
    wx.setNavigationBarTitle({title: this.data.title});
  },

  toast2Tap: function() {
    this.setData({
      toast2Hidden: false
    })

  },

  toast2Change: function() {
    this.setData({
      toast2Hidden: true
    })
  },

  widgetsToggle: function() {
    var that = this
    console.log("click!!" + that.data.info_detail.article.download)
    wx.downloadFile({
      url: that.data.info_detail.article.download,
      type: 'video',
      success:function(res){
          console.log("success");
          console.log(res.tempFilePath);
      },
      fail: function(res) {
          console.log("fail");
          console.log(res);
      }
    })
  }

})

Page({
  data:{
    text: "",
    hidden: false
  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + options.id,
      success: function(res) {
        var data = ""
        if (res.data.error_code) {
          data = '暂时搜索不到歌词～'
        } else {
          data = res.data.lrcContent
        }
        setTimeout(function(){
          that.setData({
            hidden: true,
            text: data
          })
        }, 2000)  //模拟网速不好的情况进行loading
      }
    })
  }
})
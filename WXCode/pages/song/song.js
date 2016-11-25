Page({
  data:{
    songTitle:'',
    songText:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + options.id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        //console.log(res)
        if(!res.data.error_code){ //当歌词查询成功
          that.setData({
           songTitle:res.data.title,
           songText:res.data.lrcContent
         })
        }else{ // 歌词查询出错
          that.setData({
           songTitle:"歌曲信息错误",
           songText:"查询歌词失败"
           })
        }
        
      },
      fail: function() {
        that.setData({
           songTitle:"歌曲信息错误",
           songText:"查询歌词失败"
           })
      }
    })
  }
})
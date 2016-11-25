var zqfdata;
Page({
  data: {
    title: '视频直播',
    source: 'https://github.com/qieangel2013/SmallApp',
    imgsrc:''
  },
  //事件处理函数
  onLoad: function (options) {
    this.title = options.type || '视频直播'
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '视频直播'
    })
    var that = this
    wx.connectSocket({
    url:'wss://xcx.tianlian.cn:9503'
  });
    wx.onSocketOpen(function(res) {
    console.log('WebSocket连接已打开！');
    //alert(11)
    //sendSocketMessage({data:"亲！我连上啦！",type:"mess"}); 
})
    wx.onSocketMessage(function(data)
        {
         zqfdata = JSON.parse(data.data);
          //console.log(jsonobj)
         // that.setData({
          //          imgsrc:data.data
           //     });
            //zqfdata= jQuery.parseJSON(data.data);
            if(zqfdata.type=='video'){
                that.setData({
                    imgsrc:zqfdata.data
                });
                 wx.setNavigationBarTitle({
                  title: '视频直播'
              })
            }
    });
     wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
    })
  },
})

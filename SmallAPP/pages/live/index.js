var zqfdata;
var context = wx.createContext();
var video=wx.createVideoContext('sourcevid');
function draw(){
	context.drawImage(video,0,0, 320, 240)
     wx.drawCanvas({
          canvasId: 3,
          actions: context.getActions()
        })
     if(video.src){
            	data={data:back.toDataURL("image/jpeg", 0.5),type:'video'}
                socket.send(JSON.stringify(data));
               // data_mic={data:gRecorder.getBlob(),type:'mic'}
               // socket.send(JSON.stringify(data_mic));
                //gRecorder.clear();
                //gRecorder.stop();
                //door = false;
            }
            setTimeout(draw, 100);
}
Page({
  data: {
    title: '录入视频',
    imgsrc:''
  },
  //事件处理函数
  onLoad: function (options) {
    this.title = options.type || '录视频'
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '录入视频'
    })
     var that = this 
      wx.chooseVideo({
            sourceType: ['camera'],
            maxDuration: 60,
            camera: ['front','back'],
            success: function(res) {
                that.setData({
                    imgsrc: res.tempFilePath
                })
            }
        })
    wx.connectSocket({
    url:'wss://xcx.tianlian.cn:9503'
  });
    wx.onSocketOpen(function(res) {
    console.log('WebSocket连接已打开！');
    draw();
    //alert(11)
    //sendSocketMessage({data:"亲！我连上啦！",type:"mess"}); 
})
     wx.onSocketClose(function(res) {
      console.log('WebSocket 已关闭！')
    })
     
  },
})
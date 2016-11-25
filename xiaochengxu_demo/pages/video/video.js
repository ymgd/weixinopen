function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
      //16进制色值前两位
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  onReady: function (res) {
    //创建视频对象上下文
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
    data: {
        src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ]
    },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  //获取视频
    bindButtonTap: function() {
        var that = this
        //调用选择视频接口
        wx.chooseVideo({
            //从相册选择或者使用相机拍摄
            sourceType: ['album', 'camera'],
            //拍摄时长，最多支持60s
            maxDuration: 60,
            //使用的摄像头，默认前后都有
            camera: ['front','back'],
            success: function(res) {
                that.setData({
                    //调用成功后返回文件的临时路径
                    src: res.tempFilePath
                })
            }
        })
    },
    //发送弹幕
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
    videoErrorCallback: function(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    }
})
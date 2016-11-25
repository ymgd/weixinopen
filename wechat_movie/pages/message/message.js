function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

Page({
    start() {
        wx.navigateTo({
            url: '../featured/featured'
        })
    },
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('video'); // video上下文环境
    },
    inputValue: '',
    data: {
        src: '',
        danmuList: [
            {
                text: '这是第 5s 的弹幕',
                color: '#ff0000',
                time: 5 // 出现时间
            }
        ],
        videos: [
            {
                imgSrc: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                tit: '肖申克的救赎'
            },
            {
                imgSrc: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
                tit: '喜羊羊与灰太狼'
            },
            {
                imgSrc: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
                tit: '一只小金鱼'
            }
        ],
        videoSrc: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    },
    bindInputBlur: function (e) {
        this.inputValue = e.detail.value;
    },
    bindSendDanmu: function () {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: getRandomColor()
        });
        this.setData({
            inputValue: ''  
        })
    },
    videoErrorCallback: function (e) {
        console.log('视频错误信息:');
        console.log(e.detail.errMsg);
    }
})
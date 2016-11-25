//index.js
//获取应用实例
var app = getApp()
var maxImageSize = 1;
Page({
    data: {
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        imageList: [],
    },
    chooseImage: function () {
        var that = this
        new Promise((resolve, reject)=> {
            wx.chooseImage({
                sourceType: this.data.sourceType,
                sizeType: this.data.sizeType,
                count: maxImageSize - this.data.imageList.length,
                success: function (res) {
                    console.log(res)
                    that.setData({
                        imageList: res.tempFilePaths
                    })
                    resolve(res.tempFilePaths[0])
                }
            })
        })
        .then((data)=>{
            wx.uploadFile({
                url: 'http://localhost:3000/upload', //仅为示例，非真实的接口地址
                filePath: data,
                name: 'file',
                formData: {"uid":"18301441595"},
                success: function (res) {
                    console.log("upload images success");
                }
            })
        }).catch((err)=>{
            util.log("res",err);
        })

    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
})

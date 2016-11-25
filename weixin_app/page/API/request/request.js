Page({
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        wx.getUserInfo({
            success: function (res) {
                that.setData({ userInfo: res.userInfo })
                that.update()
            }
        })

        wx.request({
            url: 'http://localhost:3871/api/values', //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                that.setData({ apitest: res.data })
                that.update()
            }
        })
    }
})

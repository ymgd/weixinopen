Page({
    data: {

    },
    onHide: function () {
        wx.hideNavigationBarLoading()
    },
    sheet: function () {
        wx.showActionSheet({
            itemList: ['index:0', 'index:1', 'index:2'],
            success: function (res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        })
    },
    model: function () {
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        })
    },
    toast: function () {
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
        })
    },
    loading: function () {
        wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 2000
        }),
            wx.showNavigationBarLoading()
    },
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '18888888888' //仅为示例，并非真实的电话号码
        })
    },
    systemInfo: function () {
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.model)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                console.log(res.language)
                console.log(res.version)
            },
            fail:function(){
                console.log(获取失败);
            }
        })
    }
})
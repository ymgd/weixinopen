Page({
    data: {
        modalHidden: true,
        userinfo: {
            username: "",
            password: ""
        },
        actionsheet:{
            actionsheetHidden:false,
            actionsheetItems:['催办','投诉','建议']
        },
        toastHidden:true
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        var isUsername = wx.getStorageSync('username');
        if(!isUsername){
            this.setData({
                userinfo:{
                    username: "",
                    password: ""
                },
                modalHidden: false
            })
        }
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    actionConfim: function() {
        console.log('登陆成功');
        try {
            wx.setStorageSync('username', this.data.userinfo.username);
            wx.setStorageSync('password', this.data.userinfo.password);
        } catch (e) {
            console.log(e);
        }
        this.setData({
            modalHidden: true
        })
    },
    actionCancel: function() {
        this.setData({
            modalHidden: true
        })
    },
    bindNameInput: function(e) {
        this.setData({
            'userinfo.username': e.detail.value
        })
    },
    bindPasswordInput: function(e) {
        this.setData({
            'userinfo.password': e.detail.value
        })
    },
    bindItemTap:function(e){
        switch (e.target.dataset.name){
            case '催办':
            this.setData({
                toastHidden:false
            })
            break;
            case '投诉':
            console.log('投诉');
            break;
            case '建议':
            console.log('建议');
            break;
        }
    },
    bindCancel:function(){
        this.setData({
            'actionsheet.actionsheetHidden':true
        });
    },
    actionsheetChange:function(){
        console.log(3)
    },
    toastChange:function(){
        this.setData({
            toastHidden:true
        })
    }
})

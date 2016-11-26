Page({
    data: {
        modalHidden: true,
        username: '',
        password: '',
    },
    onLoad: function() {},
    onShow: function() {
        if (wx.getStorageSync('username') && wx.getStorageSync('password')) {
            this.setData({
                modalHidden: true
            });
        } else {
            this.setData({
                username: '',
                password: ''
            });
            this.setData({
                modalHidden: false
            });
        }
    },
    signinConfirm: function() {
        wx.setStorageSync('username', this.data.username);
        wx.setStorageSync('password', this.data.password);
        this.setData({
            'modalHidden': false
        });
    },
    signinCancel: function() {
        this.setData({
            modalHidden: false
        });
        console.log(this.data.modalHidden);
    },
    saveUsername: function(event) {
        this.setData({
            username: event.detail.value
        });
    },
    savePassword: function(event) {
        this.setData({
            password: event.detail.value
        });
    }
});

const app = getApp()
const AV = app.AV
Page({
    data: {
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false,
        username_focus: 'focus',
        password_focus: '',
        username:'',
        password:''
    },
    bindfocusUser: function(e) {
        this.setData({
            username_focus: 'focus'
        })
    },
    bindblurUser: function(e){
        this.setData({
            username_focus: ''
        })
    },
    bindfocusPasswd: function(e) {
        this.setData({
            password_focus: 'focus'
        })
    },
    bindblurPasswd: function(e){
        this.setData({
            password_focus: ''
        })
    },
    bindUserNameInput: function(e){
        this.setData({
            username: e.detail.value
        })
    },
    bindPasswordInput: function(e){
        this.setData({
            password: e.detail.value
        })
    },
    login:function() {
        let that = this
        let username = this.data.username
        let password = this.data.password
        console.info(username,password)
        that.setData({
            loading: true
        })
        AV.User.logIn(username, password).then(user => {
            // 将当前的微信用户与当前登录用户关联
            that.setData({
                loading: false
            })
            wx.showToast({
                title:'登录成功',
                duration: 1000
            })
            return user.linkWithWeapp();
        },error => {
            that.setData({
                loading: false
            })
            wx.showToast({
                title:'用户名或密码不正确',
                duration: 1000
            })
        }).catch(function(error){
            that.setData({
                loading: false
            })
            console.error(error)
        }).then(function(){
            console.info('我不傻')
            if(AV.User.current()) {
                console.info(AV.User)
                console.info(AV.User.current())
                console.info(app)
                console.info(app.globalData)
                app.globalData.user = AV.User.current()
                console.info(app.globalData.user)
                wx.navigateBack({
                  delta: 1, // 回退前 delta(默认为1) 页面
                  success: function(res){
                    // success
                  },
                  fail: function() {
                    // fail
                  },
                  complete: function() {
                    // complete
                  }
                })
            }
        });
    }
})
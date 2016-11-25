App({
    onLaunch:function(){
        wx.checkSession({
            fail: function(){
                wx.login({
                    success: function(res) {
                        if (res.code) {
                            //发起网络请求
                            wx.request({
                                url: 'https://2bsapi.360che.com/wxadoc/index.php',
                                data: {
                                    code: res.code
                                }
                            })
                        } else {
                            console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                });
            }
        });
    }
});

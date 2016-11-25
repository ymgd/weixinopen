var common = require('modules/common')

App({
    onLaunch:function(){
        common.alert('初始化成功','',2000)
    },

    getUserInfo:function(func){
        if(this.globalData.user_info){
            typeof func == "function" && func(this.globalData.user_info);
        }else{
            var that = this;
            wx.login({
                success:function(res){
                    wx.getUserInfo({
                        success:function(res){
                            that.globalData.user_info = res.userInfo;
                            typeof func == "function" && func(that.globalData.user_info);
                        }
                    })
                }
            })
        }
    },

    globalData:{
        user_info : null,
        api_url : 'https://www.yxq360.com/demoForWx/index.php',
        xbox_info : null,
        copyright : 'xboxfan.com'
    }
})
App = getApp();

Page({
    data:{
        games:{},
    },
    onLoad:function(){       
        this.setData({
            user_name:App.globalData.user_info.nickName
        })
        var that = this;
        wx.request({
            url: App.globalData.api_url,
            data: {
                wxName: this.data.user_name ,
                method: 'games'
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.code == 0){
                    that.setData({
                        games:res.data.params
                    })
                }
            }
        })
    },
    tapgame:function(){

    }
})
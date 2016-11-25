App = getApp();

Page({
    data:{
        user_name:null,
        friends:{}
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
                method: 'friends'
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.code == 0){
                    that.setData({
                        friends:res.data.params
                    })
                }
            }
        })
    },
    tapfriend:function(e){
        console.log(e);
        var gametag = e.currentTarget.dataset.gametag
        console.log(gametag);
    }
})
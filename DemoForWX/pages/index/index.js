var common = require('../../modules/common')

App = getApp();

Page({
    data:{
        user_name:'',
        xbox_info:null,
        input_focus:false
    },
    onLoad:function(){
        var that = this;
        App.getUserInfo(function(user_info){
            if(user_info){
                that.setData({
                    user_name:user_info.nickName
                })
                wx.request({
                    url: App.globalData.api_url,
                    data: {
                        wxName: user_info.nickName ,
                        method: 'gamerCard'
                    },
                    header: {
                        'Content-Type': 'application/json'
                    },
                    success: function(res) {
                        if(res.data.code == 0){
                            that.setData({
                                xbox_info:res.data.params
                            })
                        }
                    }
                })
            }
        })
    },
    formSubmit: function(e) {
        var formData = e.detail.value;
        var that = this;
        if(formData.GameTag == ""){
            common.modal('警告','没有填写GameTag',function(){},function(){});
        }else{
            wx.request({
                url: App.globalData.api_url,
                data: {
                    wxName: that.data.user_name ,
                    gameTag: formData.GameTag,
                    method: 'bindInfo'
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    if(res.data.code == 0){
                        common.alert('绑定成功','',2000);
                        common.setTimeOut(1000,function(){
                            wx.redirectTo({
                                url:'index'
                            });
                        });
                    }else{
                        common.modal('警告','绑定失败',function(){},function(){});
                    }
                }
            })
        }
    },
    unbind:function(){
        var that = this;
        wx.request({
            url: App.globalData.api_url,
            data: {
                wxName: that.data.user_name ,
                method: 'unbind'
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                if(res.data.code == 0){
                    common.alert('解绑成功','',2000);
                    common.setTimeOut(2000,function(){
                        that.setData({
                            xbox_info:null
                        })
                    });
                }else{
                    common.modal('警告','解绑失败',function(){},function(){});
                }
            }
        })
    },
    gamelist:function(){
        wx.navigateTo({
            url:'../games/games'
        });
    },
    gofriends:function(){
        wx.navigateTo({
            url:'../friends/friends'
        });
    }
})
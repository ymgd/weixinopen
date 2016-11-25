Page({
    data:{
        app_key:"",
        app_secret:""
    },
    onLoad:function(){
        var obj = this;
        wx.getStorage({
            key:'app_key',
            success:function(res){
                obj.setData({
                    app_key:res.data
                });
            }
        });
        wx.getStorage({
            key:'app_secret',
            success:function(res){
                obj.setData({
                    app_secret:res.data
                });
            }
        });
    },
    submit_key:function(e){
        //提交key和secret
        var app = getApp();
        try{
            wx.setStorageSync('app_key', e.detail.value.app_key);
            wx.setStorageSync('app_secret', e.detail.value.app_secret);
            app.globalData.app_key = e.detail.value.app_key;
            app.globalData.app_secret = e.detail.value.app_secret;
        }catch(e){
           console.log('保存失败 info:'+e);
           return;
        }
        wx.showToast({
            title:'保存成功',
            icon:'success',
            complete:function(){
                wx.navigateTo({
                  url: '../index/index',
                  success: function(res){
                    // success
                  }
                });
            }
        });
    }
});
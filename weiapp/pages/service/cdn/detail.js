var aliyun_auth = require('../../../utils/aliyun_auth.js');
Page({
    data:{
        info:'',
        type_name:{
            'web':'图片及小文件分发',
            'download':'大文件下载加速',
            'video':'视音频点播加速',
            'liveStream':'直播流媒体加速',
        },
        status_name:{
            'online':'启用',
            'offline':"停止",
        }
    },
    onLoad:function(){
        var app = getApp();
        this.setData({
            info:app.globalData.cdn_domain_info,
            CdnTypeName:this.data.type_name[app.globalData.cdn_domain_info.CdnType],
            StatusName:this.data.status_name[app.globalData.cdn_domain_info.DomainStatus],
        });
    },
    to_set:function(){
        var itemList,success,page=this;
        if(this.data.info.DomainStatus=="online"){
            itemList = [
                '停用',
            ];
            success = function(res){
                if(!res.cancel){
                    if(res.tapIndex==0){
                        //停用
                        page.setCdn('StopCdnDomain');
                    }
                }
            };
        }else{
            itemList = [
                '启用',
                '删除',
            ];
            success = function(res){
                if(!res.cancel){
                    if(res.tapIndex==0){
                        //启用
                        page.setCdn('StartCdnDomain');
                    }else if(res.tapIndex==1){
                        //删除
                        page.setCdn('DeleteCdnDomain');
                    }
                }
            };
        }
        wx.showActionSheet({
            itemList:itemList,
            success:success,
        });
    },
    setCdn:function(action){
        var page = this;
        var name_list = {
            'StartCdnDomain':'启用',
            'StopCdnDomain':'停用',
            'DeleteCdnDomain':'删除',
        };
        wx.showToast({
            title: '正在'+name_list[action],
            icon: 'loading',
            duration: 10000
        });
        var url = aliyun_auth.init_request({
            url:'https://cdn.aliyuncs.com',
            args:[
                {'Action':action},
                {"Version":"2014-11-11"},
                {"DomainName":page.data.info.DomainName}
            ]
        });
        
        wx.request({
            url:url,
            success:function(data){
                if(data.statusCode==200){
                    wx.showToast({
                        title: name_list[action]+'成功',
                        icon: 'success',
                        duration: 1000,
                        success:function(){
                            page.reloadStatusInfo(action);
                        }
                    });
                }else{
                    //获取可用区列表失败，请下拉刷新
                }
            },
            fail:function(data){
                console.log('aliyun:false');
            }
        });
    },
    /*重置页面显示状态 */
    reloadStatusInfo:function(action){
        switch(action){
            case "StartCdnDomain":
                this.setData({
                    StatusName:'启用',
                });
                this.data.info.DomainStatus = 'online';
                break;
            case "StopCdnDomain":
                this.setData({
                    StatusName:'停止',
                });
                this.data.info.DomainStatus = 'offline';
                break;
            case "DeleteCdnDomain":
                var app = getApp();
                app.globalData.is_cdn_reload = true;
                wx.navigateBack({
                  delta: 1,
                })
                break;
        }
    }
});
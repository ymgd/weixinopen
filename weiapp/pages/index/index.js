var aliyun_auth = require('../../utils/aliyun_auth.js');
Page({
    data:{
        services:[
            {
                id:'ecs',
                title:'ECS',
                url:'../service/ecs'
            },
            {
                id:'cdn',
                title:'CDN',
                url:'../service/cdn/index'
            },
            {
                id:'rds',
                title:'RDS',
                url:'../service/ecs'
            },
            {
                id:'ess',
                title:'ESS',
                url:'../service/ecs'
            }
        ],
        app_key:'',
        app_secret:''
    },
    onLoad:function(){
        this.init();
    },
    onShow:function(){
        this.init();
    },
    init:function(){
        this.check_key();
    },
    /*检测key是否设置，并保存到全局变量 */
    check_key:function(){
        var obj = this;
        var app = getApp();
        wx.getStorage({
            key:'app_key',
            success:function(res){
                if(res.data==""){
                    obj.confirm_to_init();
                }else{
                    app.globalData.app_key = res.data;
                    obj.setData({
                        app_key:res.data
                    });
                }
            },
            fail:function(){
                console.log('获取失败');
                obj.confirm_to_init();
            }
        });
        wx.getStorage({
            key:'app_secret',
            success:function(res){
                if(res.data==""){
                    obj.confirm_to_init();
                }else{
                    app.globalData.app_secret = res.data;
                    obj.setData({
                        app_secret:res.data
                    });
                }
            },
            fail:function(){
                obj.confirm_to_init();
            }
        });
    },
    /*跳转到设置页 */
    confirm_to_init:function(){
        wx.showModal({
            title:'注意',
            content:"请先设置阿里云的key和secret",
            showCancel:false,
            confirmText:'确定',
            success:function(){
                wx.navigateTo({
                    url: '../index/init',
                    success: function(res){
                        // success
                    }
                });
            }
        });
    },
    test_auth:function(){
        aliyun_auth.init(this.data.app_key,this.data.app_secret);
        var array = aliyun_auth.getPublicArg();
        //array['Action'] = 'DescribeInstances';
        array['Action'] = 'DescribeRegions';
        //array['RegionId'] = 'shanghai';
        var Signature = aliyun_auth.getSignature(array);
        console.log('Signature='+Signature);
        var ecs_url = "https://ecs.aliyuncs.com?";
        for(var i in array){
            ecs_url += i+'='+array[i]+'&';
        }
        ecs_url += 'Signature='+Signature;

        wx.request({
            url:ecs_url,
            success:function(data){
                console.log(data);
            },
            fail:function(data){
                console.log(data);
            }
        });
    }
});
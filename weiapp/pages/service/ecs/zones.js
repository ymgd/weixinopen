var aliyun_auth = require('../../../utils/aliyun_auth.js');
Page({
    data:{
        zones_list:[],
        ecs_selected_zone:''
    },
    app:function(){
        return getApp();
    },
    onLoad:function(){

        this.get_zones_list();

        //获取当前的zone
        this.setData({
            ecs_selected_zone:this.app().globalData.ecs_selected_zone
        });
    },
    get_zones_list:function(){
        var zones_list = wx.getStorageSync('zones_list');
        if(zones_list==''){
            console.log('获取zones_list');
            var ecs_url = aliyun_auth.init_request({
                url:'https://ecs.aliyuncs.com',
                args:[
                    {"Action":"DescribeRegions"},
                    {'Version':"2014-05-26"},
                ]
            });
            var obj = this;
            wx.request({
                url:ecs_url,
                success:function(data){
                    if(data.statusCode==200){
                        zones_list = data.data.Regions.Region;
                        wx.setStorageSync('zones_list', zones_list);
                        obj.setData({
                            zones_list : zones_list
                        });
                    }else{
                        //获取可用区列表失败，请下拉刷新
                    }
                },
                fail:function(data){
                    console.log('aliyun:false');
                }
            });
        }else{
            this.setData({
                zones_list : zones_list
            });
        }
    },
    selected_zone:function(event){
        var id = event.currentTarget.dataset.id;
        var app = getApp();
        app.globalData.ecs_selected_zone=id;
        wx.setStorage({
          key: 'ecs_selected_zone',
          data: id,
          success: function(res){
            wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
            })
          },
          fail: function() {
            // fail
            console.log('save_false');
          },
          complete: function() {
            // complete
          }
        })
           
        
    }
});
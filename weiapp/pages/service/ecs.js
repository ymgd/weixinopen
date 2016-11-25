var aliyun_auth = require('../../utils/aliyun_auth.js');
Page({
    data:{
        ecs_selected_zone:'',
        status_name:{
            Running:"运行",
            Starting:"启动中",
            Stopping:"关机中",
            Stopped:"关机"
        },
        internet_type_name:{
            PayByTraffic:"按流量计费",
            PayByBandwidth:"按带宽计费"
        }
    },
    app:function(){
        return getApp();
    },
    onLoad:function(){
        //获取当前的zone
        this.setData({
            ecs_selected_zone:this.app().globalData.ecs_selected_zone
        });
        if(this.data.ecs_selected_zone==''){
            setTimeout(function(){
                wx.navigateTo({
                    url: '../service/ecs/zones'
                })
            },100);
        }
        this.showSelecteInfo();
    },
    onShow:function(){
        this.setData({
            ecs_selected_zone:this.app().globalData.ecs_selected_zone
        });
        this.showSelecteInfo();

        if(this.data.selected_zone_name!=""){
            this.get_ECS_list(this.data.ecs_selected_zone);
        }
    },
    /*当前可用区 */
    showSelecteInfo:function(){
        var obj = this;
        wx.getStorage({
          key: 'zones_list',
          success: function(res){
            var length = res.data.length;
            for(var i=0;i<length;i++){
                if(res.data[i]['RegionId']==obj.data.ecs_selected_zone){
                    obj.setData({
                        selected_zone_name:res.data[i]['LocalName']
                    });
                    return;
                }
            }
          },
          fail: function() {
            // fail
          }
        })
    },
    get_ECS_list:function(zone_id){
        console.log(zone_id);
        console.log('获取zones_list');
        var url = aliyun_auth.init_request({
            url:'https://ecs.aliyuncs.com',
            args:[
                {"Action":"DescribeInstances"},
                {'Version':"2014-05-26"},
                {"RegionId":zone_id}
            ]
        });
        var obj = this;
        wx.request({
            url:url,
            success:function(data){
                console.log(data);
                if(data.statusCode==200){
                    obj.setData({
                        InstanceList:data.data.Instances.Instance,
                        TotalCount:data.data.TotalCount
                    });
                    obj.app().globalData.ecs_list = data.data.Instances.Instance;
                }else{
                    //获取可用区列表失败，请下拉刷新
                }
            },
            fail:function(data){
                console.log('aliyun:false');
            }
        });
    },
    /*选择一个ecs */
    selected_ecs:function(event){
        var id = event.target.dataset.id;
        this.app().globalData.selected_ecs_id = id;
        wx.navigateTo({
          url: '../service/ecs/detail',
          success: function(res){
            // success
          }
        })
    }
});
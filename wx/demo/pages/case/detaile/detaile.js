var app=getApp();
var $=require('../../../js/util.js');
Page( {
    data: {},
    onReady: function() {
        //初始化数据
        this.getData();
    },
    //加载数据
    getData:function(callback){
        var self=this;
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration:10000
        });
        wx.request( {
            url:app.api.subjectInfo,
            data: {
                subject_id:app.globalData.caseId
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                // console.log(res);
                self.setData( {
                    data:res.data.data
                });
                wx.hideToast();
            }
        })
    },
    yuyue:function(){
        app.yuyue();
    },
    //跳转设计师详情
    goToDesigner:function(){
        app.globalData.designerId=this.data.data.designerid
        wx.navigateTo({
          url: '../../designer/designer'
        });
    },
    // 跳转大图预览页面
    picDetaile:function(e){
        var data=[];
        $.each(this.data.data.photo_list,function(i,d){
            data.push({
                des:d.photo_des,
                imgfile_l:d.photo_url_l
            })
        });
        app.globalData.picData={
            data:data,
            current:e.currentTarget.dataset.index
        }
        console.log(e.currentTarget.dataset.index)
        wx.navigateTo({
          url: '../../pic/detaile/detaile'
        });
    }
})
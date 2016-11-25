var networkTool=require('../../../pages/tool/networkRequestTool.js')
Page({
    data:{
        hotList:[],
        normalList:[]
    },
    onLoad:function(options){
        var that = this;
        networkTool.getDuanZiDetailData(0,options.id).then(function(e){
            console.log(e.data.hot.list)
            that.setData({
                 hotList:e.data.hot.list,
                 normalList:e.data.normal.list
            })
        },function(e){

        })
    }
})
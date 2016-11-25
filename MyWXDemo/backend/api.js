module.exports = {
    getTimeLineList: getTimeLineList
}


//获取时间线列表
function getTimeLineList(header,data,sucess,fail){
    var url = getApp().globalData.mainhost+'/timelines/list';
    wx.request({
        url:url,
        header:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        method:'GET',
        data:{
            page:data.page,
            pageSize:data.pageSize
        },
        success:function(res){
            sucess(res);
        },
        fail:function(res){
            fail(res);
        }
    });
}
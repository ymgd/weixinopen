Page({
    data:{},
    onLoad:function(){
        var _this = this;
        wx.request({
            url:"http://json.bmbstack.com/cinemaList",
            method:"GET",
            success:function(response){
                console.log(response);
                _this.data.cinemaList = response.data;
            },
            fail:function(error){
                console.log(error);
            },
            complete:function(){
                console.log("完成");
            }
        })

    }
})
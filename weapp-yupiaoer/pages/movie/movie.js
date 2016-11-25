
Page({
    data:{
        nav:['正在上映','即将上映'],
        nowIndex: '0'
    },
    onLoad:function(){
        var _this = this;
        wx.request({
            url:"http://json.bmbstack.com/bannerList",
            method:"GET",
            success:function(response){
                console.log(response);
                _this.data.bannerList = response.data;
            },
            fail:function(error){
                console.log(error)
            },
            complete:function(){
                 console.log("完成")
            }
        });

        wx.request({
            url:"http://json.bmbstack.com/playingList",
            method:"GET",
            success:function(response){
                console.log(response);
                _this.data.movieList = response.data;
            },
            fail:function(error){
                 console.log(error);
            },
            complete:function(){
                 console.log("完成");
            }
        })
    },
    navClick(e){
        console.log(e.currentTarget.dataset.index);
        this.setData({
            nowIndex:e.currentTarget.dataset.index
        })
    }
})
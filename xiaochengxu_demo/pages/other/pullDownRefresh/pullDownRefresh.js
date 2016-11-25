Page({
    data:{
        loadingHidden:true,
        noDataHidden:true
    },
    onLoad(){
        let _this=this;
        wx.getSystemInfo({
          success: function(res) {
            _this.setData({
                windowHeight:res.windowHeight+'px'
            })
          }
        }),
         wx.showToast({
            title:'loading',
            icon:'loading',
            duration:2000
        })

    },
    onPullDownRefresh(){

        setTimeout(function(){
            wx.stopPullDownRefresh();//停止下拉刷新
        },4000);
        /*
        wx.showToast({
            title:'loading',
            icon:'loading',
            duration:2000
        })
        */
    },
    loadMore(){
        let _this=this;
        _this.setData({
            loadingHidden:false,
             noDataHidden:true
        })
        setTimeout(function(){
            _this.setData({
                loadingHidden:true,
                noDataHidden:false
            })
        },4000)
    }
})
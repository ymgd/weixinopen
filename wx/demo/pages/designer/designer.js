var app=getApp();
Page({
    data: {
      tab:{
        tab1:true,
        tab2:false
      }
    },
    onReady: function() {
       this.getData();
    },
    getData:function(){
       var self=this;
       wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration:10000
        });
        wx.request( {
            url:app.api.designerInfo,
            data: {
                designer_id:app.globalData.designerId
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                console.log(res)
                self.setData({
                    data:res.data.data
                });
                wx.hideToast();
            }
        })
    },
    tab:function(e){
      var n=e.currentTarget.dataset.index;
      if(n==1){
          this.setData({
              tab:{
                tab1:true,
                tab2:false
              }
          })
      }else{
        this.setData({
              tab:{
                tab1:false,
                tab2:true
              }
          })
      }
    },
    makePhoneCall:function(e){
      var tel_num=e.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel_num
      })
    },
    yuyue:function(){
      app.yuyue();
    }
})
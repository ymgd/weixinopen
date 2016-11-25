var app=getApp();
Page({
    data: {
        data:null,
        current:0,
        indicatorDots: false,
        autoplay: false,
        duration:500,
        flag:true,
        flag2:true //解决swiper 回调执行两次问题
    },
    onReady:function(){
        console.log(app.globalData.picData);
        this.setData({
            data:app.globalData.picData.data,
            page:app.globalData.picData.page,
            space_id:app.globalData.picData.space_id,
            style_id:app.globalData.picData.section_id,
            section_id:app.globalData.picData.section_id,
            current:Number(app.globalData.picData.current)
        });
        this.swiperChange({
            detail:{
                current:this.data.current
            }
        });
    },
    onUnload:function(){
        //生命周期结束清空数据
        app.globalData.picData=null;
    },
    //加载数据
    getData:function(callback){
        var self = this;
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration:10000
        });
        self.setData({
            flag2:false
        });
        wx.request( {
            url:app.api.picList,
            data: {
                page:self.data.page,
                space_id:self.data.house_space,
                style_id:self.data.house_style,
                section_id:self.data.house_section
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                var datas=self.data.data.concat(res.data.data),flag=res.data.data.length>=20;
                console.log(res);
                self.setData({
                    data:datas,
                    flag:flag,
                    flag2:true
                });
                wx.hideToast();
            },
            fail:function(){
                console.log('error!!!!!!!!!!!!!!')
            }
        })
    },
    swiperChange: function(e) {
        var index=e.detail.current,self=this;
        // console.log(self.data.flag2)
        self.setData({
            current:index
        });
        if(index>=self.data.data.length-1 && self.data.flag2){
            if(self.data.page){
                if(self.data.flag){
                    self.setData({
                        page:self.data.page+1
                    });
                    self.getData();
                }
            }
        }
    }
})
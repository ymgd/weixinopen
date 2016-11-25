Page({
  data:{
       latitude:"",
      longitude:"",
      address:"北京市海淀区北三环西路43号中航广场",
      name:"中航广场"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  getLocation:function(){
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
            var latitude = res.latitude
            var longitude = res.longitude
          
            that.setData({
                latitude:latitude,
                longitude:longitude
            })
            
            // wx.openLocation({
            //     latitude: latitude,
            //     longitude: longitude,
            //     name:that.data.name,
            //     address:that.data.address,
            //     scale: 1
            //     })

                wx.chooseLocation({
                     success: function(res) {

                        

                     }
                })



            }
      })
     
  },
   chooseLocation:function(){
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function(res) {
            var latitude = res.latitude
            var longitude = res.longitude
            
             wx.chooseLocation({
               success: function(res) {

                    console.log(res); 
                    that.setData({
                        address:res.address,
                        name:res.name,
                        latitude:res.latitude,
                        longitude:res.longitude
                    })
              }
             })

            }
      })
     
  }
})
//index.js
//获取应用实例
let app = getApp()
Page({
  data: {
    userInfo:{},
    location:{
        latitude:0,
        longitude:0
    },
  },
  handleBtnClick(e){
      let location = this.data.location;
      this.openLocation(location.latitude, location.longitude);
  },
  onLoad() {
    let that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    this.getLocation();
  },
  getLocation(){
    let that = this;
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {console.log(res)
            that.setData({
                location:{
                    latitude:res.latitude,
                    longitude:res.longitude
                }
            })
            
        }
    });
  },
  openLocation(latitude = 0, longitude = 0){
    wx.openLocation({
        latitude,
        longitude,
        scale:1
    })
  }
})

//index.js
//获取应用实例
//http://www.vrhouzi.com/api/v1/videos?num=1
var app = getApp()
var VR_INFO_URL = 'http://www.vrhouzi.com/api/v1/videos?num=30&offset='

Page({
    data: {
        
    },

    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    get_vr_list_info: function() {
      console.log('get_vr_list_info')
      var vr_list_offset =  parseInt( 600 * Math.random() ); 
      var that = this      
      wx.request({
        url: VR_INFO_URL + vr_list_offset,

        success: function(response) {
          console.log(response.data.result)
          that.setData({
              vr_list: response.data.result
          })
          console.log(that.data.vr_list)
        }

      });
    },

    onLoad: function () {
      console.log('onLoad')
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo
        })
        that.update()
      })
      this.get_vr_list_info()
    },

    

    widgetsToggle: function (e) {
      console.log("click!!");
    }

})

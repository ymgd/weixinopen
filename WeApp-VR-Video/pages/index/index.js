//index.js
//获取应用实例
var app = getApp()
var SWIPER_INFO_URL = 'http://www.vrhouzi.com/api/v1/videos?num=6&offset='
var VR_INFO_URL = 'http://www.vrhouzi.com/api/v1/videos?num=30&offset='

Page({
    data: {
        background: ['green', 'red', 'yellow', 'black'],
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 500,
        toView: "green",
        vr_list: {},
        swiper_list:{}
    },

    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },

    get_vr_swiper_info: function() {
      console.log('get_vr_info')
      var swiper_offset =  parseInt( 800 * Math.random() ); 
      var that = this      
      
      wx.request({
        url: SWIPER_INFO_URL + swiper_offset,
        success: function(response) {
          that.setData({
              swiper_list: response.data.result
          })
        }

      });
    },

    get_vr_list_info: function() {
      console.log('get_vr_list_info')
      var vr_list_offset =  parseInt( 600 * Math.random() ); 
      var that = this      
      wx.request({
        url: VR_INFO_URL + vr_list_offset,
        success: function(response) {
          that.setData({
              vr_list: response.data.result
          })
        }
      });
      
    },

    save_info_list2storage: function() {
        var that = this        
        console.log(this.data.vr_list)
        console.log(that.data.swiper_list)
        var handler = setInterval(function(){
        if (that.data.vr_list == null) return

        wx.setStorage({
          key:"vr_list",
          data:that.data.vr_list
        });

        wx.getStorage({
            key:'vr_list',
            success:function(res){
                console.log(res.data);
                console.log("!!!!!!!!!!!!")
            } 
          });


        wx.setStorage({
          key:"swiper_list",
          data:that.data.swiper_list
        });
        
        wx.getStorage({
            key:'swiper_list',
            success:function(res){
                console.log(res.data);
                console.log("!!!!!!!!!!!!")
            } 
          });

      clearInterval(handler)
        
      },500); 
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
      this.get_vr_swiper_info()
      this.get_vr_list_info()
    },

    onReady: function () {

      this.save_info_list2storage()
    },

    /* scroll view */
    upper: function(e) {
      console.log(e)
    },
    lower: function(e) {
      console.log(e)
    },
    scroll: function(e) {
      console.log(e)
    },
    scrollToTop: function(e) {
      this.setAction({
        scrollTop: 0
      })
    },
    tap: function(e) {
      for (var i = 0; i < order.length; ++i) {
        if (order[i] === this.data.toView) {
          this.setData({
            toView: order[i + 1],
            scrollTop: (i + 1) * 200
          })
          break
        }
      }
    },
    tapMove: function(e) {
      this.setData({
        scrollTop: this.data.scrollTop + 10
      })
    },

    widgetsToggle: function (e) {
      console.log("click!!");
    }

})

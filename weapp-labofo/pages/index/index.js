//index.js
//获取应用实例
var FormData = require( '../../utils/formData.js' ),
  util = require( '../../utils/util.js' ),
  constants = require( '../../utils/contants.js' ),
  app = getApp();

Page( {
  data: {
    recommend: '定位中.'
  },
  onLoad: function( options ) {
    // 页面初始化 options 为页面跳转所带来的参数
    console.log( 'index.js onLoad:' + JSON.stringify( options ) );

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function( userInfo ) {
      //更新数据
      if( !userInfo.ofoInfo ) {
        setTimeout(function(){
          wx.navigateTo( {
          url: '../login/login'
        });
        }, 300);
        return;
      }
      console.log("index.js onShow 2" );
      that.setData( {
        userInfo: userInfo
      })

      that.getLocation();
    });

    if(that.data.longitude) {
      console.log('exit');
      return;
    }

    var count = 0;
    var timer = setInterval( function() {
      if( that.data.longitude ) {
        clearInterval( timer )
        return;
      }
      var text = '定位中';
      switch( count % 4 ) {
        case 1:
          text += '.';
          break;
        case 2:
          text += '..';
          break;
        case 3:
          text += '...';
          break;
        default:
          break;
      }
      that.setData( {
        recommend: text
      });

      if( count > 30 ) {
        clearInterval( timer )
      }

      count++;
    }, 1000 );
  },
  onShow: function(){
    
  },
  
  // 自动定位
  getLocation: function() {
    var that = this;
    wx.getLocation( {
      success: function( res ) {
        console.log( res )

        var that2 = that;
        var lng = res.longitude;
        var lat = res.latitude;

        that.setData( {
          longitude: lng,
          latitude: lat,
          recommend: '定位中...'
        });

        var url = "http://apis.map.qq.com/ws/geocoder/v1/?location=" + lat + "," + lng + "&get_poi=0&key=7MCBZ-KB536-ELCST-M3F7D-22A62-7BBIT";

        wx.request( {
          url: url,
          data: {},
          header: {
          },
          success: function( res ) {
            if( res && res.data && res.data.status == 0 && res.data.result.formatted_addresses && res.data.result.formatted_addresses.recommend ) {
              that2.setData( {
                recommend: res.data.result.formatted_addresses.recommend
              });
            }
            console.log( res.data )
          }
        });
      }
    })
  },

  // 打开定位 
  openLocation: function(){
    var that = this;
    if (this.data.longitude) {
        wx.openLocation({
          longitude: Number(this.data.longitude),
          latitude: Number(this.data.latitude),
          // name: value.name,
          // address: value.address
        })
    } else {
      console.error("TODO 没有获取到位置")
    }
  }
});

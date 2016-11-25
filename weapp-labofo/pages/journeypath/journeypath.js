// journeyPath.js
var FormData = require( '../../utils/formData.js' ),
  util = require( '../../utils/util.js' ),
  constants = require( '../../utils/contants.js' ),
  app = getApp();

Page( {
  data: {
    // text:"这是一个页面"
    // latitude: 23.099994,
    // longitude: 113.324520,
    // markers: [ {
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   name: 'T.I.T 创意园'
    // }],
    // covers: [ {
    //   latitude: 23.099994,
    //   longitude: 113.344520,
    //   iconPath: '/image/green_tri.png', // 目前有 bug，正确的写法应该是 /image/green_tri.png ，等我们下个版本修复吧T_T 
    // }, {
    //     latitude: 23.099994,
    //     longitude: 113.304520,
    //     iconPath: '/image/green_tri.png',
    //     rotate: 180
    //   }]
  },
  onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log( 'journeyPath.js onLoad:' + JSON.stringify( options ) );

    if( !options || !options.locations ) {
      console.error( '订单错误， 没有订单号' );
      return
    }

    this.setData( {
      carno: options.carno,
      money: options.money
    })

    var locationList = JSON.parse( decodeURIComponent( options.locations ) ),
      userInfo = app.getUserInfoSync();
    //更新数据
    if( !userInfo.ofoInfo ) {
      wx.navigateTo( {
        url: '../login/login'
      });
      return;
    }
    this.setData( {
      userInfo: userInfo
    })

    if( !locationList || !locationList.length ) {
      this.setData( {
        map: {
          hidden: true
        }
      })
    }

    console.log( "locationList[ 0 ] :" + JSON.stringify( locationList[ 0 ] ) )
    this.setData( {
      latitude: locationList[ 0 ][ 0 ],
      longitude: locationList[ 0 ][ 1 ],
      //markers: locationList
      markers: [ {
        latitude: locationList[ 0 ][ 0 ],
        longitude: locationList[ 0 ][ 1 ],
        name: 'T.I.T 创意园'
      }
      ]
      // ,
      // covers: [ {
      //   latitude: locationList[ 0 ][ 0 ],
      //   longitude: locationList[ 0 ][ 1 ],
      //   //iconPath: '../../image/green_tri.png', // 目前有 bug，正确的写法应该是 /image/green_tri.png ，等我们下个版本修复吧T_T 
      // }, {
      //     latitude: locationList[ 1 ][ 0 ],
      //     longitude: locationList[ 1 ][ 1 ],
      //     //iconPath: '../../image/green_tri.png',
      //     rotate: 180
      //   }]
    })

    // this.setData(
    //   {
    //     latitude: 23.099994,
    //     longitude: 113.324520,
    //     markers: [ {
    //       latitude: 23.099994,
    //       longitude: 113.324520,
    //       name: 'T.I.T 创意园'
    //     }],
    //   }
    // )

  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
// login.js
var FormData = require( '../../utils/formData.js' ),
  util = require( '../../utils/util.js' ),
  constants = require( '../../utils/contants.js' ),
  app = getApp();

Page( {
  data: {
    // text:"这是一个页面"
    captcha_code: '../../image/login/captcha.png',
    'captcha.error': 'none',
    phone: '',
    login: {
      hidden: true
    },
    dialog: {
      hidden: true
    },
    menu: {
      hidden: false
    }
  },
  onLoad: function( options ) {
    // 页面初始化 options 为页面跳转所带来的参数
    console.log( 'index.js onLoad:' + JSON.stringify( options ) );

    var userInfo = app.getUserInfoSync();
    if( userInfo && userInfo.ofoInfo && userInfo.ofoInfo.token ) {
      // 回到登陆之前的页面
      wx.navigateBack();
    }
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示

    // 获取钱包余额
    var token = wx.getStorageSync( 'token' );
    if( !token ) {
      return;
    }
    var formData = new FormData();
    formData.append( 'tel', phone );
    formData.append( 'captcha', captcha );

    wx.request( {
      url: constants.API_SERVER + '/v4/info/wallet',
      method: 'POST',
      data: formData.getContentData(),
      header: {
        'Content-Type': formData.getContentType()
      },
      success: function( res ) {
        var data = res.data;
        if( data.errorCode == 200 ) {
          that.setData( { 'captcha.image': 'data:image/png;base64,' + data.values.captcha });
          that.data.captcha.value2;
        } else {
          console.error( "获取验证码错误：" + data );
        }
      }
    });
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  phoneDataChange: function( e ) {
    // 电话变化
    console.log( 'form发生了phoneDataChange事件，携带数据为：', e.detail.value );
    var phone = e.detail.value;
    if( util.validatePhone( phone ) ) {
      this.data.phone = phone;
      this.getCaptcha();
    }
  },
  captchaDataChange: function( e ) {
    // 验证码变化
    console.log( 'form发生了captchaDataChange事件，携带数据为：', e.detail.value );
    var captcha = e.detail.value;

    if( util.validateCode( captcha ) ) {
      this.data.captcha = this.data.captcha || {};
      this.data.captcha.value = captcha;
    }
  },
  getCaptcha: function() {
    //  验证码
    console.log( 'form发生了getCaptcha事件，携带数据为：' );
    var phone = this.data.phone;
    if( !util.validatePhone( phone ) ) {
      this.setData( {
        'captcha.error': 'block;'
      });
      return;
    }

    var formData = new FormData();
    formData.append( 'tel', phone );
    this.data.captcha = this.data.captcha || {};

    var that = this;
    wx.request( {
      url: constants.API_SERVER + '/v2/getCaptcha',
      method: 'POST',
      data: formData.getContentData(),
      header: {
        'Content-Type': formData.getContentType()
      },
      success: function( res ) {
        var data = res.data;
        if( data.errorCode == 200 ) {
          that.setData( { 'captcha.image': 'data:image/png;base64,' + data.values.captcha });
          that.data.captcha.value2;
        } else {
          console.error( "获取验证码错误：" + data );
        }
      }
    });
  },
  getVerifyCode: function() {
    console.log( 'form发生了getVerifyCode事件，携带数据为：' );
    var phone = this.data.phone;
    if( !util.validatePhone( phone ) ) {
      this.setData( {
        'phone.error': 'block;'
      });
      return;
    }

    this.data.captcha = this.data.captcha || {};
    var captcha = this.data.captcha.value;

    if( !captcha || !util.validateCode( captcha ) ) {
      this.setData( {
        'captcha.error': 'block;'
      });
      return;
    }


    var formData = new FormData();
    formData.append( 'tel', phone );
    formData.append( 'captcha', captcha );

    var that = this;
    wx.request( {
      url: constants.API_SERVER + '/v2/getVerifyCode',
      method: 'POST',
      data: formData.getContentData(),
      header: {
        'Content-Type': formData.getContentType()
      },
      success: function( res ) {
        var data = res.data;
        if( data.errorCode == 200 ) {
          that.data.captcha.value2 = captcha;
        } else {
          console.error( "获取验证码错误：" + JSON.stringify( data ) );
        }
      }
    });
  },
  toast2Change: function( e ) {
    // logoin成功
    this.setData( {
      dialog: {
        hidden: true
      }
    });
  },
  formSubmit: function( e ) {
    console.log( 'form发生了submit事件，携带数据为：', e.detail.value );
    var value = e.detail.value,
    agree = e.detail.value;

    this.data.captcha = this.data.captcha || {};
    var captcha = this.data.captcha.value;

    if( !captcha || !util.validateCode( captcha ) ) {
      this.setData( {
        'captcha.error': 'block;'
      });
      return;
    }
    if( !value.code || !util.validateCode( value.code ) ) {
      this.setData( {
        'code': ';'
      });
      return;
    }

    var formData = new FormData();
    var that = this;
    formData.append( 'code', value.code );
    formData.append( 'tel', value.phone );

    wx.request( {
      url: constants.API_SERVER + '/login',
      method: 'POST',
      data: formData.getContentData(),
      header: {
        'Content-Type': formData.getContentType()
      },
      success: function( res ) {
        console.log( res.data )
        var data = res.data;
        if( data && data.errorCode == 200 ) {
          var token = data.values && data.values.token;
          var isNewuser = data.values && data.values.isNewuser;

          // 存phone，token
          app.getUserInfo( function( userInfo ) {
            //更新数据

            userInfo.ofoInfo = {};
            userInfo.ofoInfo.token = token;
            userInfo.ofoInfo.phone = value.phone;

            wx.setStorage( {
              key: 'userInfo',
              data: userInfo,
              complete: function() {
                // 回到登陆之前的页面
                wx.navigateBack();
              }
            });

          });

          that.setData( {
            'dialog.hidden': false,
            'dialog.title': data.msg
          })
        } else {
          that.setData( {
            'code': '',
            'dialog.hidden': false,
            'dialog.title': data.msg
          });
        }
      }
    });
  }
})
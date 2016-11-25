//trade.js

var FormData = require( '../../utils/formData.js' ),
    util = require( '../../utils/util.js' ),
    constants = require( '../../utils/contants.js' ),
    app = getApp();

Page( {
    data: {
        // text:"这是一个页面"
        purchase_list:
        [
            {
                // 消费记录属性
                // {"desc":2009620,"time":"2016-10-12 20:55:59","money":0, "orderno": 0}
            }
        ]
        ,
        recharge_list:
        [
            {
                // 充值记录属性
                // {"descr":2009620,"time":"2016-10-12 20:55:59","money":0}
            }
        ],
        purchase: 'block',
        recharge: 'none'

    },
    onLoad: function( options ) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log( 'trade.js onLoad:' + JSON.stringify( options ) );

        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo( function( userInfo ) {
            //更新数据
            if( !userInfo.ofoInfo ) {
                wx.navigateTo( {
                    url: '../login/login'
                });
                return;
            }
            that.setData( {
                userInfo: userInfo,
                token: userInfo.ofoInfo.token
            })

            that.loadPurchaseList();
            that.loadRechargeList()
        });


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
    },
    loadPurchaseList: function() {
        var formData = new FormData();
        var that = this;
        formData.append( 'token', this.data.token );
        formData.append( 'classify', 0 )
        formData.append( 'page', 1 )

        wx.request( {
            url: constants.API_SERVER + '/detail',
            method: 'POST',
            data: formData.getContentData(),
            header: {
                'Content-Type': formData.getContentType()
            },
            success: function( res ) {
                var data = res.data;
                if( data.errorCode == 200 ) {
                    var info = data.values.info;
                    that.setData( {
                        purchase_list: info
                    });
                } else {
                    console.error( "获取消费记录错误：" + data );
                }
            }
        });
    },
    loadRechargeList: function() {
        var that = this;
        var formData = new FormData();
        formData.append( 'token', this.data.token );
        formData.append( 'classify', 1 )
        formData.append( 'page', 1 )

        wx.request( {
            url: constants.API_SERVER + '/detail',
            method: 'POST',
            data: formData.getContentData(),
            header: {
                'Content-Type': formData.getContentType()
            },
            success: function( res ) {
                var data = res.data;
                if( data.errorCode == 200 ) {
                    var info = data.values.info;
                    that.setData( {
                        recharge_list: info
                    });
                } else {
                    console.error( "获取消费记录错误：" + data );
                }
            }
        });
    },
    toPurchase: function() {
        this.setData(
            {
                purchase: 'block',
                recharge: 'none'
            }
        )
        //this.loadPurchaseList()
    },
    toRecharge: function() {
        this.setData(
            {
                purchase: 'none',
                recharge: 'block'
            }
        )
        //this.loadRechargeList()
    }
})
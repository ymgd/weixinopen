Page( {
    data: {
        datas: [],
        loadingHidden: true,
        modalHidden: true,
    },
    onLoad: function( options ) {
        var that = this;
        that.Request();

    },
    Request: function() {
        var that = this;
        that.setData( {
            loadingHidden: false,
            modalHidden: true,
        });
        wx.request( {
            url: "https://www.v2ex.com/api/topics/latest.json",
            success: function( data ) {
                that.setData( {
                    datas: data.data,
                    loadingHidden: true,
                    modalHidden: true,
                })
            },
            fail: function( data ) {
                that.setData( {
                    loadingHidden: true,
                    modalHidden: false
                })
            }
        })
    },
    Detail: function( e ) {
        //console.log(e.currentTarget.id);
        wx.navigateTo( {
            url: '../detail/detail?postid=' + e.currentTarget.id,
        })
    },
    onReady: function() {
    },
    onShow: function() {
    },
    onHide: function() {
    },
    onUnload: function() {
    }
})
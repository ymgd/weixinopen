Page( {
  data: {
    datas: [],
    loadingHidden: true,
    modalHidden: true,
  },
  onLoad: function( options ) {
    this.Request();
  },
  Request: function() {
    var that = this;
    that.setData({
        loadingHidden: false,
        modalHidden: true,
    });
    wx.request( {
      url: "https://www.v2ex.com/api/nodes/all.json",
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
  NodeDetail:function(e){
      wx.navigateTo({
            url: '../detail/detail?nodeid='+e.currentTarget.id,
        })
  }

})
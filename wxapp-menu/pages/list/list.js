var app = getApp();
Page({
    data: {
        list: []
    },
    onLoad: function(options) {
        var page = this;
        var cid = options.cid;
        var name = options.name;
        wx.setNavigationBarTitle({
          title: name,
          success: function(res) {
            // success
          }
        })
        console.log(cid);
        wx.request({
          url: 'https://apis.juhe.cn/cook/index?key=' + app.AppKey + '&cid=' + cid,
          method: 'GET',
          success: function(res){
            // success
            console.log(res.data)
            var list = res.data.result.data;
            page.setData({
                list: list
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    navToDetail: function(e) {
      var id = e.currentTarget.id;
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id
      })
    }
})
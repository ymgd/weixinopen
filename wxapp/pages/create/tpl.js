 Page({
     getTpl: function(e) {

         wx.navigateTo({
             url: '/pages/create/create?id=' + e.target.dataset.tpl + '&theme=' + e.target.dataset.theme + '&_id=' + e.target.dataset.id
         });
     },

     onShow: function() {
         var _this = this;

         wx.setNavigationBarTitle({
             title: '模板库-选择模板'
         });
         wx.showNavigationBarLoading();
         wx.request({
             url: 'https://web.huizecdn.com/api/wxapp/get-tpl',
             data: {
                 time: (new Date().getTime())
             },
             method: 'GET',
             success: function(res) {
                 _this.setData({
                     tpls: res.data
                 });
                 wx.hideNavigationBarLoading();
             },
             fail: function() {},
             complete: function() {}
         });
     }
 });
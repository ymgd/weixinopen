 var app = getApp();

 var getList = function() {
   var _this = this;
   wx.request({
     url: app.globalData.domain + 'api/wxapp/get/',
     data: {
       time: app.globalData.getTime()
     },
     method: 'GET',
     success: function(res) {
       _this.setData({
         allActivity: res.data
       });
        wx.hideNavigationBarLoading();
     }
   });
 };
 Page({
   data: {
     scrollTop: 100
   },
   upper: function(e) {},
   lower: function(e) {},
   scroll: function(e) {},
   tap: function(e) {},
   tapMove: function(e) {
     this.setData({
       scrollTop: this.data.scrollTop + 10
     })
   },
   detial: function(e) {
     var id = e.target.dataset.id;
     if (!id) {
       return;
     }
     wx.navigateTo({
       url: '/pages/detial/detial?id=' + id
     });
   },
   onPullDownRefresh: function() {
     getList.call(this);
   },
   onLaunch:function(){
    
   },
   onShow: function() {
     getList.call(this);
     app.login(function(res) {
       console.log(res);
     });
     wx.showNavigationBarLoading();
   },
   onReady: function() {
    
    
   },
   onLoad: function() {
     getList.call(this);
    
   }
 });
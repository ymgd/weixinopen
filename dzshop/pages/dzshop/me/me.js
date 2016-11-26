var app = getApp()
Page({
  data: {
      modalHidden:true,
      modalHidden2:"",
    myshop:{
      shop1:"待付款",
      shop2:"待发货",
      shop3:"已发货",
      shop4:"已完成"
    },
    v1:{
      mymoney:["我的账户余额","/images/mymoney.png"],
      mytel:["绑定/修改手机","/images/mytel.png"],
      mycard:["我的代金券","/images/mycard.png"],
      myinfo:["我的个人资料","/images/myinfo.png"],
      mydress:["我的收货地址","/images/mydress.png"],
      myself:["关于我们","/images/myself.png"],
      myout:["退出登录","/images/myout.png"]
    },
    current: 2,
    inputname:"点击登录",
    shop:{
      meimg:"/images/dezelogo.png",
     // name:"点击登录",
      t1:0,//待付款
      t2:0,//待发货
      t3:0,//已发货
      t4:0//已完成
    }

  },
  onLoad: function () {
    // console.log('loaded.');

  },
  mymoney:function(){
    wx.navigateTo({
      url:"../mymoney/mymoney"
  });
},
mytel:function(){
  wx.navigateTo({
    url:"../mytel/mytel"
});
},
myinfo:function(){
  wx.navigateTo({
    url:"../myinfo/myinfo"
});
},
mycard:function(){
  wx.navigateTo({
    url:"../mycard/mycard"
});
},
myself:function(){
  wx.navigateTo({
    url:"../myself/myself"
});
},
login:function () {
    this.setData({
        modalHidden:false
    });
},
saveInput: function(e) {
        this.setData({
            inputname: e.detail.value
        });
    },
    actionConfirm: function(e) {
        var that = this;
        wx.setStorageSync('username', this.data.username);
        wx.setStorageSync('password', this.data.password);
        this.setData({
            modalHidden: true,
            nickName: that.data.inputname
        });
    },
    actionCancel: function() {
        this.setData({
            modalHidden: true
        });
    }




});

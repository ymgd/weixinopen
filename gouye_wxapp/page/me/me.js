Page({
  data:{
    title: '',
    desc: '',
    meList: [{
        name: '我的活动',
        icon: '',
        url: '../review/review'
      }, {
        name: '常用报名人',
        icon: '',
        url: '../signuping/signuping'
      }, {
        name: '我的钱包',
        icon: '',
        url: '../myAccount/myAccount'
      }, {
        name: '密码修改',
        icon: '',
        url: '../changePwd/changePwd'
      }, {
        name: '关于够野',
        icon: '',
        url: '../aboutus/aboutus'
      }, {
        name: '推荐给好友',
        icon: '',
        url: '../shareFriend/shareFriend'
      }, {
        name: '帮助中心',
        icon: '',
        url: '../help/help'
      }]
  },

  onLoad:function() {
      console.log('me page onLoad')
  }

})
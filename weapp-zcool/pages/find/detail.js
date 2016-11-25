
var app = getApp();

Page({
  data:{
    userInfo: {},
    title: '原创作品：绘本《秋天的小魔女》',
    author: 'ZyuNArt',
    time: '4小时前',
    look: 300,
    like: 20,
    isLikeBtn: true,
    defaultText: '',
    imgUrls: [
        'http://img.zcool.cn/community/01561e58290f52a84a0e282b116e5b.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/0127be58290f58a84a0e282b169171.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01597858290f5ea84a0d304ff7dc59.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01f45358290f5ba84a0e282be85bf9.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/0145cb58290f66a84a0d304f7bc45b.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01c80558290f6ba84a0d304f460168.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01067c58290f70a84a0e282bbffc9f.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01f94a58290f74a84a0e282bca81af.jpg@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/019d9c5829107ea84a0d304f3d145e.jpg@900w_1l_2o_100sh.jpg',
    ],
    imgUrls2: [
        'http://img.zcool.cn/community/010aab58290fbba84a0e282b67b099.png@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/0133e758290f97a84a0d304f1bc090.png@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/012d1558290fa0a84a0d304f1b67aa.png@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/01912658290faea84a0d304f201a87.png@900w_1l_2o_100sh.jpg',
        'http://img.zcool.cn/community/017ad45829109da84a0d304ff8d01e.jpg@900w_1l_2o_100sh.jpg'
    ],
    comments: [
        {
            imgurl: 'http://img.zcool.cn/community/0447a056fd21f20000012d24fd193c.jpg@48w_48h_2o_100sh.jpg',
            name: 'V哥的炎魔刀',
            time: '38分钟前',
            comment: '童话般的感觉~点个赞~！'
        },
        {
            imgurl: 'http://img.zcool.cn/community/0491c555405beb0000017c50f499f9.jpg@48w_48h_2o_100sh.jpg',
            name: 'qinhusenq',
            time: '2小时前',
            comment: '色彩好温馨'
        },
        {
            imgurl: 'http://img.zcool.cn/community/04814c57ff41f0a84a0e282be55538.jpg@48w_48h_2o_100sh.jpg',
            name: 'WICHAN_',
            time: '3小时前',
            comment: '好棒~'
        }
    ]
  },
  onLoad:function(options){
    var _this = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      _this.setData({
        userInfo:userInfo
      });
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  likeEvent: function(e) {
    wx.showToast({
        title: '推荐成功',
        icon: 'success'
    });
    this.setData({
        like: this.data.like + 1,
        isLikeBtn: false
    });
  },
  // 提交评论
  formSubmit: function(e) {
    var _this = this;
    var comment = e.detail.value.comment;
    console.log(e);
    wx.showToast({
        title: '发表中',
        icon: 'loading'
    });
    _this.setData({
        defaultText: comment
    });
    if (comment && comment !== '') {
        setTimeout(function() {
            wx.hideToast();
            var nickname = _this.data.userInfo.nickName;
            var imgurl = _this.data.userInfo.avatarUrl;
            var time = '刚刚发表';
            var comments = _this.data.comments;
            
            comments.unshift({
                imgurl: imgurl,
                name: nickname,
                time: time,
                comment: comment
            });
            e.detail.value.comment = '';
            _this.setData({
                comments: comments,
                defaultText: ''
            });
            wx.showToast({
                title: '发表成功',
                icon: 'success'
            });
        }, 500);
    } else {
        wx.hideToast();
        wx.showModal({
            title: '提示',
            content: '评论内容不能为空。',
            showCancel: false,
            confirmText: '我知道了'
        })
    }
  },
})
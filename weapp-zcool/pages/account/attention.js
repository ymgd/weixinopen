
Page({
  data: {
    attention: [
      {
        name: '夏筱丫',
        desc: '女 / 武汉 / 摄影师',
        imgUrl: 'http://img.zcool.cn/community/0482de5693773a000001564eb51d2d.jpg'
      }, {
        name: 'lanbzhh',
        desc: '男 / 成都 / 三维/动画师',
        imgUrl: 'http://img.zcool.cn/community/046b005615dcc90000016fae6d31c2.jpg'
      }, {
        name: 'yfy1314107',
        desc: '男 / 深圳 / 绘画/插画师',
        imgUrl: 'http://img.zcool.cn/community/043ef1569f5cee0000017d897fa8c2.jpg'
      }, {
        name: 'pijiou307c',
        desc: '男 / 北京市 / 绘画/插画师',
        imgUrl: 'http://img.zcool.cn/community/0401295548fbf60000019ae9ad009e.jpg'
      }, {
        name: 'hidenana海德娜娜',
        desc: '女 / 北京市 / 摄影师',
        imgUrl: 'http://img.zcool.cn/community/04e917553fa53e0000014027687096.jpg'
      }, {
        name: 'Ivanja',
        desc: '男 / 深圳 / GUI设计师',
        imgUrl: 'http://img.zcool.cn/community/040a73555b6580000001aca575f51b.jpg'
      }, {
        name: '僵小鱼',
        desc: '男 / 北京市 / 三维/动画师',
        imgUrl: 'http://img.zcool.cn/community/046703554088980000017c5032ee5b.jpg'
      }, {
        name: '星辰空间',
        desc: '男 / 深圳 / 设计爱好者',
        imgUrl: 'http://img.zcool.cn/community/048325573ec5e632f8757cb9bc5568.jpg'
      }, {
        name: 'michaelpst',
        desc: '男 / 深圳 / 网页设计师',
        imgUrl: 'http://img.zcool.cn/community/04685e553f4d000000019987169ce2.jpg'
      }
    ]
  },
  onLoad: function() {
  },
  unsubscribeEvent: function(e) {
    var _this = this;
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '提示',
      content: '确定不再关注？',
      success: function(res) {
        // 删除
        if (res.confirm === 1) {
          var arr = _this.data.attention;
          arr.splice(idx, 1);
          _this.setData({
            attention: arr
          });
        }
      }
    })
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    });
  },
  onReachBottom: function() {
    wx.stopPullDownRefresh({
      complete: function (res) {
        console.log(res, new Date())
      }
    })
  }
})
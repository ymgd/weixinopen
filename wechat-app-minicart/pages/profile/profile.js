Page({
  data: {
    title: 'About Me',
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: '',
      avatarUrl: ''
    }
  },

  getUserInfo() {
    const that = this
    wx.getUserInfo({
      success (res) {
        console.log(res)
        that.setData({ userInfo: res.userInfo })
      }
    })
  },

  onLoad () {
      const that = this
    wx.login({
      success (res) {
        if (res.code) {
          console.log('登录成功！' + res.code)
          wx.getUserInfo({
          success (res) {
          that.setData({ userInfo: res.userInfo })
          }
        })
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail () {},
      complete () {},
    })
  }
})

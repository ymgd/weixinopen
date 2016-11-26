import Promise from '../libs/bluebird.min'
import util from '../utils/util'

const app = getApp()

function getUserInfo() {
  let userInfo = app.globalData.userInfo

  if (userInfo) {
    return Promise.resolve(userInfo)
  }

  return util.wxPromisify(wx.login)().then(() => {
    return util.wxPromisify(wx.getUserInfo)()
  }).then((res) => {
    userInfo = res.userInfo
    app.globalData.userInfo = userInfo
    return userInfo
  })
}

module.exports = {
  getUserInfo: getUserInfo
}

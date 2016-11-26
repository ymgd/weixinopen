import util from '../../utils/util'
import userService from '../../services/user.service'

const app = getApp()

new class IndexPage {

  data = {
    userInfo: {},
    greeting: 'Hello,World'
  }

  ///////////////////////////////////////////////////////////////////////////

  constructor() {
    Page(this)
  }

  onLoad() {
    console.log(">>> page:onLoad", app)

    userService.getUserInfo().then((userInfo) => {
      this.setData({userInfo: userInfo})
    }).catch((e) => {
      console.log(e);
    })
  }

  onReady() {
    console.log(">>> page:onReady")
  }

  onShow() {
    console.log(">>> page:onShow")
  }

  onHide() {
    console.log(">>> page:onHide")
  }

  onUnload() {
    console.log(">>> page:onUnload")
  }

  onPullDownRefresh() {
    console.log(">>> page:onPullDownRefresh")
  }

  ///////////////////////////////////////////////////////////////////////////
  // 微信小程序(WAService.js)用hasOwnProperty进行bind的事件处理函数检测，
  // 通过定义方法的方式将不会被检测到，必须以定义属性的方式才能被检测到：
  ///////////////////////////////////////////////////////////////////////////

  onButtonTap = () => {
    console.log(">>>>>> button tapped")

    util.wxPromisify(wx.setStorage)({
      key: "abc",
      data: "11111"
    }).then((res) => {
      console.log(">>>>>>>> result:", res)
    }).catch((res) => {
      console.error(">>>>>>> error:", res)
    })
  }

  onViewTap = () => {
    wx.navigateTo({url: '../settings/settings'})
  }

}

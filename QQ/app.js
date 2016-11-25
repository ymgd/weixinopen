/**
 * v0.0.1 仿Q
 * 
 * 后续计划:
 *             1、完善音乐播放器(情绪音乐播放器升级至v0.0.5)
 *             2、增加看点功能功能
 *             3、增加同城服务功能
 * 
 * 精彩继续，敬请关注
 * 
 * 欢迎访问: http://www.zhixingai.ren
 * 开源地址: https://github.com/hank583746309
 *          http://git.oschina.net/laohuangshu
 * 
 * @author 老皇叔（QQ:2219510983）
 * @date 2016.10.20 
 */
App({
  onLaunch: function () {
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    host    : 'http://www.zhixingai.ren/'
  }
})
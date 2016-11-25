const app = getApp()
const API_URL = require('../../libraries/HttpRequestFacade.js')
Page({
  data:{
    // text:"这是一个页面"
     navs: [
      {
        image: '../../images/order_club_green_icon@2x.png',
        text: '球场预定'
      }, {
        image: '../../images/order_commodity_blue_icon@2x.png',
        text: '球具商城'
      }, {
        image: '../../images/private_service_purple_icon@2x.png',
        text: '私人服务'
      }
    ],
    province:'北京',
    recommandClubsArray:[],
    recommendCommodityArray:[],
    // wWidth:'111'
  },
  onLoad:function(options){
//     wx.getSystemInfo({
//         success:function(res){
//         console.log(res.model)
//         console.log(res.pixelRatio)
//         console.log(res.windowWidth)
//         console.log(res.windowHeight)
//         console.log(res.language)
//         console.log(res.version)
//         this.setData({wWidth: res.windowWidth})
//         console.log("屏幕宽度"+this.data.wWidth)
//   }
// })
    // 页面初始化 options为页面跳转所带来的参数
    API_URL.findRecommandClubs(this.data.province).then(d => {
          if (d.length) {
              // console.log(d)
              this.setData({recommandClubsArray: d, loading: false })
              // console.log(this.data.recommandClubsArray)
            } else {
            }
        })


    API_URL.findRecommandCommodity().then(d => {
          if (d.length) {
              console.log(d)
              this.setData({recommendCommodityArray: d, loading: false })
              console.log(this.data.recommendCommodityArray)
           } else {
            
           }
        })  
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
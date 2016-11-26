//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "imgUrls":[
      "../../images/swiper1.jpg",
      "../../images/swiper2.jpg"
    ],
    "courses":[
      {
        num:"1",
        title:"成功创业4部曲",
        images:"../../images/course.jpg"
      },
      {
        num:"2",
        title:"创业者的版权保护常识",
        images:"../../images/course1.jpg"
      },
      {
        num:"3",
        title:"互联网时代下如何制作标题",
        images:"../../images/course2.jpg"
      }
    ]
  },
  onLoad: function () {
    var that = this
  }
})

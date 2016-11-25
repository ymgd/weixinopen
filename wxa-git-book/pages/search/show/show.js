var html2text = require('./html2Text.js')
var WxParse = require('../../../lib/wxParse/wxParse/wxParse.js');
var app = getApp()
let startX, startY, endX, endY, Drawering;
Page({
  data: {
    id: "",
    sections: [],
    wxParseData: "",
    prev_path: "",
    next_path: ""
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.baseUrl + "book/"+options.id+"/contents/"+options.path.replace(/.md/, ".json"),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        let sections = res.data.sections.map(function(section, index) {
          let content = html2text.convertHtmlToText(section.content)
          section.content = html2text.decodeHtmlEntity(section.content)
          return section
        })
        that.setData({
          id: options.id,
          sections: sections,
          wxParseData: WxParse('html',res.data.sections[0].content),
          prev_path: res.data.progress.current.prev.path,
          next_path: res.data.progress.current.next.path
        })
      }
    })
  },
  drawerStart: function(e) {
    let touch = e.touches[0]
    startX = touch.clientX;
    startY = touch.clientY;
    Drawering = true
  },
  drawerMove: function(e){
    var self = this;
    if(Drawering) {
      let tc = e.touches[0];
      endX = tc.clientX;
      endY = tc.clientY;
      let xNum = (endX - startX) < 0 ? startX - endX : endX-startX;
      let yNum = (endY - startY) < 0 ? startY - endY : endY-startY;
      if(xNum  >= yNum) {
        if(endX - startX <= -5){
          console.log('左滑动');
          wx.navigateTo({url: `/pages/search/show/show?id=${this.data.id}&path=${this.data.next_path}`})
        } else if (endX - startX >= 5) {
          console.log('右滑动');
          wx.navigateTo({url: `/pages/search/show/show?id=${this.data.id}&path=${this.data.prev_path}`})
        }
      }
    }
    Drawering = false
  }
})

//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    lists:[
      {
        imagesUrl:"../../images/course.jpg",
        title:"成功创业4部曲",
        price:"20.00",
        data:"2016-12-16",
        person:"100",
        teacher:"秦静",
        teacherNum:"0",
        content:"创业路上总布满各种各样的坑，布满荆棘。前路漫漫，成功好像海市蜃楼，那么近又那么远？怎么破？问题出在哪里？如今的创业市场虽然商机无限，但对资金、能力、经验都有限的大学生创业者来说，并非'弯腰就能拾到地上的财富'。人人都可以创业，但是，却不是人人都可以创业成功的。这其间有着许许多多成功创业的小秘诀."
      },
      {
        imagesUrl:"../../images/course1.jpg",
        title:"创业者的版权保护常识",
        price:"20.00",
        data:"2016-12-16",
        person:"100",
        teacher:"于景晨",
        teacherNum:"1",
        content:"创业路上总布满各种各样的坑，布满荆棘。前路漫漫，成功好像海市蜃楼，那么近又那么远？怎么破？问题出在哪里？如今的创业市场虽然商机无限，但对资金、能力、经验都有限的大学生创业者来说，并非'弯腰就能拾到地上的财富'。人人都可以创业，但是，却不是人人都可以创业成功的。这其间有着许许多多成功创业的小秘诀."
      },
      {
        imagesUrl:"../../images/course2.jpg",
        title:"互联网时代下如何制作标题",
        price:"20.00",
        data:"2016-12-16",
        person:"100",
        teacher:"薄胜",
        teacherNum:"2",
        content:"创业路上总布满各种各样的坑，布满荆棘。前路漫漫，成功好像海市蜃楼，那么近又那么远？怎么破？问题出在哪里？如今的创业市场虽然商机无限，但对资金、能力、经验都有限的大学生创业者来说，并非'弯腰就能拾到地上的财富'。人人都可以创业，但是，却不是人人都可以创业成功的。这其间有着许许多多成功创业的小秘诀."
      }
    ]
  },
  onLoad: function (num) {
    const listsShow = this.data.lists[num.num - 1];
    this.setData({lists:[listsShow]})
  },
  btnClick: function() {
    wx.showModal({
      title: '提示',
      content: '确定报名该课程吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})


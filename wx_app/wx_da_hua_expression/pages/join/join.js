
var global_page
Page({
  data: {
    title: '最新话题',
    latest: [],
    hidden: false,
    miniHidden:true,
    treeHidden:true,
    new_image:"../../images/node_on.png",
    new_video:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    img_first:"../../images/gif_in_1.gif",
    img_seconde:"../../images/gif_in_2.gif",
    editorUrl:"", //预备编辑的图片
  },
  addFirst:function()
  {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        global_page.data.img_first = res.tempFilePaths

      }
    })
  },
  addSeconde:function()
  {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        global_page.data.img_seconde = res.tempFilePaths
        console.log( global_page.data.img_seconde )

      }
    })
  },
    onLoad: function () {
    // this.fetchData();
    global_page = this
    // this.fetchExpress();
    
  }
})
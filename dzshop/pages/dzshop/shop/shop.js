Page({
  data: {
    current: 1,
    text:"德泽特产-精品店",
    logoImg:"/images/shop1.jpg",
    logomode:"aspectFit",
    listmode:"scaleToFill",
    listimg:[
      "/images/shop2.jpg",
      "/images/shop3.jpg",
      "/images/shop4.jpg",
      "/images/shop5.jpg"

    ]
  },
  onLoad: function () {
    // console.log('loaded.');

},
bbt:function () {
    wx.navigateTo({
      url:"../allthing/allthing"
    })
}
});

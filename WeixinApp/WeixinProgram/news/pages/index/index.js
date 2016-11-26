//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrl:[

    ],
    newsList:[],
  },
  //事件处理函数
  bindViewTap: function(ev) {
    console.log(ev);
    wx.navigateTo({
      url: 'http://mini.eastday.com/mobile/161026173251864.html?qid=juheshuju'
    })
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url:"http://v.juhe.cn/toutiao/index",
      data:{
        type:'',
        key:'e76003a39de21038a001304363b3ef3b'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          newsList:res.data.result.data
        })
      }
    })
  }
})

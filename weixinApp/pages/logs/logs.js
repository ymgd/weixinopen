//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    images: [],
    inputVal: 'aaaaa'
  },
  upload: function(){

    var parentThis = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);

        wx.getImageInfo({

        src: 'https://36dong.com/assets/images/index/box.png',
        success: function (res) {
          console.log(res)
          console.log(res.width)
          console.log(res.height)
          // var msg = '宽度为：' + res.width + ',高度为为: ' + res.height
          wx.showModal({
            title: '提示',
            content: 'aadadasdasdadadasda',
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        },
        fail: function(e){
          var result = util.json2Form(e);

          wx.showModal({
            title: '提示',
            content: result,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
        // complete: function(){
        //   wx.showModal({
        //     title: '提示',
        //     content: 'complete',
        //     success: function(res) {
        //       if (res.confirm) {
        //         console.log('用户点击确定')
        //       }
        //     }
        //   })
        // }
      })


        parentThis.setData({
          images: tempFilePaths
        })
      }
    })
  },
  // previewImage: function(){
  //   wx.previewImage({
  //     current: 'https://resource.36dong.com/banner/20160825/c2fd9f089bf1846f22c133829833d12e.jpg', // 当前显示图片的http链接
  //     urls: ['https://resource.36dong.com/banner/20160825/c2fd9f089bf1846f22c133829833d12e.jpg',
  //            'https://resource.36dong.com/theme/20150702/22f470b231e636b109ac5f80b0c5291e.jpg',
  //            'https://resource.36dong.com/theme/20150702/1acda0745afa27fd29a0a07472cb1b23.jpg?aaadsdfsdfs'
  //     ] // 需要预览的图片http链接列表
  //   })
  // },
  tapName: function(){

    // wx.showModal({
    //     title: '提示',
    //     content: 'aaasdasdasdas',
    //     success: function(res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       }
    //     }
    //   })

    //   return false;
    
      wx.getImageInfo({

        src: 'https://resource.36dong.com/banner/20160825/c2fd9f089bf1846f22c133829833d12e.jpg',
        
        success: function (res) {
          console.log(res)
          console.log(res.width)
          console.log(res.height)
          // var msg = '宽度为：' + res.width + ',高度为为: ' + res.height
          // wx.showModal({
          //   title: '提示',
          //   content: 'aadadasdasdadadasda',
          //   success: function(res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //     }
          //   }
          // })
        }
      })
  },
  onLoad: function () {

    wx.setNavigationBarTitle({
      title: '当前页面'
    })

    var count = 0
    var maxRequest = 100


    var getRequest = function(){

      var postData = {
        id: 1234444,
        name: 'adasdadad'
      };
      postData = util.json2Form(postData);
      
      
      // post数据成功
      wx.request({
        url: 'https://36dong.com/t/wxRes', //仅为示例，并非真实的接口地址
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },
        method: "POST",
        data:postData,
        success: function(res) {
          count++
          console.log(count)
          if(count < maxRequest){
            // getRequest()
          }
          
        },
        
        fail: function(res){
          console.log(res)
        }

      })

    }

    // https请求 
    for(var i = 0; i< 1;i++){

      getRequest();
    }

    // wx.showActionSheet({
    //     itemList: ['A', 'B', 'C'],
    //     success: function(res) {
    //       if (!res.cancel) {
    //         console.log(res.tapIndex)
    //       }
    //     }
    //   })
    

    

    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})

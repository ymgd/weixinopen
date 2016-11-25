var toastNum = 2
var pageData = {}
pageData.data = {
   items: [
        { imgUrls: '../../assets/img1.png'},
        { imgUrls: '../../assets/img2.png'},
        { imgUrls: '../../assets/img3.png'},
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    btnText: "预约设计师",
    introduction: "左右拖动以选择"
}
for(var i = 0; i <= toastNum; ++i) {
  pageData.data['toast'+i+'Hidden'] = true
  ;(function (index) {
    pageData['toast'+index+'Change'] = function(e) {
      var obj = {}
      obj['toast'+index+'Hidden'] = true
      this.setData(obj)
    }
    pageData['toast'+index+'Tap'] = function(e) {
      var obj = {}
      obj['toast'+index+'Hidden'] = false
      this.setData(obj)
    }
  })(i)
}

Page(pageData)

// Page({
//   data: {
//     items: [
//         { imgUrls: '../../assets/img1.png'},
//         { imgUrls: '../../assets/img2.png'},
//         { imgUrls: '../../assets/img3.png'},
//     ],
//     indicatorDots: false,
//     autoplay: true,
//     interval: 2000,
//     duration: 1000,
//     btnText: "预约设计师",
//     introduction: "左右拖动以选择"
//   }
 
// })
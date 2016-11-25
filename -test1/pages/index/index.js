var slide = {
  data: {
    imgUrls: [
      '/images/test1.jpg',
      '/images/test1.jpg',
      '/images/test1.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
    didLeft: function(e) {
    console.log("方式一")
  },
    didRight: function(e) {
    console.log("方式二")
  },
    didItem: function(e) {
    console.log("链接")
  }
}

var buttonLeft = {
    data:{
        primarySize:'default',
        loading:false,
        //背景色透明
        plain:false,
        //是否禁用
        disabled:false
    }
}

var buttonRight = {
    data:{
        primarySize:'default',
        loading:false,
        //背景色透明
        plain:false,
        //是否禁用
        disabled:false
    }
}


Page(slide)
Page(buttonLeft)
Page(buttonRight)
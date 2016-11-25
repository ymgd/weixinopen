
//获取应用实例
var app = getApp()
Page({
  data: {
    tokenID: '',
    imgPaths: [],
    imgCount: 9,
    provinceList: [],
    cityList: [],
    collegeList: [],
    selectedInfo: {'provinceName': '省份','cityName':'城市','collegeName':'学校'},
    priceInfo:{},
    typeInfo: {'typeID':'', 'typeName': '商品类型'},
    showInfo:{'oldPrice': false, 'currentPrice': true, 'shipmentPrice': true, 
    'keyBoard': false, 'camera': true, 'location': true, 'cameraImg':true, 'addImg': false,
    'titleDescription': true, 'currentKeyBoard': false, 'shipmentKeyBoard': false}
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    //获取本地缓存中的tokenID(同步)
    try {
      var value = wx.getStorageSync('tokenID')
      if (value) {
        that.setData({
        tokenID: value,
        priceInfo:{'oldPrice': '','currentPrice':'','shipmentPrice':''},
        })
      }
    } 
    catch (e) {
      // Do something when catch error
    }
  },

  //进入地点选择界面
  goToLocationPage: function(){
    wx.navigateTo({
      url: '../location/location'
    })
  },

  //进入类型选择界面
  goToTypePage: function(){
    wx.navigateTo({
      url: '../merchandiseType/merchandiseType'
    })
  },

  //进入标签选择界面
  goToSignaturePage: function(){
    wx.navigateTo({
      url: '../signature/signature'
    })
  },


  //选择图片
  chooseImage: function(){
      var that = this
      wx.chooseImage({
        sizeType: ['original', 'compressed'], 
        sourceType: ['album', 'camera'],
        success: function (res) {
            var tempFilePaths = res.tempFilePaths
            var imgLength = res.tempFilePaths.length
            var maxLength = that.data.imgCount - that.data.imgPaths.length
            if (imgLength > maxLength){
                wx.showModal({
                title: '提示',
                content: '最多只能选择九张图片',
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              })
            }
            else{       
              for (var i=0; i<imgLength; i++)
              { 
                that.data.imgPaths.push(tempFilePaths[i])
              }
              var showInfo = that.data.showInfo
              showInfo.addImg = true
              showInfo.cameraImg = false
              that.setData({
                imgPaths: that.data.imgPaths,
                showInfo: showInfo
              })
            }
      }
      })
  },

  //删除图片
  deleteImg: function(imgPathList){
    var that = this
    that.setData({
      imgPaths: imgPathList
    })
  },

  //显示选择地点
  showLocation: function(selectedInfo){
    var that = this
    that.setData({
      selectedInfo: selectedInfo
    })
  },

  //显示选择商品类型
  showType: function(selectedInfo){
    var that = this
    that.setData({
      typeInfo: selectedInfo
    })
  },

  //每一次显示界面
  onShow: function(){
    var that = this
    try {
      var locationInfo = wx.getStorageSync('location')
      if(locationInfo[1] == true){
        that.showLocation(locationInfo[0])
        try {
        wx.setStorageSync('location', [])
        } 
        catch (e) {    
        }
      }
      var typeInfo = wx.getStorageSync('type')
      console.log(typeInfo)
      if(typeInfo[1] == true){
        that.showType(typeInfo[0])
        try {
        wx.setStorageSync('type', [])
        } 
        catch (e) {    
        }
      }
      
      var deleteInfo = wx.getStorageSync('imgPaths')
      if (deleteInfo[1] == true) {
          that.deleteImg(deleteInfo[0])
          try {
            wx.setStorageSync('imgPaths', [])
          } 
          catch (e) {    
          }
        }
      } 
    catch (e) {
      // Do something when catch error
    }
  },

  //进入预览界面
  goToPreviewPage: function(event){
    var imgPath = event.currentTarget.dataset.imgpath
    var imgPaths = event.currentTarget.dataset.imgpaths
    var imgIndex = event.currentTarget.dataset.imgindex
    console.log(event)
    var imgInfo = {}
    imgInfo['imgIndex'] = imgIndex
    imgInfo['imgPath'] = imgPath
    imgInfo['imgPaths'] = imgPaths.split(',')
    var imgString = JSON.stringify(imgInfo)
    wx.navigateTo({
      url: '../preview/preview?imgInfo=' + imgString
    })
  },

  //下面是关于价格的变更
  //下面是关于原价的函数
  //(1)原价的输入显示界面
  getInputPage: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.keyBoard = !(showInfo.keyBoard)
    showInfo.currentKeyBoard = false
    showInfo.shipmentKeyBoard = false
    showInfo.camera = false
    showInfo.location = false
    showInfo.titleDescription = false
    that.setData({
      showInfo: showInfo
    })
  },
  //(2)在价格中添加1-9数字
  pushPriceNumber: function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.oldPrice = priceInfo.oldPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },
  
  //(3)在价格中添加0，00，.
  pushOtherPriceNumber:function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.oldPrice = priceInfo.oldPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },

  //(4)完成价格输入
  completePrice: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.keyBoard = !(showInfo.keyBoard)
    showInfo.camera = !(showInfo.camera)
    showInfo.location = !(showInfo.location)
    showInfo.titleDescription = !(showInfo.titleDescription)
    var priceInfo = that.data.priceInfo
    priceInfo.oldPrice = Number(priceInfo.oldPrice).toFixed(2)
    if(priceInfo.oldPrice > 1e5){
      priceInfo.oldPrice = Number(0).toFixed(2)
      that.setData({
        priceInfo: priceInfo
      })
      wx.showToast({
        title: '输入价格不能大于100000!',
        icon: 'loading',
        duration: 1000
      })
    }
    else{
      that.setData({
      showInfo: showInfo,
      priceInfo: priceInfo
    })
    }

  },


  //(5)将价格退后一位
  popPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    var oldPrice = priceInfo.oldPrice
    priceInfo.oldPrice = oldPrice.slice(0, oldPrice.length - 1)
    that.setData({
      priceInfo: priceInfo
    })
  },

  //(6)重新输入价格
  resetPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.oldPrice = ''
    that.setData({
      priceInfo: priceInfo
    })
  },

    //下面是关于现价的函数
  //(1)现价的输入显示界面
  getCurrentInputPage: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.keyBoard = false
    showInfo.shipmentKeyBoard = false
    showInfo.currentKeyBoard = !(showInfo.currentKeyBoard)
    showInfo.camera = false
    showInfo.location = false
    showInfo.titleDescription = false
    that.setData({
      showInfo: showInfo
    })
  },
  //(2)在价格中添加1-9数字
  pushCurrentPriceNumber: function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.currentPrice = priceInfo.currentPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },
  
  //(3)在价格中添加0，00，.
  pushOtherCurrentPriceNumber:function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.currentPrice = priceInfo.currentPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },

  //(4)完成价格输入
  completeCurrentPrice: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.currentKeyBoard = !(showInfo.currentKeyBoard)
    showInfo.camera = !(showInfo.camera)
    showInfo.location = !(showInfo.location)
    showInfo.titleDescription = !(showInfo.titleDescription)
    var priceInfo = that.data.priceInfo
    priceInfo.currentPrice = Number(priceInfo.currentPrice).toFixed(2)
    if(priceInfo.currentPrice > 1e5){
      priceInfo.currentPrice = ''
      that.setData({
        priceInfo: priceInfo
      })
      wx.showToast({
        title: '输入价格不能大于100000!',
        icon: 'loading',
        duration: 1000
      })
    }
    else{
      that.setData({
      showInfo: showInfo,
      priceInfo: priceInfo
    })
    }
  },


  //(5)将价格退后一位
  popCurrentPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    var currentPrice = priceInfo.currentPrice
    priceInfo.currentPrice = currentPrice.slice(0, currentPrice.length - 1)
    that.setData({
      priceInfo: priceInfo
    })
  },

  //(6)重新输入价格
  resetCurrentPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.currentPrice = ''
    that.setData({
      priceInfo: priceInfo
    })
  },

  //(7)设置折扣现价
  setDiscountPrice: function(event){
    var that = this
    var index = Number(event.currentTarget.dataset.index)
    var priceInfo = that.data.priceInfo
    var oldPrice = Number(priceInfo.oldPrice)
    if(index == 0){
      priceInfo.currentPrice = (oldPrice * 0.8).toFixed(2)
    }
    if(index == 1){
      priceInfo.currentPrice = (oldPrice * 0.5).toFixed(2)
    }
    if(index == 2){
      priceInfo.currentPrice = (oldPrice * 0.3).toFixed(2)
    }
    that.setData({
      priceInfo: priceInfo
    })
  },


     //下面是关于运费的函数
  //(1)运费的输入显示界面
  getShipmentInputPage: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.keyBoard = false
    showInfo.currentKeyBoard = false
    showInfo.shipmentKeyBoard = !(showInfo.shipmentKeyBoard)
    showInfo.camera = false
    showInfo.location = false
    showInfo.titleDescription = false
    that.setData({
      showInfo: showInfo
    })
  },
  //(2)在价格中添加1-9数字
  pushShipmentPriceNumber: function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.shipmentPrice = priceInfo.shipmentPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },
  
  //(3)在价格中添加0，00，.
  pushOtherShipmentPriceNumber:function(event){
    var priceNumber = event.currentTarget.dataset.number
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.shipmentPrice = priceInfo.shipmentPrice + priceNumber
    that.setData({
      priceInfo: priceInfo
    })   
  },

  //(4)完成价格输入
  completeShipmentPrice: function(){
    var that = this
    var showInfo = that.data.showInfo
    showInfo.shipmentKeyBoard = !(showInfo.shipmentKeyBoard)
    showInfo.camera = !(showInfo.camera)
    showInfo.location = !(showInfo.location)
    showInfo.titleDescription = !(showInfo.titleDescription)
    that.setData({
      showInfo: showInfo
    })
  },


  //(5)将价格退后一位
  popShipmentPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    var shipmentPrice = priceInfo.shipmentPrice
    priceInfo.shipmentPrice = shipmentPrice.slice(0, shipmentPrice.length - 1)
    that.setData({
      priceInfo: priceInfo
    })
  },

  //(6)重新输入价格
  resetShipmentPrice: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.shipmentPrice = ''
    that.setData({
      priceInfo: priceInfo
    })
  },

  //(7)免邮
  freeShipment: function(){
    var that = this
    var priceInfo = that.data.priceInfo
    priceInfo.shipmentPrice = Number(0).toFixed(2)
    that.setData({
      priceInfo: priceInfo
    })
  },



  //发布闲置商品 
  createMerchandiseWithSignature:function(){
    var that = this
    var requestInfo = {}
    requestInfo['tokenID'] = that.data.tokenID
    requestInfo['imgList'] = that.data.imgPaths
    requestInfo['signatureIDList'] = []
    requestInfo['customSignatureList'] = []
    requestInfo['merchandiseName'] = '微信测试'
    requestInfo['description'] = '微信小程序发布测试'
    requestInfo['merchandiseTypeID'] = '10'
    requestInfo['currentPrice'] = 100
    requestInfo['oldPrice'] = 200
    requestInfo['shipmentPrice'] = 10
    requestInfo['cityID'] = '63'
    requestInfo['collegeID'] = '2'
    app.createMerchandiseWithSignature(
    function(res){
        console.log('777')
        console.log(res)
      },
      requestInfo
    )
  }

  
})



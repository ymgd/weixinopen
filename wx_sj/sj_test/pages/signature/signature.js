
//获取应用实例
var app = getApp()
Page({
  data: {
    signatureInfo: [],
    selectInfo: []
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    var requestInfo = {}
    requestInfo['signatureTypeID'] = "1"
    requestInfo['tag'] = "0"
    app.getSignatureInfo(
        function(signatureList){
            for (var i=0; i< signatureList.length; i++)
            {
                var signatureDic = {}
                signatureDic['signatureID'] = signatureList[i].signatureID
                signatureDic['signatureName'] = signatureList[i].description
                that.data.signatureInfo.push(signatureDic)
            }
            that.setData({
                signatureInfo: that.data.signatureInfo
            })
        },requestInfo
      )
  },


    
})



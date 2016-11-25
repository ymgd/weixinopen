var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
//TODO: login into sdp, so that we can use SDP REST API without API key
var app = getApp()
var inputContent = app.globalData.sdp
Page({
  data: {
    protocol:app.globalData.sdp.protocol,
    host:app.globalData.sdp.host,
    port:app.globalData.sdp.port,
    key:app.globalData.sdp.key,
    toastHidden:true,
    success:false,
    message:''
  },
  onShow: function(){
      this.setData({toastHidden:true})
  },
  bindKeyInput: function(e) {
      inputContent[e.currentTarget.id] = e.detail.value
  },
  bindSaveTap: function(e){
        var _this = this
        //To test if the sdp server details correct or not.
        api.getAllRequests(
            inputContent,
            (data) => {
                if (data.operation.result.status === 'Success'){
                    _this.setData({message:'配置成功！'})
                    _this.setData({success:true})
                }else{
                    _this.setData({message:data.operation.result.message})
                }
                
            },
            (data) => {
                _this.setData({message:'Your input is not correct!!!'})
                console.log('get all requests failed: ')
                console.log(data)
            },
            () => {
                _this.setData({toastHidden:false})
            }
        )
        app.globalData.sdp =  inputContent
        wx.setStorage({
            key:"sdp",
            data:app.globalData.sdp
        })
  },
  toastChange: function(e){
      if(this.data.success){
          wx.navigateTo({url:'/pages/index/index'})
      }
  }
})
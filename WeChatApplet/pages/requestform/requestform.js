var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    templates:[],
    templateNames: ['美国', '中国', '巴西', '日本'],
    templateName:'',
    index: 0,
    sub:'',
    des:'',
    requester:'',
    id:null,
    message:'',
    toastHidden:true,
    des_esc:''
  },
  onLoad: function(){
    var _this = this
    app.getUserInfo(function(userInfo){
      _this.setData({
        requester:userInfo.nickName
      })
    })
    var templateNames=[]
    api.getRequestTemplates(
      app.globalData.sdp,
      (data) => {
        _this.setData({templates:data.operation.details})
        for (var i=0;i<data.operation.details.length;i++){
          if (data.operation.details[i].ISDELETED === false) templateNames.push(data.operation.details[i].TEMPLATENAME)
          if (data.operation.details[i].TEMPLATENAME === 'Default Request'){
            _this.setData({index:i})
            _this.setData({sub:data.operation.details[i].TEMPLATENAME})
            _this.setData({des:data.operation.details[i].COMMENTS})
          }
        }
        _this.setData({templateNames:templateNames})
      },
      (data) => {
          console.log('Failed to get request template: ')
          console.log(data)
      },
      () => {}
    )
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.setData({sub:this.data.templates[e.detail.value].TEMPLATENAME})
    this.setData({des:this.data.templates[e.detail.value].COMMENTS})
    this.setData({templateName:this.data.templateNames[e.detail.value]})
  },
  bindKeyInput:function(e){
    if (e.currentTarget.id === 'sub') this.setData({sub:e.detail.value})
    else if (e.currentTarget.id === 'des'){
      var des = e.detail.value
      console.log(des)
      this.setData({des_esc:des})
    } 
  },
  bindSaveTap: function(e){
    var _this =  this
    console.log(_this.data)
    api.addRequest(
      app.globalData.sdp,
      _this.data,
      (data) => {
        if (data.operation.result.status === 'Success'){
          _this.setData({message:data.operation.result.message})
          _this.setData({newid:data.operation.Details.WORKORDERID})
          _this.setData({toastHidden:false})
        }
      },
      (data) => {
        console.log('Failed to add new request!')
        console.log(data)
      } ,
      () =>{}
    )

  },

  toastChange: function(e){
    wx.navigateTo({url:'/pages/index/index'})
  }
})

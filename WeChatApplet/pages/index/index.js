//index.js
//获取应用实例

var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    loadingMore: false,
    totalRecord: 0,
    isInit: false,
    pagedata:[],
  },
  onShow: function () {
    var _this = this
    api.getAllRequests(
          app.globalData.sdp,
          (data) => {
            var reqs = data.operation.details
            for (var i=0;i<reqs.length;i++){
              var localDate = utils.formatTime(new Date(reqs[i].CREATEDTIME))
              reqs[i].localDate = localDate
            }
            _this.setData({isInit:true})
            _this.setData({pagedata:reqs})
            _this.setData({totalRecord:reqs.length})
          },
          (data) => {
              console.log('Failed to get reuqest list: ')
              console.log(data)
          },
          () => {
              this.setData(
                  {loaded:true}
              )
          }
      )
  },
  scrollLowerEvent: function(e){
    //TODO: scroll to load more request
  },
  toDetailPage: function(e){
    var requestid = e.currentTarget.dataset.rid
    wx.navigateTo({url:'/pages/request/request?id='+requestid})
  },
  addNewRequest: function(e){
    wx.navigateTo({url:'/pages/requestform/requestform'})
  }
})

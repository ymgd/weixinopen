//index.js
import * as UTIL from '../../utils/util.js'
import * as API from '../../requests/api.js'
import { fetchGet, fetchPost } from '../../requests/request.js'

//获取应用实例
var app = getApp()
Page({
  data: {
    isRefresh: false,
    list: {},
    issue: 0,
    issueTime: null
  },
  //事件处理函数
  bindToDetailPage: function( e ) {
    var url = encodeURIComponent(e.currentTarget.dataset.url)

    // navigateTo跳转页面内的某个页面
    wx.navigateTo({
      url: `../detail/detail?url=${url}`
    })
  },
  onLoad: function () {
    console.log('index onLoad')
    var _this = this
    
    // 获取最新一期数据
    fetchGet(
      API.getLatest(),
      (data) => {
        var newData = UTIL.formatIssueData(data)
        _this.setData({
          issue: data.iid,
          issueTime: data.date,
          'list': newData
        })
      },
      null,
      null
    )
  },

  onShow: function() {
    console.log('index onShow')
  },
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh')
    var _this = this
    _this.setData({
      'isRefresh': true
    })
    
    // 获取最新一期数据
    fetchGet(
      API.getLatest(),
      (data) => {
        let newData = Object.assign({}, data)
        
        for(var i = 0, len = newData.article.length; i < len; i++){
          let newArticle = {}
          newArticle.title = UTIL.getObjKeys(newData.article[i])[0]
          newArticle.data = UTIL.getObjValues(newData.article[i])[0]
          newData.article[i] = newArticle
        }
        _this.setData({'list': newData})
      },
      null,
      () => {
        _this.setData({'isRefresh': false})
        stopPullDownRefresh.call( _this )
      }
    )
  }
})

function stopPullDownRefresh() {
  var _this = this
  wx.stopPullDownRefresh({
    complete: function (res) {
      console.log('1111')
      console.log(res)
    }
  })
}

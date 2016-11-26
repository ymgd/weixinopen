import * as UTIL from '../../utils/util.js'
import * as API from '../../requests/api.js'
import { fetchGet, fetchPost } from '../../requests/request.js'

Page({
  data: {
    list: {},
    title: ''
  },
  //事件处理函数
  bindToDetailPage: function( e ) {
    var url = encodeURIComponent(e.currentTarget.dataset.url)

    // navigateTo跳转页面内的某个页面
    wx.navigateTo({
      url: `../detail/detail?url=${url}`
    })
  },
  onLoad: function (options) {
    console.log('issueDetail onLoad')
    var _this = this
    var iid = options.iid
    
    fetchGet(
      API.getIssueDetail(iid),
      (data) => {
        var newData = UTIL.formatIssueData(data)
        _this.setData({
          'list': newData,
          'title': `奇舞周刊第${iid}期`
        })
      },
      null,
      null
    )
  },
  onReady: function() {
    var _this = this
    wx.setNavigationBarTitle({
      title: _this.data.title,
      success: function(){
        console.log('setNavigationBarTitle success')
      },
      fail: function(){
        console.log('setNavigationBarTitle fail')
      }
    })
  }
})

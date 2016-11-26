import * as UTIL from '../../utils/util.js'
import * as API from '../../requests/api.js'
import { fetchGet, fetchPost } from '../../requests/request.js'

var app = getApp()
Page({
  data: {
  	curPage: 1,
    listData: [],
    laddingHidden: true,
    scrollHeight: 0, //scroll-view高度
  },
  onShow: function( e ) {
    var _this = this
    app.getScrollHeight(function(data){
      _this.setData({scrollHeight: data})
    })
  },
  onLoad: function (options) {
    var _this = this
    _this.fetchListData()
  },
  lower: function(e){
    var _this = this
    console.log('lower')
    _this.setData({
      curPage: _this.data.curPage + 1
    })
    _this.fetchListData()
  },
  bindToDetailList: function(e){
    var iid = e.currentTarget.dataset.iid
    wx.navigateTo({
      url: `../issueDetail/issueDetail?iid=${iid}`
    })
  },
  fetchListData: function(){
    var _this = this
    _this.setData({
      laddingHidden: false
    })
    
    if (_this.data.curPage === 1) {
      _this.setData({
        listData: []
      });
    }
    fetchGet(
      API.getListByPage(_this.data.curPage),
      (data) => {
        var newData = _this.data.listData.concat(data.data)

        _this.setData({
          laddingHidden: true,
          listData: newData
        })
      },
      null,
      null
    )
  }
})

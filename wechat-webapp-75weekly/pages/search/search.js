import * as UTIL from '../../utils/util.js'
import * as API from '../../requests/api.js'
import { fetchGet, fetchPost } from '../../requests/request.js'

var app = getApp()
Page({
  data: {
  	curPage: 1,
    listData: [],
    laddingHidden: true,
    isInit: true,
    count: null,
    searchKey: '',
    scrollHeight: 0, //scroll-view高度
  },
  onShow: function( e ) {
    var _this = this
    app.getScrollHeight(function(data){
      _this.setData({scrollHeight: data})
    })
  },
  searchInputEvent: function(e) {
		this.setData({
      searchKey: e.detail.value
    })
  },
  searchClickEvent: function(e) {
		var _this = this
		if( !_this.data.searchKey ) return;
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

  bindToDetailPage: function(e){
    var url = encodeURIComponent(e.currentTarget.dataset.url)

    // navigateTo跳转页面内的某个页面
    wx.navigateTo({
      url: `../detail/detail?url=${url}`
    })
  },
  fetchListData: function(){
    var _this = this
    _this.setData({
      laddingHidden: false,
      isInit: false
    })
    
    if (_this.data.curPage === 1) {
      _this.setData({
        listData: []
      });
    }
    fetchGet(
      API.getSearchRes(_this.data.searchKey, _this.data.curPage),
      (data) => {
      	//console.log(data)
        var newData = _this.data.listData.concat(data.data)

        _this.setData({
          laddingHidden: true,
          listData: newData,
          count: data.count
        })
      },
      null,
      null
    )
  }
})
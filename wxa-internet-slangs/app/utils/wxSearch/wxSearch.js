var __keysColor = []
var __mindKeys = []

function initColors(colors) {
  __keysColor = colors
}

function initMindKeys(keys) {
  __mindKeys = keys
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
  var tempData = {}
  tempData.value = ""
  var view = {
    barHeight: barHeight,
    isShow: true
  }
  if(typeof(isShowKey) == 'undefined') {
    view.isShowSearchKey = true
  } else {
    view.isShowSearchKey = isShowKey
  }
  if(typeof(isShowHis) == 'undefined') {
    view.isShowSearchHistory = true
  } else {
    view.isShowSearchHistory = isShowHis
  }
  tempData.keys = keys;
  wx.getSystemInfo({
    success: function(res) {
      var wHeight = res.windowHeight
      view.seachHeight = wHeight - barHeight
      tempData.view = view
      that.setData({
        wxSearchData: tempData
      })
    }
  })
  if (typeof(callBack) == 'function') {
    callBack()
  }
  getHisKeys(that)
}

function wxSearchInput(e, that, callBack) {
  var tempData = that.data.wxSearchData
  var text = e.detail.value
  var mindKeys = []
  if(typeof(text) == 'undefined' || text.length == 0) {
  } else {
    for(var i = 0; i < __mindKeys.length; i++) {
      var mindKey = __mindKeys[i]
      if(mindKey.indexOf(text) > -1) {
        mindKeys.push(mindKey)
      }
    }
  }
  tempData.mindKeys = mindKeys
  that.setData({
    wxSearchData: tempData
  });
}

function wxSearchFocus(e, that, callBack) {
  var tempData = that.data.wxSearchData
  tempData.view.isShow = true
  that.setData({
    wxSearchData: tempData
  })
  // 回调
  if(typeof(callBack) == 'function') {
    callBack()
  }
  // if(typeof(tempData) != 'undefined') {
  //   tempData.view.hidden = false
  //   that.setData({
  //     wxSearchData: tempData
  //   })
  // } else {
  // }
}

function wxSearchBlur(e, that, callBack) {
  var tempData = that.data.wxSearchData
  tempData.value = e.detail.value
  that.setData({
    wxSearchData: tempData
  })
  if(typeof(callBack) == 'function') {
    callBack()
  }
}

function wxSearchHiddenPancel(that) {
  var tempData = that.data.wxSearchData
  // tempData.view.isShow = false
  that.setData({
    wxSearchData: tempData
  })
}

function wxSearchKeyTap(e, that, callBack) {
  // 回调
  var tempData = that.data.wxSearchData
  tempData.value = e.target.dataset.key
  that.setData({
    wxSearchData: tempData
  })
  if (typeof(callBack) == 'function') {
    callBack()
  }
}

function getHisKeys(that) {
  var value = []
  try {
    value = wx.getStorageSync('wxSearchHisKeys')
    if(value) {
      // Do something with return value
      var tempData = that.data.wxSearchData
      tempData.his = value;
      that.setData({
        wxSearchData: tempData
      })
    }
  } catch(e) {
    // Do something when catch error
  }
}

function wxSearchAddHisKey(that) {
  wxSearchHiddenPancel(that)
  var text = that.data.wxSearchData.value
  if(typeof(text) == 'undefined' || text.length == 0) {
    return
  }
  var value = wx.getStorageSync('wxSearchHisKeys')
  if(value) {
    if(value.indexOf(text) < 0) {
      value.unshift(text)
    }
    wx.setStorage({
      key: 'wxSearchHisKeys',
      data: value,
      success: function() {
        getHisKeys(that)
      }
    })
  } else {
    value = []
    value.push(text)
    wx.setStorage({
      key: 'wxSearchHisKeys',
      data: value,
      success: function() {
        getHisKeys(that)
      }
    })
  }
}

function wxSearchDeleteKey(e,that) {
  var text = e.target.dataset.key;
  var value = wx.getStorageSync('wxSearchHisKeys')
  value.splice(value.indexOf(text), 1);
  wx.setStorage({
    key: 'wxSearchHisKeys',
    data: value,
    success: function() {
      getHisKeys(that)
    }
  })
}

function wxSearchDeleteAll(that) {
  wx.removeStorage({
    key: 'wxSearchHisKeys',
    success: function(res) {
      var value = [];
      var tempData = that.data.wxSearchData
      tempData.his = value
      that.setData({
        wxSearchData: tempData
      })
    }
  })
}

module.exports = {
  init: init,
  initColor: initColors,
  initMindKeys: initMindKeys,
  wxSearchInput: wxSearchInput,
  wxSearchFocus: wxSearchFocus,
  wxSearchBlur: wxSearchBlur,
  wxSearchKeyTap: wxSearchKeyTap,
  wxSearchAddHisKey: wxSearchAddHisKey,
  wxSearchDeleteKey: wxSearchDeleteKey,
  wxSearchDeleteAll: wxSearchDeleteAll,
  wxSearchHiddenPancel: wxSearchHiddenPancel
}

var toastNum = 3
var pageData = {}
pageData.data = {}
for(var i = 0; i <= toastNum; ++i) {
  var _index = i+1;
  pageData.data['toast'+_index+'Hidden'] = true;
  (function (index) {
    pageData['toast'+index+'Change'] = function(e) {
      var obj = {}
      obj['toast'+index+'Hidden'] = true;
      this.setData(obj)
    }
    pageData['toast'+index+'Tap'] = function(e) {
      var obj = {}
      obj['toast'+index+'Hidden'] = false
      this.setData(obj)
    }
  })(_index)
}
Page(pageData)

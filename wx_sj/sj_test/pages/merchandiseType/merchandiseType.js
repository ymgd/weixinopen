
//获取应用实例
var app = getApp()
Page({
  data: {
    typeInfo: [],
    selectInfo: {'typeID':'', 'typeName': '商品类型'},
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    try {
        wx.setStorageSync('type', [selectInfo,false])
    } 
    catch (e) {    
    }
    app.getTypeInfo(
        function(typeList){
            for (var i=0; i< typeList.length; i++)
            {
                var typeDic = {}
                typeDic['typeID'] = typeList[i].merchandiseTypeID
                typeDic['typeName'] = typeList[i].merchandiseTypeName
                that.data.typeInfo.push(typeDic)
            }
            that.setData({
                typeInfo: that.data.typeInfo
            })
        },
      )
  },

  //选择商品类型
  selectType: function(event){
    var that = this
    var selectInfo = that.data.selectInfo
    var typeID = event.currentTarget.dataset.typeid
    selectInfo.typeID = event.currentTarget.dataset.typeid
    selectInfo.typeName = event.currentTarget.dataset.typename
    that.setData({
        selectInfo: selectInfo
    })
    try {
        wx.setStorageSync('type', [selectInfo,true])
    } 
    catch (e) {    
    }
  }
    
})



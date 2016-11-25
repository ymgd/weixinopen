//logs.js
var imageHelper = require('../../utils/imageHelper.js')
var TimeUtils = require('../../utils/TimeUtils.js') 
var api = require('../../backend/api.js')
Page({
  data: {
    movementList:[],
    index:1,
    pageSize:5
  },
  onLoad: function () {
    this.reqData(this.renderData)
  },
 //下拉刷新
reqData:function(callback){
  api.getTimeLineList(null,{
    page:this.data.index,
    pageSize:this.data.pageSize
  },function(res){
      callback && callback.call(null,res.data,false)
  },function(res){
      console.log('下拉刷新完成')
      wx.stopPullDownRefresh()
  })
},
//上拉刷新
reqDataFooter:function(callback){
  api.getTimeLineList(null,{
    page:this.data.index,
    pageSize:this.data.pageSize
  },function(res){
      callback && callback.call(null,res.data,true)
  },function(res){
      console.log('上拉刷新完成')
      wx.stopPullDownRefresh()
  })
},
renderData:function(res,isAdd){
  //渲染数据
    var list = res.result.DataList
    for (var i=0;i<list.length;i++)
    {
      //唱片图片
      list[i].Record.AppCoverUrl=imageHelper.imageUrlDispatcher(list[i].Record.AppCoverUrl,imageHelper.DISKCOVER)
      //创建时间
      list[i].CreateTime = TimeUtils.getTimeDifference(new Date(list[i].CreateTime))
      //用户图片
      list[i].User.Avatar =imageHelper.imageUrlDispatcher(list[i].User.Avatar,imageHelper.THUMBNAIL)
    }
    if(isAdd){
      list = this.data.movementList.concat(list)
    }
    this.setData({
      movementList:list
    })
},
onPullDownRefresh:function(){
   //下拉刷新
  this.data.index=1;
  this.reqData(this.renderData)
}, lower: function(e) {
  //上拉刷新
  var index = this.data.index;
  this.data.index =++index;
  this.reqDataFooter(this.renderData)
  }
})




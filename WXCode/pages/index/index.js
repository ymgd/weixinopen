Page({
  data:{
    focus:false,
    searchEnd:[],
    theEnd: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  searchTap:function(e){
    var searchContent = e.detail.value; // 搜索框输入内容
      var that= this;

    if(searchContent){ //如果有内容 进行查找
    wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=' + searchContent,
        success:function(result){
            if(result.data.song&&result.data.song.length>0){
              that.setData({
                theEnd: true,
                searchEnd:result.data.song
              })   
            }else{
              that.setData({
                theEnd: false,
                searchEnd:[{songname:"暂无查询结果",artistname:"请重新输入"}]
              }) 
            }
        }
    })
    }else{ // 当搜索框为空
      that.setData({
         theEnd: false,
         searchEnd:[]
      })
    }
    
  }
})
// 引入utils包下的js文件
var constant = require('../../utils/constant.js');
var mCurrentPage = 1;//第mCurrentPage 的数据
var pageData = {
 loadingView_hidden:false,
 imgUrls: [ 
   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
  ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    //当前banner 的索引
    current_index: 0,
    banner_toast_show:true,
    //顶部菜单
    menuItem1: {menuName: '小程序', menuIcon: '../../image/b1.png',},
    menuItem2: {menuName: '小程序', menuIcon: '../../image/b2.png',},
    menuItem3: {menuName: '小程序', menuIcon: '../../image/b3.png',},
    menuItem4: {menuName: '小程序', menuIcon: '../../image/b4.png',},
    //列表数据
   results:[
        {
          _id:'',
          createdAt:'',
          desc:'',
          publishedAt:'',
          source:'',
          type:'',
          url:'',
          used:'',
          who:'',
        }
      ],
    systemInfo:{},
}

Page({
  data:pageData,
  onLoad:function(options){
   var that=this;
   wx.getSystemInfo({
    success: function(res) {
    that.setData({
      systemInfo:res
    })
    }
    })
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
     var that = this;
     requsetData(that,mCurrentPage);
  },

  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPullDownRefreash:function(){
   console.log("onPullDownRefreash");
   wx.stopPullDownRefresh();
  },

  //banner index 改变
  banner_index_change: function(event){
    this.setData({
       current_index:event.detail.current,
     })
    
  },
  // 控制loadloadview 显示与隐藏
  loadingChange:function(event){
   this.setData({
      loadingView_hidden: true
    })
  },
  //点击banner
  click_banner: function(event) {
    //当前banner 的索引 event.currentTarget.id
    this.setData({
      banner_toast_show:false,
    })
    
  },

  //hide Toast
  toastHide: function(event){
    this.setData({
      banner_toast_show:true,
    })
  }
})

/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requsetData(that,page){
  wx.request({
    url: constant.GET_MEIZHI_URL+mCurrentPage,
      header: {
      "Content-Type": "application/json"
    },
    success:function(res){
     //第一次加载 或刷新
      var itemList=[];
     if(page==1){
      if(res.data==null||res.data.error==true||res.data.results==null){
        console.error("出错了，请稍后再试！");
        return;
      }else if(res.data.results.lenth=0){
        console.error("没有数据！");
        return;
      }
      itemList=[];
        for( var i=0;i<res.data.results.length;i++)
        itemList.push( { url: res.data.results[i].url.replace("//ww","//ws"), who: res.data.results[i].who });
        that.setData({
        results :itemList,
       });
       
     }else{
      //加载更多
       if(res.data==null||res.data.error==true||res.data.results==null){
        console.error("出错了，请稍后再试！");
        return;
      }else if(res.data.results.lenth=0){
        console.error("没有更多数据啦！");
        return;
      }
      for( var i=0;i<res.data.results.length;i++)
        itemList.push( { url: res.data.results[i].url.replace("//ww","//ws"), who: res.data.results[i].who });
        that.setData({
        results :itemList,
       });
     }
    mCurrentPage = page;
    that.setData({
      loadingView_hidden: true
    })
    }
  })
}
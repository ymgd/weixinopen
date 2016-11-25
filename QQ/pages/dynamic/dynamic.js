/**
 * 动态功能界面
 */
Page({
  data:{
      fristRowMenus : [
        { title : '游戏'    ,icon : '../../res/image/game.png'},
        { title : '日迹'    ,icon : '../../res/image/weather.png'},
        { title : '看点'    ,icon : '../../res/image/kandian.png'},
        { title : '京东购物',icon : '../../res/image/jd-shop.png'},
        { title : '阅读'    ,icon : '../../res/image/read.png'},
        { title : '动漫'    ,icon : '../../res/image/comic.png'},
        { title : '音乐'    ,icon : '../../res/image/music.png'   , xtype : 'music'},
        { title : 'NOW直播' ,icon : '../../res/image/live.png'},
        { title : '热门活动',icon : '../../res/image/hot-event.png'}
      ],
      seconedRowMenus : [
        { title : '附近的群',icon : '../../res/image/qun.png'},
        { title : '吃喝玩乐',icon : '../../res/image/daily.png'},
        { title : '同城服务',icon : '../../res/image/cityse.png'}
      ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  }

  ,onFItemClickHandler : function(e){
     var dataset = e.currentTarget.dataset,tag = dataset.tag;
     if('music' == tag){
        //console.log('暂跳至情绪音乐(如果可以跨应用的话更好)');
        wx.navigateTo({ url : '../module/music/music'});
     }
  }
})
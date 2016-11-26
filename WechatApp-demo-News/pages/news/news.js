var app     = getApp();  // 全局
var name    = 'top';     // 菜单默认值
var flag    = true;      // 用于判断是否加载的默认菜单
var touchDot= 0;         // 获取触摸时的原点
var time    = 0;         // 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval= "";        // 记录/清理 时间记录
var nth     = 0;         // 设置活动菜单的index
var tmpFlag = true;      // 判断左右滑动超出菜单最大值时不再执行滑动事件
Page({
  data:{
    // 判断loading
    hidden:true,
    // 新闻列表
    news:[],
    // 
    flag:1,
    menu:[{
        name:"头条",
        value:"top",
        active:true
    },{
        name:"社会",
        value:"shehui",
        active:false
    },{
        name:"国内",
        value:"guonei",
        active:false
    },{
        name:"国际",
        value:"guoji",
        active:false
    },{
        name:"娱乐",
        value:"yule",
        active:false
    },{
        name:"体育",
        value:"tiyu",
        active:false
    },{
        name:"军事",
        value:"junshi",
        active:false
    },{
        name:"科技",
        value:"keji",
        active:false
    },{
        name:"财经",
        value:"caijing",
        active:false
    },{
        name:"时尚",
        value:"shishang",
        active:false
    }]
  },
  bindMenu:function(e){
    name = e.target.dataset.name; // 获取当前点击标签的值
    // 循环菜单
    var tmp = this.data.menu.map(function (arr, index) {
        if(arr.value == name){    // 如果菜单的值等于当前点击标签的值则选中当前的标签
            arr.active = true;
        }else{
            arr.active = false;
        }
        return arr;               // 返回重构菜单
    });
    this.setData({menu : tmp}); // 更新菜单
    this.getNews(name);         // 获取新闻列表
  },
  touchStart:function(e){ // 触摸事件
    touchDot = e.touches[0].pageX;                      // 获取触摸时的原点
    interval = setInterval(function(){time++;},100);    // 记录时间
  },
  touchMove:function(e){ // 触摸移动事件
    var touchMove = e.touches[0].pageX;
    // console.log("touchMove:"+touchMove+" touchDot:"+touchDot+" diff:"+(touchMove - touchDot));
    if(touchMove - touchDot <= -40 && time < 10){// 左移 
        if(tmpFlag && nth < 9){  //每次移动中且滑动时不超过最大值 只执行一次
            var tmp = this.data.menu.map(function (arr, index) {
                tmpFlag = false;
                if(arr.active){  // 当前的状态更改
                    nth = index;
                    ++nth;
                    arr.active = nth > 9 ?  true : false;
                }
                if(nth == index){ // 下一个的状态更改
                    arr.active = true;
                    name = arr.value;
                }
                return arr;
            })
            this.getNews(name);         // 获取新闻列表
            this.setData({menu : tmp}); // 更新菜单
        }

    }
    if(touchMove - touchDot >= 40 && time < 10){// 右移
        if(tmpFlag && nth > 0){
            nth = --nth < 0 ? 0 : nth;
            var tmp = this.data.menu.map(function (arr, index) {
                tmpFlag = false;
                arr.active = false;
                // 上一个的状态更改
                if(nth == index){
                    arr.active = true;
                    name = arr.value;
                }                
                return arr;
            })
            this.getNews(name);         // 获取新闻列表
            this.setData({menu : tmp}); // 更新菜单
        }
    }
    // touchDot = touchMove;             //每移动一次把上一次的点作为原点（好像没啥用）
  },
  touchEnd:function(e){               // 触摸结束时间
    clearInterval(interval);          // 清除setInterval
    time = 0;
    tmpFlag = true;                   // 回复滑动事件
  },
  onLoad:function(options){
    this.getNews(name);               // 页面初始化 获取默认菜单新闻列表
  },
  getNews:function(name){
    this.setData({hidden:false});     // 设置loading显示
    flag = name == "top" ? 1 : 0;     // 默认菜单与其它菜单请求数据返回结果不一致 需要显示不同信息
    var _this = this;
    // 获取新闻列表
    wx.request({
        url : 'http://v.juhe.cn/toutiao/index',
        data : {
            type : name,
            key  : app.globalData.appkey
        },
        success : function(res){
            if(!res.data.error_code){
                var data = res.data.result.data;
                var title = flag ? data[0].type : data[0].category; // 默认菜单与其它菜单获取类型数据不一致
                wx.setNavigationBarTitle({title : title});          // 设置页面标题
                _this.setData({
                    news : data,
                    hidden : true,
                    flag : flag
                });
            }
        }
    })
  }
})
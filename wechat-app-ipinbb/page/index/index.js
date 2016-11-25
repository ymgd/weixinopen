Page({
  data: {
    fixed: "",              // 是否吸顶
    tabIndex: "-1",         // 当前navId,发送请求的参数
    pageIndex: "",          // 当前分页,发送请求的参数
    category: "Home",       // 当前nav,发送请求的参数
    nextPage: "",           // 下一个分页
    scrollTop: "",          // 自动滚动的距离
    hidden: true,           // 是否显示加载动画
    tipShow: false,         // 判断是否还有更多数据
    bannerItems: [],        // banner图片链接;
    navItems: [],           // 导航栏
    bannerConfig: {         // banner图配置信息
      mode: "aspectFit",
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500
    },
    activityUrls: [         // 四个模块图片链接
      'http://m.ipinbb.com/ipbb/static/images/home-01.png',
      "http://m.ipinbb.com/ipbb/static/images/home-02.png",
      "http://m.ipinbb.com/ipbb/static/images/home-03.png",
      "http://m.ipinbb.com/ipbb/static/images/home-04.png"
    ],
    list: []                // 商品数据
  },

  onLoad: function(e) {     // 首次加载
    var self = this;
    wx.request({            // 列表数据请求
      url: 'http://m.ipinbb.com/ipbb/home/load?ti=-1&ft=Home',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {

        var nextPage = JSON.stringify(res.data.nextPage),
            resData = res.data.lst;
            
        self.setData({      // 将数据与参数添加到到data中
          hidden: true, 
          pageIndex: 1,
          nextPage: nextPage,
          list: self.data.list.concat(self.dataRead(resData))
        });
      },
      fail: function(){
        console.log("网络异常！");
      }
    });
    
    wx.request({            // 导航栏数据请求;
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeTabs',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {

        var navArr = [],
            navData = res.data;
        
        navData.forEach(function(item){         // 修改点击元素的高亮状态
          var navObj = {};
          navObj.category = item.tabFilterType;
          navObj.tabIndex = item.tabId
          navObj.text = item.tabName
          console.log();
          navObj.className = !item.tabSortType ? "" : "curNavigator";

          navArr.push(navObj);
        });

        self.setData({
          navItems: navArr
        })
      },
      fail: function(){
        console.log("网络异常！");
      }
    })
    
    wx.request({            // banner图数据请求;
      url: 'http://service.ipinbb.com:8080/goodsService/getHomeBanner',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {

        // console.log(res);
        var bannerArr = [],
            bannerData = res.data.lst;

        bannerData.forEach(function(item){
          var bannerObj = {};
          bannerObj.goodId = item.banner_goodsId;
          bannerObj.imgUrl = item.banner_img;
          bannerObj.platformId = item.banner_platformId;

          bannerArr.push(bannerObj)
        });

      //  console.log(bannerArr);

        self.setData({
          bannerItems: bannerArr
        });
      },
      fail: function(){
        console.log("网络异常！");
      }
    })
  },

  navLink: function(e) {    // nav导航栏切换
    var self = this,
        dataObj = self.data,
        obj = e.currentTarget.dataset,
        tabIndex = obj.tabindex,
        category = obj.category,
        navArr = dataObj.navItems;

    navArr.forEach(function(item){      // 去除上一个nav高亮状态,并给当前点击的添加高亮状态
      var i = item.tabIndex;
      if(i == tabIndex) {
        item.className = "curNavigator";
      } else {
        item.className = "";
      }
    });

    // console.log(navArr);
    
    self.setData({          // 设置加载动画以及其他参数;
      scrollTop: "321",
      hidden: false,
      tabIndex: tabIndex,
      pageIndex: 0,
      category: category,
      nextPage: "",
      navItems: navArr,
      tipShow: false
    });
    
    // 分页的数据请求参数
    var nextPage = dataObj.nextPage,
        pageIndex = dataObj.pageIndex;

    wx.request({            // nav导航栏切换数据请求;
      url: 'http://m.ipinbb.com/ipbb/home/load',
      data : {
        nextPage : nextPage,
        ti : tabIndex,
        ft : category,
        page : pageIndex
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        
        var resData = res.data.lst,
            nextPage = JSON.stringify(res.data.nextPage);
            
        // 将数据与参数添加到到data中
        self.data.list = self.dataRead(resData);
        
        self.setData({
          hidden: true,
          pageIndex: Number(pageIndex) + 1,
          nextPage: nextPage,
          list: self.data.list
        });
      }
    });
  },

  scroolTop: function(e) {        // nav导航栏居顶
    if(e.detail.scrollTop >= 321) {
      this.setData({
        fixed: "fixed"
      })
    } else {
      this.setData({
        fixed: ""
      })
    }
  },
  
  
  downLoad: function(e) {         // 上拉加载更多数据;
    var self = this,
        nextPage = self.data.nextPage,
        category = self.data.category,
        tabIndex = self.data.tabIndex,
        tipShow = self.data.tipShow,
        pageIndex = Number(self.data.pageIndex);
        
   
    if(!tipShow) {                // 判断是否存在更多数据
      
      self.setData({              // 加载动画
        hidden: false
      });
      
      wx.request({                // 发起请求
        url: 'http://m.ipinbb.com/ipbb/home/load', 
        data : {
          nextPage : nextPage,
          ti : tabIndex,
          ft : category,
          page : pageIndex
        },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          
          if(res.data != null) {
            var resData = res.data.lst,
                nextPage = JSON.stringify(res.data.nextPage);

            
            self.setData({        // 将数据与参数添加到到data中
              hidden: true,
              pageIndex: pageIndex + 1,
              nextPage: nextPage,
              list: self.data.list.concat(self.dataRead(resData))
            });
          } else {
            self.setData({
              hidden: true,
              tipShow: true
            })          
          }
        },
        fail: function(){
          console.log("网络异常!");
        }
      });
    }
  },

  
  dataRead: function(data) {      // 数据提取;
    var self = this, dataArr = [];
    data.forEach(function(item){
      var itemObj = {};
      itemObj.goods_id = item.goods_id;
      itemObj.goods_img = item.goods_img;
      itemObj.goods_title = item.goods_title;
      itemObj.goods_group_size = item.goods_group_size;
      itemObj.goods_group_price = item.goods_group_price;
      itemObj.goods_promote_info = item.goods_promote_info;

      dataArr.push(itemObj);
    });
    return dataArr;
  }
})
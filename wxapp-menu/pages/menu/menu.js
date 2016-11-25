//获取全局app，以使用一些全局的常亮和方法
var app = getApp();
Page({
    data: {
        category: [],//母分类，例如菜式菜品..
        subCategory: [],//子分类，例如家常菜、素菜等
    },
    onLoad: function(options) {
        var page = this;
        //优先从缓存中读取菜谱分类数据
        var categoryRequest = wx.getStorageSync('categoryRequest');
        if(categoryRequest){
          this.setData({
              category: categoryRequest.result,
              subCategory: categoryRequest.result[0].list
          })
          return;
        }
        //如果第一次使用，缓存中还没有数据时，从网络获取菜谱分类数据
        wx.request({
          url: 'https://apis.juhe.cn/cook/category?key=' + app.AppKey,
          method: 'GET',
          success: function(res){
            // 控制台打印网络访问获得的数据
            console.log("成功获取数据,menu-category:");
            console.log(res.data);
            categoryRequest = res.data;
            //将数据存入缓存中
            wx.setStorageSync('categoryRequest', categoryRequest);
            page.setData({
                category: categoryRequest.result,
                subCategory: categoryRequest.result[0].list
            })
          },
          fail: function() {
            // fail
            console.log("没有获取数据，请检查网络");
            wx.showToast({
              title: "没有获取数据，请检查网络",
              duration: 2000
            })
          },
          complete: function() {
            // complete
          }
        })
    },
    // onShow: function() {
    //     wx.request({
    //       url: 'http://www.wxappclub.com/api/put',
    //       data: {
    //         appkey: 'm07b08znf2uhnn7qcgfdf97u52idfka6' ,
    //         key: "categoryRequest",
    //         value: this.data.category
    //       },
    //       header: {
    //           'Content-Type': 'application/json'
    //       },
    //       success: function(res) {
    //       }
    //     });
    // },
    /**
     * 点击左侧母菜单时触发事件，右侧子菜单内容随之改变
     */
    handleTap: function(e) {
      var page = this;
      var parentId = e.currentTarget.id;
      var index = parentId - 10001;
      this.setData({
        subCategory: page.data.category[index].list
      })
    },

    /**
     * 点击右侧子菜单时触发事件，跳转到菜谱列表界面(list)
     */
    navToList: function(e) {
      console.log(e);
      var cid = e.currentTarget.id;
      var name = e.currentTarget.dataset.name;
      wx.navigateTo({
        url: '/pages/list/list?cid=' + cid + '&name=' + name,//携带参数：分类id和分类名称
      })
    }
})
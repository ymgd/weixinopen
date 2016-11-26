var getData = require("getDetail.js")

Page({
    data: {
        // text:"这是一个页面"
        hasResult:false,
        hideLoadding: false,
        mTitle: "",
        mIcon: "",
        movieDesc: "",
        shortDesc: "",
        longDesc: "",
        isShortDesc: true,
        acts: [],
        recommends: []

    },
    onLoad: function (options) {
        wx.showToast({
            title:'加载中...',
            icon:'loading',
            duration:10000
        })
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        getData.getDetails(that, options.mName)
    },
//描述内容点击
    onDesClick: function (event) {
        var isShortDesc = this.data.isShortDesc;
        if (isShortDesc) {
            this.setData({
                movieDesc: this.data.longDesc,
            })
        } else {
            this.setData({
                movieDesc: this.data.shortDesc,
            })

        }
        this.data.isShortDesc = !this.data.isShortDesc;

    },
    //推荐item点击
    onRItemClick:function (event) {

        var name=event.currentTarget.dataset.name;
        wx.redirectTo({
            url:"detail?mName="+name
        })

    },
    //跳转搜索界面
    onSearchClick:function (event) {
      wx.redirectTo({
          url: "../search/search?hotSearch="+"源代码"
      })
    }
})
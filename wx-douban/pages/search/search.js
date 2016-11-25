var app = getApp();
Page({
    data: {
        searchTag: '',
        searchStart: 0,
        searchCount: 10,
        searchHistory: [],
        modalHidden: true
    },
    onLoad: function(){
        this.getSearchStorage();
    },
    onReady: function(){
        //关闭加载提示
        this.setData({
            pageLoadingHide: true
        });
    },
    changeSearchTag: function(e){
        //搜索内容变化
        this.setData({
            searchTag: e.detail.value
        });
    },
    search: function(e){
        //点击搜索按钮
        var that = this;
        var tag = this.data.searchTag;
        if(tag == ""){
            that.setData({
                modalHidden: false
            });
        }else{
            var start = 0,
                count = this.data.searchCount;
            that.setSearchStorage();
            that.goSearch();
        }
    },
    modalConfirm: function(){
        //提示填入搜索内容
        this.setData({
            modalHidden: true
        });
    },
    goSearch: function(){
        //搜索框内容进行搜索
        var tag = this.data.searchTag,
            start = this.data.searchStart,
            count = this.data.searchCount;
        wx.navigateTo({
            url: "../list/list?tag=" + tag + "&start=" + start + "&count=" + count
        });
    },
    setSearchStorage: function(){
        //设置搜索storage
        var that = this;
        var searchArr = that.data.searchHistory;
        var tag = that.data.searchTag;
        var hasTag = false;
        for(var item in searchArr){
            if(tag == searchArr[item]){
                hasTag = true;
            }
        };
        if(!hasTag){
            searchArr.push(tag);
            that.setData({
                searchHistory: searchArr
            });
        }
        wx.setStorage({
            key: "search",
            data: searchArr
        });
    },
    getSearchStorage: function(){
        //读取搜索storage
        var that = this;
        wx.getStorage({
            key: "search",
            success: function(res){
                that.setData({
                    searchHistory: res.data
                });
            }
        });
    },
    showSearchStorage: function(){
        //历史搜索数据设置
        var that = this;
        var searchArr = that.getSearchStorage();
        that.setData({
            searchHistory: searchArr
        });
    },
    clearSearchStorage: function(){
        var that = this;
        wx.setStorage({
            key: "search",
            data: [],
            success: function(){
                that.showSearchStorage();
            }
        });
    }
});
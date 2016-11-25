var networkTool=require('../../../pages/tool/networkRequestTool.js')
Page({
    data:{
        items:[],
        isShowLoadMoreAnimation: false,
        isShowLoadMoreButton: 'hidden',
        loadMoreDataTitle:'加载更多数据中...',
        toastHidden: true,
        shareUserName: ''
    },
    onShow:function(){
        this.loadDataFromServer(0)
    },
    onPullDownRefresh: function() {
       this.loadDataFromServer(0)
    },
    onReachBottom: function() {
        // 取出最后一条数据
         var lassTimeStr = (this.data.items[this.data.items.length - 1]).passtime;
         var newstr = lassTimeStr.replace(/-/g,'/'); 
        var date =  new Date(newstr); 
        var time_str = date.getTime().toString();
        var lassTime = time_str.substr(0, 10);
        console.log(lassTime);
         this.loadDataFromServer(lassTime);
    },
    loadDataFromServer:function(date){
        var that = this
        networkTool.getDuanZinData(date).then(function(e){
            wx.stopPullDownRefresh({ })
            var dataArray;
            if(date === 0){ // 下拉清空数据
                dataArray = e.data.list;
            }else{
                dataArray = that.data.items.concat(e.data.list);
            }
            that.setData({
                items:dataArray,
                isShowLoadMoreAnimation: dataArray.length > 0 ? true : false,
                loadMoreDataTitle:e.data.list.length > 0 ? "加载更多数据中..." : "没有更多数据了",
                isShowLoadMoreButton: dataArray.length > 0 ? 'visible' : 'hidden'
            })
        }, function(e){
            console.log('数据失败了o')
        })
    },
    likeOperration: function(e){
        var index = e.currentTarget.dataset.index;
        var obj = this.data.items[index];
        obj.up = (parseInt(obj.up)+1).toString();
        this.setData({
           items: this.data.items
        })

    },
    dowmOperration: function(e){
        var index = e.currentTarget.dataset.index;
        var obj = this.data.items[index];
        if(parseInt(obj.down) > 0){
            obj.down = (parseInt(obj.down)-1).toString();
        }
        this.setData({
           items: this.data.items
        })
    },
    shareOperration: function(e){
        var index = e.currentTarget.dataset.index;
        var obj = this.data.items[index];
        this.setData({
            toastHidden: false,
            shareUserName: obj.u.name
        })
    },
    commentOperration: function(e){
        var index = e.currentTarget.dataset.index;
        var obj = this.data.items[index]; 
       var navigateToUrl='funnyDetail?id=' + obj.id
        wx.navigateTo({
            url: navigateToUrl
        })
    },
    toastChange: function(e){
    this.setData({
        toastHidden: true
    })
  }


})
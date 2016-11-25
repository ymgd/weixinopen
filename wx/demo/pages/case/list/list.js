var app=getApp();
Page({
    data: {
        data:[],//数据
        house_type:0,//户型
        house_style:0,//风格
        house_area:0,//面积
        tabTxt:['户型','风格','面积'],//tab文案
        tab:[true,true,true],
        disabled:false,//加载更多按钮状态
        page:1,//当前页码
        hasMore:false,//加载更多按钮
        moreTxt:'点击加载更多',
        dataNull:true
    },
    onReady: function() {
        //初始化数据
        var self=this;
        self.getFilter();
        // wx.getNetworkType({
        //     success: function(res) {
        //         var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        //         // console.log(networkType);
        //     }
        // })
    },
    // 选项卡
    filterTab:function(e){
        var data=[true,true,true],index=e.currentTarget.dataset.index;
        data[index]=!this.data.tab[index];
        this.setData({
            tab:data
        })
    },
    // 获取筛选项
    getFilter:function(){
        var self=this;
        wx.request( {
            url:app.api.condition,
            data: {
                type:'housetype-style-area'
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                self.getData();
                self.setData({
                    filterList:res.data.data
                }); 
            },
            fail:function(){
                console.log('error!!!!!!!!!!!!!!')
            }
        })
    },
    //筛选项点击操作
    filter:function(e){
        var self=this,id=e.currentTarget.dataset.id,txt=e.currentTarget.dataset.txt,tabTxt=this.data.tabTxt;
        switch(e.currentTarget.dataset.index){
            case '0':
                tabTxt[0]=txt;
                self.setData({
                    page:1,
                    data:[],
                    tab:[true,true,true],
                    tabTxt:tabTxt,
                    house_type:id
                });
            break;
            case '1':
                tabTxt[1]=txt;
                self.setData({
                    page:1,
                    data:[],
                    tab:[true,true,true],
                    tabTxt:tabTxt,
                    house_style:id
                });
            break;
            case '2':
                tabTxt[2]=txt;
                self.setData({
                    page:1,
                    data:[],
                    tab:[true,true,true],
                    tabTxt:tabTxt,
                    house_area:id
                });
            break;
        }
        //数据筛选
        self.getData();
    },
    //数据处理
    dataFormat:function(d){
        if(d.data.status=="1"){
            if(d.data.data){
                var datas=this.data.data.concat(d.data.data),flag=d.data.data.length<10;
                this.setData({
                    data:datas,
                    disabled:flag?true:false,
                    moreTxt:flag?"已加载全部数据":"点击加载更多",
                    hasMore:true,
                    dataNull:true
                });

            }else{
                this.setData({
                     hasMore:false,
                     dataNull:false
                });  
            }
        }else{
            console.log('接口异常！')
        }
        wx.hideToast();
    },
    //加载数据
    getData:function(callback){
        var self = this;
        wx.showToast({
          title: '加载中...',
          icon: 'loading',
          duration:10000
        });
        wx.request( {
            url:app.api.subjectList,
            data: {
                page:self.data.page,
                house_type:self.data.house_type,
                house_style:self.data.house_style,
                house_area:self.data.house_area
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                self.dataFormat(res);
            },
            fail:function(){
                console.log('error!!!!!!!!!!!!!!')
            }
        })
    },
    //加载更多
    getMore:function(){
        var self=this;
        self.data.page++;
        self.getData(function(d){
            self.dataFormat(d)
        });
    },
    //跳转案例详情
    goToDetaile:function(event){
        app.globalData.caseId=event.currentTarget.dataset.gid;
        wx.navigateTo({
          url: '../detaile/detaile'
        });
    },
    //跳转设计师详情
    goToDesigner:function(event){
        app.globalData.designerId=event.currentTarget.dataset.did;
        wx.navigateTo({
          url: '../../designer/designer'
        });
    }
});
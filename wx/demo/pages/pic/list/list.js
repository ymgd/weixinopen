var app=getApp();
Page({
    data: {
        data:[],//数据
        house_space:0,//空间
        house_style:0,//风格
        house_section:0,//局部
        disabled:false,//加载更多按钮状态
        page:1,//当前页码
        hasMore:false,//加载更多按钮
        tabTxt:['空间','风格','局部'],//tab文案
        tab:[true,true,true],
        moreTxt:'点击加载更多',
        dataNull:false //无结果提示
    },
    onReady: function() {
        //初始化数据
        var self=this;
        self.getFilter();
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
                type:'space-style-section'
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
                    house_space:id
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
                    house_section:id
                });
            break;
        }
        //数据筛选
        self.getData();
    },
    dataFormat:function(d){
        if(d.data.status=="1"){
            if(d.data.data){
                var datas=this.data.data.concat(d.data.data),flag=d.data.data.length<10;
                this.setData({
                    data:datas,
                    disabled:flag?true:false,
                    moreTxt:flag?"已加载全部数据":"点击加载更多",
                    hasMore:true,
                    dataNull:false
                });

            }else{
                this.setData({
                    moreTxt:"已加载全部数据",
                    hasMore:false,
                    disabled:true,
                    dataNull:true
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
            url:app.api.picList,
            data: {
                page:self.data.page,
                space_id:self.data.house_space,
                style_id:self.data.house_style,
                section_id:self.data.house_section
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function( res ) {
                self.dataFormat(res);
                console.log(self.data.house_space+'-'+self.data.house_style+'-'+self.data.house_section)
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
    goDetaile:function(e){
        // console.log(e);
        app.globalData.picData={
            data:this.data.data,
            page:this.data.page,
            space_id:this.data.space_id,
            style_id:this.data.section_id,
            section_id:this.data.section_id,
            current:e.currentTarget.dataset.index
        }
        wx.navigateTo({
           url: '../detaile/detaile'
        });
    }
})
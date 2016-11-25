var aliyun_auth = require('../../../utils/aliyun_auth.js');
Page({
    data:{
      domainlist:[],
      TotalCount:0,
    },
    onLoad:function(){
      this.getDomainList();
    },
    onShow:function(){
        var app = getApp();
        if(app.globalData.is_cdn_reload == true){
            this.getDomainList();
        }
    },
    app:function(){
        return getApp();
    },
    getDomainList:function(){
      var url = aliyun_auth.init_request({
          url:'https://cdn.aliyuncs.com',
          args:[
              {'Action':'DescribeUserDomains'},
              {"Version":"2014-11-11"}
            ]
      });
      var page = this;
      wx.request({
          url:url,
          success:function(data){
              if(data.statusCode==200){
                  for(var i in data.data.Domains.PageData){
                      if(data.data.Domains.PageData[i]['DomainStatus']=='configuring'){
                          wx.showToast({
                              title:'状态更新中',
                              icon:'loading',
                              duration:3000,
                          });
                          setTimeout(function(){
                              page.getDomainList();
                          },3000);
                      }
                  }
                  page.setData({
                    domainlist:data.data.Domains.PageData,
                    TotalCount:data.data.TotalCount,
                  });
              }else{
                  //获取可用区列表失败，请下拉刷新
              }
          },
          fail:function(data){
              console.log('aliyun:false');
          }
      });
    },
    /**跳转到详情页 */
    to_detail:function(e){
        var index = e.target.dataset.id;
        this.app().globalData.cdn_domain_info = this.data.domainlist[index];
        wx.navigateTo({
            url: 'detail'
        });
    },
    /**添加 */
    to_add:function(){
        wx.navigateTo({
          url: 'add'
        })
    }
});
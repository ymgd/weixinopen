//index.js
//获取应用实例
var util = require('../../util/util.js');
var app = getApp()
var config = app.globalData.config;
Page({
  data: {
    list: [],
    site: app.globalData.site
  },
  fetchList: function(success, fail, paged){
    var paged = paged || 1
    var that = this;
    wx.request({
      url: config.apiUrl + '/issues',
      success: function(res){
        wx.setStorage({
          key: 'list',
          data: res.data
        })
        success(res.data);
      },
      fail: fail
    })
  },

  getList: function(){
    var that = this;
    return new Promise(function(resolve, reject){
      wx.getStorage({
        key: 'list',
        success: function(res){
          if(res.data && res.data.length){
            resolve(res.data);
            // that.fetchList() // 更新数据
          }else{
            that.getList(function(data){
              resolve(res.data)
            })
          }
        },
        fail: function(){
          that.fetchList(function(data){
            resolve(data)
          }, function(){
            reject({message: 'can\'t get data'})
          })
        }
      })
    })
  },

  onLoad: function () {
    var that = this;
    this.getList().then(function(data){
      that.setData({
        list: data.map(function(item){
          item.summary = util.cutStr(item.body, 100);
          item.body = util.marked(item.body);
          return item;
        })
      })
    })
  },

  gotoDetail(e){
    var itemid = e.currentTarget.dataset.itemid
    var itemdata = this.data.list.find(function(it){
      return it.number == itemid;
    })
    app.globalData.detailData = {
      id: itemid,
      item: itemdata
    }
    if(itemdata){
      wx.navigateTo({
        url: '/pages/detail/index',
        success: function(){
        },
        fail: function(){
          app.globalData.detailData = null;
        }
      })
    }
  }
})

// search.js
var app = getApp();
Page({
  data:{
      searchVal:"",
      modalHide:true,
      loading:true,
      history:[]
  },
  onLoad:function(){
      var history = wx.getStorageSync('history');
      if(history){
          this.setData({
             history:history
          })
      }
  },
  modalChange:function(){
      this.setData({
          modalHide:true
      })
  },
  inputChange:function(e){
      this.setData({
        searchVal:e.detail.value
      });
  },
  searchMovies:function(){
      //搜索电影
      var searchVal = this.data.searchVal;
      //判断查询信息是否为空
      if(searchVal){
          var that = this;
          this.setData({
              loading:false
          });
          //设置历史记录
          var history = wx.getStorageSync('history') || [];
          if(history.length >= 5) history.pop();
          //判断历史记录是否相同
          for(var val in history){
              if(history[val] == searchVal){
                  history.splice(val,1)
              }
          }
          history.unshift(searchVal);
          this.setData({
              history:history
          })
          wx.setStorageSync('history',history);
          wx.request({
              url:'https://api.douban.com//v2/movie/search',
              data:{q:searchVal},
              header:{'Content-Type': 'application/json'},
              success:function(data){
                  var subjects = data.data.subjects;
                  for(var subject in subjects){
                    var text = app.getSubjectseTxt(subjects[subject]);
                    subjects[subject].text = text;
                   }
                  that.setData({
                    movies:subjects,
                    loading:true
                  });
              }
          })
      }else{
          this.setData({
              modalHide:false
          })
      }
  },
  historySearch:function(e){
      var name = e.currentTarget.dataset.name;
      this.setData({
        searchVal:name
      });
      this.searchMovies();
  },
  detail:function(e){
      app.detail(e);
  }
})
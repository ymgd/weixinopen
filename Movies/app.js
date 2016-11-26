//app.js
App({
  globalData:{
    userInfo:null
  },
  getSubjectseTxt:function(subject){
    //影片标题
    var title = "名称: "+subject.title;
    ///导演
    var directors = "";
    for(var director in subject.directors){
      if(directors!="") directors+=" /"
      else directors+="导演: "
      directors += subject.directors[director].name;
    }
    //演员
    var casts = "";
    for(var cast in subject.casts){
      if(casts!="") casts+=" /"
      else casts+="演员: "
      casts += subject.casts[cast].name;
    }
    ///影片类型
    var genres = "";
    for(var genre in subject.genres){
      if(genres!="") genres+=" /";
      else genres+="类型: ";
      genres += subject.genres[genre];
    }
    //上映时间
    var year = "上映时间: "+subject.year;
    // 影片信息拼接
    var text = title+"\n"+directors+"\n"+casts+"\n"+genres+"\n"+year;
    return text;
  },
  detail:function(e){
    wx.navigateTo({
        url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
  }
})
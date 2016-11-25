var app =getApp()
Page({
  data:{
    tab0Show:true
  },
  change:function(e){
      var type = [
          "tab0","tab1","tab2"
      ];
      var data = {};
      var id = e.currentTarget.id;
      //   console.log(id)
      for(var i=0,len = type.length;i<len;i++){
          data[type[i]+"Show"] = false ;
      };
      // data[id+"Show"] = !this.data[id+"Show"];
      // 点击自身的时候防止显示隐藏
      if(data[id+"Show"]==false){
        data[id+"Show"] = true;
      }else{
        data[id+"Show"] = !this.data[id+"Show"];
      }
      this.setData(data);
  }
})
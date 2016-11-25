Page({
  data:{
     items: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'TUR', value: '法国'},
    ],
    text:'',
  },
  
  onShow:function(){
    // 页面显示 第一次进入页面统计选中的box
    this.check();
  },
  
  change:function(e){
      console.log(e.detail.value);
      var te="暂时没选中";
      if(e.detail.value.length == 0)
        { 
        } else {
         te = e.detail.value;
        }
         this.setData({
        text:te
      })
      
  },

  check:function(){
    var te="";//遍历是否有选中的
    for(var i = 0;i < this.data.items.length;i ++){
      var item = this.data.items[i];
      if(item.checked){ //如果选中 加到字符串中
        te += item.value;
      }
    }
      if(te.length == 0)
        { 
         te = "暂时没选中" ;
        }
         this.setData({
        text:te
      })
    }
})
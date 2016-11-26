Page({
  data:{
    records : []
  },
  onLoad : function(){
    var that = this,map = {'calm':'平静','happy':'愉快','puzzled':'困惑','surprised':'惊讶','angry':'愤怒','scared':'恐惧','sad':'悲伤','smiling':'爱心'};
    getApp().getPlayInfos(function(data){
         var records = [],hashs;
         for(var _type in data){
            hashs = data[_type]; for(var h in hashs){ records.push(hashs[h]); }
         }
         records.map(function(record){
            record.typeName = map[record.type];
         });
         //按收听次数次数 、 时间
         records.sort(function(record1,record2){        
              if(record1.num == record2.num){
                  return record2.lasttime - record1.lasttime;
              }
              return record2.num - record1.num; 
         });

         that.setData({records : records});
    });
  }

  ,clickItemHandler : function(e){
     var index = parseInt(e.currentTarget.dataset.index);
     var music = this.data.records[index];
     //TODO 发现index.js 里关系弄错了 v0.0.4中修正 点击可继续播放
  }
})
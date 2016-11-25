//city.js
//获取应用实例
var app = getApp();

var json = require('json.js');


Page({
  data: {
    cur_id:app.curid,
    cur_name:"",
    citylist:[]
  },
  
  onLoad: function () {
    var that = this
  	//调用应用实例的方法获取全局数据
    that.getlist(json.cjson);
    that.getname(that.data.cur_id)
  },
  //简化json数据
  getlist:function(json){
    var that=this;
    that.cjson=[];
    json.forEach(function(val,i){
      var tobj={
        id:val.id,
        cityname:val.cityZh,
        province:val.provinceZh,
        leader:val.leaderZh
      }
      that.cjson.push(tobj);
    })
    that.creatarr()
  },
  //并列数据生成嵌套数组
  creatarr:function(){
    var that=this;
    var arr=[];
    var j=0,k=0;//(省份和城市指针)
    that.cjson.forEach(function(val,i){
      if(i==0){//第一次无对比直接添加
        arr.push({pro:val.province,larr:[{lea:val.leader,carr:[{city:val.cityname,id:val.id}]}]})
      }else{
        if(val.province==arr[j].pro){//同省
          if(val.leader==arr[j].larr[k].lea){//同市
            arr[j].larr[k].carr.push({city:val.cityname,id:val.id})
          }else{//不同市
            k++;
            arr[j].larr.push({lea:val.leader,carr:[{city:val.cityname,id:val.id}]})
          }
        }else{//不同省
          j++;k=0;
          arr.push({pro:val.province,larr:[{lea:val.leader,carr:[{city:val.cityname,id:val.id}]}]})
        }
      }
    })
    that.cobj=arr;
    that.setData({citylist:that.cobj})
  },
  //根据编号获取名称
  getname:function(id){
    var that=this;
    for( var i=that.cjson.length-1;i>=0;i--){
      if(that.cjson[i].id==id){
        that.setData({cur_name:that.cjson[i].cityname})
        break;
      }
    }

  },

  //选择城市tap事件
  selecttap:function(e){
    var that=this;
    app.curid = e.currentTarget.id;
    that.setData({cur_id:app.curid,cur_name:that.getname(app.curid)})
    wx.navigateTo({url: '../weather/weather'})
  }
  
})


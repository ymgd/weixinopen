//train.js
Page({
  data: {
    trainList: []
  },
  //之前页面有传递参数过来，所以参数名称得写上用以获取对应值，一般为options
  onLoad: function(options) {
    var jsonString = options.trainInfos;
    //将字串类型转为JSON类型
    var json = JSON.parse(jsonString);
    this.setData({
      trainList: json.data.trainList,
    });
  },
  getSeatInfo: function(e) {
    var prefix = 'trainindex-';
    var trainIndex = e.currentTarget.id.substring(prefix.length);
    //输出根据组件id获取的车票索引，用以显示详细的座位信息
    console.log(trainIndex);
    var trainNo = this.data.trainList[trainIndex].trainNo;
    var json = this.data.trainList[trainIndex].seatInfos;
    //将JSON类型转为String类型用以url参数传递，否则传递后会变成[object Object]，同时传递车次
    var jsonString = JSON.stringify(json);
	wx.navigateTo({
	  url: '../seat/seat?'+'trainNo='+trainNo+'&seatInfos='+jsonString,
	});
  },
});

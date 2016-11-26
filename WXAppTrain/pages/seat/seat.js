//train.js
Page({
  data: {
    trainNo: '',
    seatList: [],
  },
  //之前页面有传递参数过来，所以参数名称得写上用以获取对应值，一般为options
  onLoad: function(options) {
    var train_No = options.trainNo;
    var jsonString = options.seatInfos;
    //将字串类型转为JSON类型
    var json = JSON.parse(jsonString);
    this.setData({
      trainNo: train_No,
      seatList: json,
    });
    console.log(this.data.trainNo);
    console.log(this.data.seatList);
  },
});

var carDetailFromServer = {
	"processPhotoList": [{
		"photo": "/resources/images/4brandChange8.png"
	}],
	"earnestMoney": "199",
	"typeMap": {
		"Yeti 2014款 1.4TSI DSG极地版": [{
			"saveMoney": 57000,
			"num": "38",
			"tprice": "20.08万",
			"color": "戈壁棕+黑内",
			"cprice": "14.38万",
			"typeId": "120"
		},
		{
			"saveMoney": 57000,
			"num": "96",
			"tprice": "20.08万",
			"color": "戈壁棕+米内",
			"cprice": "14.38万",
			"typeId": "121"
		},
		{
			"saveMoney": 57000,
			"num": "95",
			"tprice": "20.08万",
			"color": "藏野黑+黑内",
			"cprice": "14.38万",
			"typeId": "122"
		},
		{
			"saveMoney": 57000,
			"num": "97",
			"tprice": "20.08万",
			"color": "藏野黑+米内",
			"cprice": "14.38万",
			"typeId": "123"
		},
		{
			"saveMoney": 57000,
			"num": "93",
			"tprice": "20.08万",
			"color": "旷野灰+黑内",
			"cprice": "14.38万",
			"typeId": "125"
		},
		{
			"saveMoney": 57000,
			"num": "81",
			"tprice": "20.08万",
			"color": "旷野灰+米内",
			"cprice": "14.38万",
			"typeId": "126"
		}],
		"Yeti 2014款 1.4TSI DSG野驱版": [{
			"saveMoney": 54000,
			"num": "98",
			"tprice": "21.98万",
			"color": "戈壁棕+米内",
			"cprice": "16.58万",
			"typeId": "103"
		}]
	},
	"colors": ["戈壁棕+米内",
	"戈壁棕+黑内",
	"藏野黑+黑内",
	"藏野黑+米内",
	"旷野灰+黑内",
	"旷野灰+米内"],
	"minType": {
		"Yeti 2014款 1.4TSI DSG极地版": {
			"num": "81",
			"tprice": "20.08万",
			"color": "旷野灰+米内",
			"cprice": "14.38万",
			"typeId": "126"
		}
	},
	"photo": "/resources/images/4.png",
	"url": "http:\/\/m.chetuan.com\/temaihui\/series_68\/",
	"shareMsg": "斯柯达Yeti2014款 1.4TSI DSG极地版\/野驱版,购车即送豪华大礼包,数量有限,赶快下单吧！http:\/\/m.chetuan.com\/temaihui\/series_68\/",
	"detailPhotowhList": [""],
	"saveMoney": 35000,
	"temaihuiId": "68",
	"title": "购车即送豪华大礼包",
	"detailPhotoList": [{
		"photo": "/resources/images/4_1.png"
	}],
	"csPrice": "16.58万",
	"carName": "斯柯达Yeti2014款 1.4TSI DSG极地版\/野驱版",
	"tmPrice": "20.08万"
};

Page({
  data: {
    carDetail: {},
	currentSelect:{},
	carModels:[],
	activityImageHeight:0,
	flowImageHeight: 0
  },
  setCarModel: function(source) {
	var carModels = [];
	var first = true;
	for(var s in source) {
		var moreDetail = source[s];
		if(first) {
			carModels.push({
					"carModelName": s,
					"checked":true,
					"moreDetail": moreDetail,
					"initColor": 0
				});
			first = false;
		}else {
			carModels.push({
					"carModelName": s,
					"checked":false,
					"moreDetail": moreDetail,
					"initColor": 0
				});
		}
		
	}
	this.setData({carModels: carModels});
  },
  onLoad: function (option) {
    wx.showToast({title: "加载中"  , icon: "loading", duration: 1000});
    var carId = option.id;
    this.setData({carDetail: carDetailFromServer});
	this.setCarModel(carDetailFromServer.typeMap);

	this.setData({currentSelect: this.data.carModels[0].moreDetail[0]});

	wx.getSystemInfo({success:function(res) {
			console.log(res.model)
			console.log(res.pixelRatio)
			console.log(res.windowWidth)
			console.log(res.windowHeight)
			console.log(res.language)
			console.log(res.version)
	}});
  },
  modelTap: function(e) {
	  this.data.carModels.forEach(function(item, index) {
		if(index == e.currentTarget.id) {
			item.checked = true;
		}else {
			item.checked = false;
		}
	  });
	this.setData({carModels: this.data.carModels});
	this.setData({currentSelect: this.data.carModels[e.currentTarget.id].moreDetail[0]});
  },
  colorTap: function(e) {
	  var that = this;
	  this.data.carModels.forEach(function(item, index) {
		if(item.checked) {
			item.initColor = e.currentTarget.id;
			that.setData({currentSelect: that.data.carModels[index].moreDetail[e.currentTarget.id]});
			that.setData({carModels: that.data.carModels});
		}
	  });
  },
  activityImageLoad: function(e) {
	console.info("加载的图片信息", e.detail);
	this.setData({activityImageHeight: e.detail.height});
	console.info("activityImageHeight", this.data.activityImageHeight);
  },
  flowImageLoad: function(e) {
	console.info("加载的图片信息flow", e.detail);
	this.setData({flowImageHeight: e.detail.height});
	console.info("flowImageHeight", this.data.flowImageHeight);
  }
})


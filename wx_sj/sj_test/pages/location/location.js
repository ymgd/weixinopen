
//获取应用实例
var app = getApp()
Page({
  data: {
    allLocationList: [],
    provinceList: [],
    cityList: [],
    collegeList: [],
    chooseProvinceIndex: 0,
    showed: {},
    selectedInfo: {'provinceName': '省份','cityName':'城市','collegeName':'学校'}
  },

  //初始加载页面
  onLoad: function () {
    var that = this
    try {
      wx.setStorageSync('location', [location, false])
    } 
    catch (e) {    
    }
    app.getLocationInfo(
        function(provinceList){
            for (var i=0; i< provinceList.length; i++)
            {
                var provinceDic = {}
                provinceDic['provinceID'] = provinceList[i].provinceID
                provinceDic['provinceName'] = provinceList[i].provinceName
                that.data.provinceList.push(provinceDic)
            }
            var showed = {provinceShowed: true,cityShowed: false,collegeShowed: false}//设置显示（省份列表）或者隐藏（城市，学校列表）
            that.setData({
                allLocationList: provinceList,
                provinceList: that.data.provinceList,
                showed: showed
            })
        },
      )
  },

  //由选择省份得到城市列表
  getCityList: function(event){
    var that = this
    var chooseIndex = event.currentTarget.dataset.index
    var currentInfo = that.data.allLocationList[chooseIndex]
    var selectedInfo = that.data.selectedInfo
    selectedInfo['provinceID'] = event.currentTarget.dataset.provinceid
    selectedInfo['provinceName'] = event.currentTarget.dataset.provincename
    var cityList = currentInfo.cityList
    for (var i=0; i< cityList.length; i++)
      {
          var cityDic = {}
          cityDic['cityID'] = cityList[i].cityID
          cityDic['cityName'] = cityList[i].cityName
          that.data.cityList.push(cityDic)
      }
    var showed = that.data.showed
    showed.provinceShowed = false
    showed.cityShowed = true
    that.setData({
        chooseProvinceIndex: chooseIndex,
        cityList: that.data.cityList,
        showed: that.data.showed,
        selectedInfo: that.data.selectedInfo
    })
  },

  //由选择城市得到学校列表
  getCollegeList: function(event){
    var that = this
    var chooseIndex = event.currentTarget.dataset.index
    var provinceIndex = that.data.chooseProvinceIndex
    var currentInfo = that.data.allLocationList[provinceIndex].cityList[chooseIndex]
    var selectedInfo = that.data.selectedInfo
    selectedInfo['cityID'] = event.currentTarget.dataset.cityid
    selectedInfo['cityName'] = event.currentTarget.dataset.cityname
    var collegeList = currentInfo.collegeList
    for (var i=0; i< collegeList.length; i++)
      {
          var collegeDic = {}
          collegeDic['collegeID'] = collegeList[i].collegeID
          collegeDic['collegeName'] = collegeList[i].collegeName
          that.data.collegeList.push(collegeDic)
      }
    var showed = that.data.showed
    showed.cityShowed = false
    showed.collegeShowed = true
    that.setData({
        collegeList: that.data.collegeList,
        showed: that.data.showed,
        selectedInfo: that.data.selectedInfo
    })
  },

  //选择省份，城市，学校后，确定选择
  goToconfirm: function(event){
    var that = this
    var selectedInfo = that.data.selectedInfo
    selectedInfo['collegeID'] = event.currentTarget.dataset.collegeid
    selectedInfo['collegeName'] = event.currentTarget.dataset.collegename
    var showed = that.data.showed
    showed.collegeShowed = false
    that.setData({
      showed: that.data.showed,
      selectedInfo: that.data.selectedInfo
    })
  },

  //重新选择省份，显示省份列表
  showProvinceList: function(){
    var that = this
    var showed = that.data.showed
    showed.provinceShowed = true
    showed.cityShowed = false
    showed.collegeShowed = false
    var selectedInfo = that.data.selectedInfo
    selectedInfo.cityID = '0'
    selectedInfo.cityName = '城市'
    selectedInfo.collegeID = '0'
    selectedInfo.collegeName = '学校'
    that.setData({
      showed: that.data.showed,
      cityList: [],
      collegeList: []
    })
  },

  //重新选择城市，显示城市列表
  showCityList: function(){
    var that = this
    var showed = that.data.showed
    showed.provinceShowed = false
    showed.cityShowed = true
    showed.collegeShowed = false
    var selectedInfo = that.data.selectedInfo
    selectedInfo.collegeID = '0'
    selectedInfo.collegeName = '学校'
    that.setData({
      showed: that.data.showed,
      collegeList: []
    })
  },

  //重新选择学校，显示学校列表
  showCollegeList: function(){
    var that = this
    var showed = that.data.showed
    showed.provinceShowed = false
    showed.cityShowed = false
    showed.collegeShowed = true
    that.setData({
      showed: that.data.showed,
    })
  },

  //页面返回到上一层时，将选择数据存储到本地缓存数据中
  onUnload: function(){
    var that = this
    var location = that.data.selectedInfo
    try {
      wx.setStorageSync('location', [location,true])
    } 
    catch (e) {    
    }
  }
    
})



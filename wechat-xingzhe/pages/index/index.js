let countTooGetLocation = 0;
let total_micro_second = 0;
let starRun = 0;
let totalSecond = 0;
let oriMeters = 0.0;
let t = 5000; // 获取定位点的频率，1000为1s

let globalDataArr = []; // 临时存储点数组

/* 毫秒级倒计时 */
let count_down = that => {
  if (starRun == 0) {
    return;
  }

  if (countTooGetLocation >= 100) {
    let time = date_format(total_micro_second);
    that.updateTime(time);
  }

  if (countTooGetLocation >= t) { 
    that.getLocation();
    countTooGetLocation = 0;
  }

  // setTimeout
  setTimeout(function() {
    countTooGetLocation += 10;
    total_micro_second += 10;
    count_down(that);
  }, 10)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
let date_format = micro_second => {
  let fill_zero_prefix = num => {
    return num < 10 ? "0" + num : num;
  };
  let second = Math.floor(micro_second / 1000);
  let hr = Math.floor(second / 3600);
  let min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  let sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
  return hr + ":" + min + ":" + sec + " ";
}

let getDistance = (lat1, lng1, lat2, lng2) => {
  let toRadians = d => {
    return d * Math.PI / 180;
  };
  let dis = 0;
  let radLat1 = toRadians(lat1);
  let radLat2 = toRadians(lat2);
  let deltaLat = radLat1 - radLat2;
  let deltaLng = toRadians(lng1) - toRadians(lng2);
  dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
}



//****************************************************************************************
//****************************************************************************************

Page({
  data: {
    // clock: '',
    isLocation: false,
    isStarRun: false,
    latitude: 0,
    longitude: 0,
    meters: 0.00,
    speed: 0,
    time: "0:00:00"
  },

  onLoad: function() {
    this.getLocation()
    console.log("onLoad")
    count_down(this);

  },

  // 开始记录
  starRun: function() {
    if (starRun == 1) {
      return;
    }

    this.setData({
      isStarRun: true
    })
    starRun = 1;
    count_down(this);
    this.getLocation();
    wx.setNavigationBarTitle({title: '记录中…'});
    
  },

  // 停止记录
  stopRun: function() {

    // 隐藏导航栏动画
    // wx.hideNavigationBarLoading();
    wx.setNavigationBarTitle({title: '行者'});

    // 显示「开始」按钮
    this.setData({
      isStarRun: false
    })
    starRun = 0;
    count_down(this);

    // wx.getStorage({
    //   key: 'waypoints',
    //   success: function(res) {
    //       console.log(res.data);
    //       wx.setStorage({
    //         key:"waypoints",
    //         data: globalDataArr.push(res.data)
    //       });
          
    //   } 
    // })

    // 存储坐标数据
    wx.setStorage({
      key:"waypoints",
      data: globalDataArr
    });
    // 清空临时数组
    globalDataArr = [];

    // 存储其他记录数据
    wx.setStorage({
      key:"wp",
      data: {
        meters: this.data.meters,
        speed: this.data.speed,
        time: this.data.time
      }
    });
    

    // 计时数据清零
    countTooGetLocation = 0;
    total_micro_second = 0;
    this.setData({
      time: "0:00:00"
    })

  },

  updateTime: function(time) {
    let data = this.data;
    data.time = time;
    this.data = data;
    this.setData({
      time: time,
    })
  },


  getLocation: function() {
    let that = this;

    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {

        let lat = res.latitude;
        let lng = res.longitude;
        let newMeters = getDistance(lat, lng, lat, lng) / 1000; //newMeters：每次取点移动的距离，单位m
        if (newMeters < 0.0015) {
          newMeters = 0.0;
        }
        oriMeters += newMeters;
        let meters = new Number(oriMeters);
        let showMeters = meters.toFixed(2);
        let showSpeed = newMeters / t*1000;

        console.log(lat,lng);

        that.setData({
          latitude: lat,
          longitude: lng,
          meters: showMeters,
          speed: showSpeed
        });

        globalDataArr.push({
          lat: lat,
          lng: lng
        });

      },
    })
  }

})

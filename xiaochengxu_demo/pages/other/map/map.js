Page({
  data: {
      //标记点，在地图上显示标记的位置
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    }],
    //覆盖物,在地图上显示自定义图标
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      iconPath: '../../images/car.png',
      rotate: 10
    }, {
      latitude: 23.099298,
      longitude: 113.324129,
      iconPath: '../../images/car.png',
      rotate: 90
    }]
  }
})
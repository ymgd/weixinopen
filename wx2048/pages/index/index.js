//index.js
var initBoxes = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

var app = getApp()
Page({
  data: {
    userInfo: {},
    score: 0,
    boxes: initBoxes,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  //开始游戏
  initGame: function () {
    this.setData({
      boxes: initBoxes,
      score: 0
    })
    this.genNum()
    this.genNum()
  },
  //在剩余位置随机产生一个数字
  genNum: function () {
    var boxes = this.data.boxes,
        randNum = Math.random() < 0.8 ? 2 : 4,
        zeros = []

    for (var i=0; i<4; i++) {
      for (var j=0; j<4; j++) {
        if (boxes[i][j] === 0) {
          zeros.push({  //存储位置
            posX: i,
            posY: j
          })
        }
      }
    }
    if (zeros.length === 0) {
      this.gameover()
    }
    var randPos = zeros[Math.floor(Math.random() * zeros.length)]
    boxes[randPos.posX][randPos.posY] = randNum
    this.setData({
      boxes: boxes
    })
  },
  //获取触摸屏幕开始坐标
  slideStart: function (event) {
    this.setData({
      startX: event.touches[0].pageX,
      startY: event.touches[0].pageY
    })
  },
  //获取触摸屏幕结束坐标
  slideMove: function (event) {
    this.setData({
      endX: event.touches[0].pageX,
      endY: event.touches[0].pageY
    })
  },
  //手离开屏幕事件
  slideEnd: function (event) {
    var endX = this.data.endX,
        endY = this.data.endY,
        startX = this.data.startX,
        startY = this.data.startY,
        absX = Math.abs(endX - startX),
        absY = Math.abs(endY - startY),
        direction
    
    if (endX === 0 && endY === 0) { //判断是否是单击
      console.log('tap')
      return 
    }
    direction = absX - absY > 0
              ? direction = endX - startX > 0 ? 'right' : 'left'
              : direction = endY - startY > 0 ? 'bottom' : 'top'

    this.setData({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    })

    switch (direction) {
      case 'top':
        this.refresh('top')
        break
      case 'bottom':
        this.refresh('bottom')
        break
      case 'left':
        this.refresh('left')
        break
      case 'right':
        this.refresh('right')
      default:
    }
  },
  //刷新页面
  refresh: function (direction) {
    var arr = this.data.boxes,
        len = arr.length,
        newArr = [],
        order,
        arr01 = arr
    
    if (direction === 'top' || direction === 'bottom') {
      arr = this.regroup(arr)
    }

    if (direction === 'right' || direction === 'bottom') {
      order = true
    }

    for (var i=0; i<len; i++) {
      newArr.push(this.move(this.merge(this.move(arr[i], order))))
    }

    if (direction === 'right' || direction === 'bottom') {
      for (var j=0; j<len; j++) {
        newArr[j].reverse()
      }
    }

    if (direction === 'top' || direction === 'bottom') {
      newArr = this.regroup(newArr)
    }

    if (newArr.join(',') !== arr01.join(',')) {
      this.setData({
        boxes: newArr
      })
      this.genNum()
    }
  },
  /**
   * 重组数组
   * 0, 0, 0, 0        0, 1, 1, 1
   * 1, 0, 2, 0   ==>  0, 0, 0, 0
   * 1, 0, 2, 0        0, 2, 2, 2
   * 1, 0, 2, 0        0, 0, 0, 0
   */
  regroup: function (arr) {
    var len = arr.length,
        regroupArr = [],
        longArr = []

    for (var i=0; i<len; i++) {
        for (var j=0; j<len; j++) {
            longArr.push(arr[i][j])
        }
    }

    for (var m=0; m<len; m++) {
        regroupArr[m] = []
        for (var n=m; n<longArr.length; n+=4) {
            regroupArr[m].push(longArr[n])
        }
    }

    return regroupArr
  },
  /**
   * 数组中大于0的数在左边，0在右边
   * [1, 0, 0, 2] ==> [1, 2, 0, 0]
   */
  move: function (arr, order) {
    var len = arr.length,
        cArr = [],
        j = 0

    if (order) {
        arr = arr.reverse()
    }

    for (var i=0; i<len; i++) {
        if (arr[i] === 0) {
            continue
        }

        cArr[j++] = arr[i]
    }

    for (var n=j; n<len; n++) {
        cArr[n] = 0
    }

    return cArr
  },
  /**
   * 数组中相同2个元素，第一个元素的值*2， 第二个值设为0
   * [2, 2, 4, 4] ==> [4, 0, 8, 0]
   * [0, 2, 2, 0] ==> [0, 4, 0, 0]
   */
  merge: function (arr) {
    var len = arr.length,
        score = this.data.score //得分
    
    for (var i=0; i<len; i++) {
        if (arr[i] === arr[i+1]) {
            arr[i] = arr[i] * 2
            arr[i+1] = 0
            score += arr[i]
            this.setData({
              score: score
            })
        }
        
    }

    return arr
  },
  gameover: function () {

  }
})

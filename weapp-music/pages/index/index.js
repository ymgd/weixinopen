var app = getApp()
var songList = app.globalData.songList
var displayList = songList.filter(function(item){
  return item.type === 'MP3'
})
var playList = displayList.slice(0)
var status = ['play','pause']
var modes = ['loop','random','single']
make_looper(modes)
make_looper(playList, setCurrent)

Page({
  data: {
    displayList: displayList,
    src: playList[0].src,
    name: playList[0].songname,
    author: '寒江雪',
    time: '',
    poster: '../../images/hanjiangxue.jpg',
    status: 'play',
    mode: 'loop',
    audioAction: {
      method: 'pause'
    },
    loading: true
  },
  started: function(){
    this.setData({
      loading: false
    })
  },
  ended: function(){
    this.next()
  },
  timeupdate: function(e){
    var currentTime = e.detail.currentTime
    var duration = e.detail.duration
    this.setData({
      time: formatTime(duration - currentTime)
    })
  },
  playItem: function(e){
    if(this.data.mode === 'single'){
      this.setMode('random')
    }
    var song = playList.current(e.currentTarget.dataset.src)
    this.setData({
      src: song.src,
      name: song.songname,
    })
    this.play()
  },
  play_pause: (function(flag){
    return function(){
      flag = !flag
      if(flag){
        this.play()
	      this.setData({
          status: 'pause'
        })
      }else{
        this.pause()
        this.setData({
          status: 'play'
        })
      }
    }
  })(0),
  next: function(){
    if(this.data.mode === 'single'){
      this.setMode('random')
    }
    var song = playList.next()
    this.setData({
      src: song.src,
      name: song.songname,
    })
    this.play()
  },
  prev: function(){
    if(this.data.mode === 'single'){
      this.setMode('random')
    }
    var song = playList.prev()
    this.setData({
      src: song.src,
      name: song.songname,
    })
    this.play()
  },
  play: function(){
    this.setData({
      audioAction: {
        method: 'play'
      },
      loading: true
    })
  },
  pause: function(){
    this.setData({
      audioAction: {
        method: 'pause'
      },
    })
  },
  switchMode: function(){
    var mode = modes.next()
    this.setMode(mode)
    this.play()
  },
  setMode: function(mode){
    if(mode === 'loop'){
      playList = displayList.slice(0)
    }else if(mode === 'random'){
      playList = displayList.slice(0).sort(function(){
        return Math.random() > 0.5 ? 1 : -1
      })
    }else if(mode === 'single'){
      playList = [playList.current(src)]
    }
    make_looper(playList, setCurrent)
    this.setData({
      mode: mode
    })
  },
  onLoad: function () {
  }
})

function setCurrent(src){
  var idx = 0
  this.forEach(function(item, index){
    if(src === item.src){
      return idx = index
    }
  })
  return idx
}

function make_looper(arr, setCurrent){

    arr.loop_idx = 0

    arr.current = function(current){
      if(current){
        this.loop_idx = setCurrent.call(this, current)
      }
      if( this.loop_idx < 0 ){
        this.loop_idx = this.length - 1
      }
      if( this.loop_idx >= this.length ){
        this.loop_idx = 0
      }
      return arr[ this.loop_idx ]
    }

    arr.next = function(){
      this.loop_idx++
      return this.current()
    }

    arr.prev = function(){
      this.loop_idx--
      return this.current()
    }
}

function formatTime(seconds){
  var min = ~~(seconds / 60)
  var sec = parseInt(seconds - min * 60)
  return min + ':' + ('00' + sec).substr(-2)
}

var time=require('../../utils/util')
var initData={
  isPlaying: false, 
  song_lyr: [],
  cur_time: "0:00",
  total_time: "0:00",
  duration: 0,
  current:0,
  angle:0,
  top:0,
  textActive: 0,
  item: {
        id: '',
        title: "下完这场雨",
        author: "后弦",
        pic: "../../images/1.jpg",
        song_url: "http://yinyueshiting.baidu.com/data2/music/5583b4d475d522a487f16d39b799a67e/272954076/272954076.mp3?xcode=c98405eb18453184b59adc403ebeee44",
        lyr_url: "http://musicdata.baidu.com/data2/lrc/140ce0e551282b7ea4b478521b75f376/273156819/273156819.lrc"
    }
}

Page({
    data: Object.assign({ 
    height: 220,
    played_list: [],
    is_show_lyr: false,
    is_show_played: false
    },initData),
    onReady: function(){ 
        wx.setNavigationBarTitle({
          title: '在线播放',
        })
    },
    onLoad: function(option){
      if(option.id){
        time.getSong(option.id).then(data => {
          this.setData({
            item: {
              id: option.id,
              title: data.songinfo.title,
              author: data.songinfo.author,
              pic: data.songinfo.pic_premium,
              song_url: data.bitrate.file_link,
              lyr_url: data.songinfo.lrclink
            }
          })
          loadPage(this);
          savePlayed(this);
        })
      }else{
        getPlayed(this)
        loadPage(this);
      }
      
    },
    onShow: function(){
      getPlayed(this)
    },
    //播放暂停
    playSong: function(){     
        if(!this.data.isPlaying){
          play(this);
        }else{
          wx.pauseBackgroundAudio({})
          this.setData({
            isPlaying: false
          })
        }
    },
    //拖动滚动条
    changeSongPross: function(e){
      this.setData({
        current: e.detail.value,
        cur_time: time.formate(e.detail.value)
      })
      play(this)
    },
    //展示歌词，隐藏头像
    showLyr: function(){
      if(!this.data.is_show_lyr){
        this.setData({
          is_show_lyr: true,
          height: 640
        })
      }else{
         this.setData({
          is_show_lyr: false,
          height: 220
        })
      }
    },
    //展示播放过的列表
    showPlayed: function(){
      var flag=this.data.is_show_played;
      this.setData({
        is_show_played: !flag
      })
    },
    //切换歌曲
    changeSong: function(e){
      var id=e.currentTarget.dataset.id;
      this.data.played_list.forEach(ele => {
        this.data=Object.assign(this.data,initData)
        if(ele.id==id){
          this.setData({
            item: ele,
            is_show_played: false
          })
          loadPage(this)

        }
      })
    },
    //删除一首歌
    delOneSong: function(e){
      var id=e.currentTarget.dataset.id;
      var playedList=wx.getStorageSync('played');
      var newList=[];
      if(playedList.length>0){
        playedList.forEach(ele => {
          if(ele.id!=id){
            newList.push(ele)
          }
        })
        this.setData({
          played_list:newList
        })
        wx.setStorageSync('played', newList)
      }
    },
    //删除所有歌曲
    delAllSong: function(){
      this.setData({
        played_list: []
      })
      wx.setStorageSync('played', [])
    },
    //前一首歌曲
    prevSong: function(){
      for(var i=0;i<this.data.played_list.length;i++){
        if(this.data.played_list[i].id==this.data.item.id){
          if(i!=0){
            this.data=Object.assign(this.data,initData)
            var ele=this.data.played_list[i-1];
            this.setData({
              item: ele
            })         
            loadPage(this)
          }
        }        
      }
    },
    //下一首歌曲
    nextSong: function(){
      var l=this.data.played_list.length;
      for(var i=0;i<l;i++){
        if(this.data.played_list[i].id==this.data.item.id){
          if(i!=l-1){
            this.data=Object.assign(this.data,initData)
            var ele=this.data.played_list[i+1];
            this.setData({
              item: ele
            })
            loadPage(this)
          }
        }
      }
    }
})

//播放、暂停
function play(page){
  wx.playBackgroundAudio({
    dataUrl: page.data.item.song_url,
    success: function(res){
      wx.seekBackgroundAudio({
        position: page.data.current
      })
    }
  })   
  page.setData({
      isPlaying: true
    })
}
//播放中
function playing(page){
  wx.getBackgroundAudioPlayerState({
      success: function(res){
        if(!page.data.duration){
          page.setData({
            duration: parseInt(res.duration),
            total_time: time.formate(res.duration)
          })
        }
        if(res.status==1){
          page.setData({
            current: res.currentPosition,
            cur_time: time.formate(res.currentPosition)
          })
          scrollLyr(page)
        }
        //循环播放,这里存在bug，差值可能为1
        if(page.data.duration-page.data.current<=1){
          page.setData({
            current: 0,
            cur_time: '0:00'
          })
          play(page)
        }
      }
    })
}
//头像旋转动画
function animation(page){
  var angle=page.data.angle+1;
  page.setData({
    angle: angle
  })
}
//加载歌词
function loadLyr(page){
  wx.request({
    url: page.data.item.lyr_url,
    method: 'GET', 
    success: function(res){
      var re=/\[[^[]+/g;
      if(res.data){
        var arr=res.data.match(re);
        var lyrList=[];
        arr.forEach((ele) => {
          lyrList.push({time: ele.substring(1,9),lyr:ele.substring(10,ele.length)})
        })
        page.setData({
          song_lyr: lyrList
        })
      }
    }
  })
}
//滚动歌词
function scrollLyr(page){
  var cur=page.data.current;
  var lt;
  var rt;
  var l=page.data.song_lyr.length-1;
  for(var i=0;i<l;i++){
    lt=time.timeToSeconds(page.data.song_lyr[i].time);
    rt=time.timeToSeconds(page.data.song_lyr[i+1].time);
    if(cur>=lt&&cur<rt){
      page.setData({
        textActive: i
      })
      if(i>2){
        page.setData({
          top: -(i-2)*52
        })
      }
      break;
    }
  }
  if(cur==page.data.duration){
    page.setData({
      textActive: l,
      top: -(l-2)*52
    })
  }
}

function loadPage(page){
  //播放
    play(page);
    loadLyr(page);
    //记录播放状态
    playing(page);
    setInterval(function(){
      playing(page)
    },1000);
    //动画头像
    setInterval(function(){
        if(page.data.isPlaying){
          animation(page)
        }
    },100)  
}
//存储播放了的音乐
function savePlayed(page){
  var playedList=wx.getStorageSync('played');
  var newList=[];
  var flag=true;
  if(playedList){
    for(var i=0;i<playedList.length;i++){
      if(playedList[i].id==page.data.item.id){
        flag=false;
      }
      newList.push(playedList[i]);
    }
  }
  if(flag){
    newList.push(page.data.item)
    wx.setStorageSync('played', newList)
  }
  page.setData({
    played_list: newList
  })
}

//获取播放过的音乐
function getPlayed(page){
  var playedList=wx.getStorageSync('played');
  var newList=[];
  if(playedList&&playedList.length>0){
    for(var i=0;i<playedList.length;i++){
      newList.push(playedList[i]);
    }
    page.setData({
      played_list: newList,
      item: newList[newList.length-1]
    })
  }
}

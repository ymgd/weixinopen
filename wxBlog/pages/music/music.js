//index.js
var nav = require('../../utils/nav.js'); //获取导航的实例
var songsId = ["424477572","28747428","30569023","404184209","411988502","408332847","187956","41665696","31545822","168277","65528","34179838","64673","188671","208938","190473","425724850","37169617","35403523","209045","409060868","113610","185982","185868","253948","30394763","63650","187966","255858","32507038","186125","4950181","188703","720231","28029104","36539010","316637","27612267","64959","35847131","31654343","167924","287035","387622","188657","30394771","25877506","30070212","28850212","26348068","286602","30953009"];//歌曲
var count = 12;
var musicStatus = false;
var songs = [{
    picUrl:"http://p3.music.126.net/MbZuWcPDt62Fo-3-Plj1AA==/3420580718200324.jpg",
    name:"WHISTLE",
    singer:"BLACKPINK",
    scale:"scale"
}];

Page({
  data: {
    nav:nav.NavF(),
    playMusic:{
      img:"http://www.seventh77.com/view/food/img/head.jpg",
      sing:"柒柒",
      song:"我喜欢的歌曲"
    },
    musics:songs,
    play:""
  },
  onLoad: function () {
    this.Nav_Init();
    this.loadSongs("424477572");
  },
  playMusic: function(event){
    this.changeBtn(event);
    this.singPlay();
  },
  controlMusic: function(event){
    if(musicStatus){
      this.singPause();
    }
    else{
      this.singPlay();
    }
  },
  singPlay: function(){
    musicStatus = true;
    this.setData({
      play:"play"
    });
  },
  singPause: function(){
    musicStatus = false;
    this.setData({
      play:"play stop"
    });
  },
  changeBtn: function(event){
    for (var i = 0;i < songs.length;i++){
      songs[i].scale = "scale";
      if(event.currentTarget.id == songs[i].name){
        songs[i].scale = "";
        this.setData({
          playMusic:{
            img:songs[i].picUrl,
            sing:songs[i].singer,
            song:songs[i].name
          }
        });
      }
    }
    this.setData({
      musics:songs
    });
  },
  Nav_Init: function(){
    var thisNav = nav.NavF();
    thisNav.color = "rgb(130, 148, 160)";
    thisNav.navCont[3].border = "5rpx solid #333";
    this.setData({
      nav:thisNav
    });
  },
  loadSongs: function(data){
    wx.request({
      url: 'http://www.seventh77.com/modal/test.php',
      method: 'POST',
      data: 'id=' + data,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
      }
    })
  }
})

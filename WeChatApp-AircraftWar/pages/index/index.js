var that;
var set;
var mark = 0;
var mark1 = 0;
Page( {
  data: {
    // text:"这是一个页面"
    startDisplay: "block",
    mainDisplay: "none",
    endDisplay: "none",
    myAirPath: "../assets/image/myAir.gif",
    backgroundPositionY: 0,
    top: 450,
    left: 160,
    myAirWidth: 60,
    myAirHeight: 60,
    bullets: [],
    enemys: [],
    scores: 0
  },
  onLoad: function( options ) {
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }, begin: function( event ) {
    //开始的点击事件
    that.setData( {
      startDisplay: "none",
      mainDisplay: "block",
      endDisplay: "none"
    });
    set = setInterval( start, 20 );
  }, mytouchmove: function( event ) {
    //我方战机滑动事件
    var top = event.touches[ 0 ].pageY - 30;
    var left = event.touches[ 0 ].pageX - 30;
    if( ( left < 260 && left > 0 ) && ( top < 470 && top > 0 ) ) {
      that.setData( { top: top, left: left });
    }
  }, jisu: function( event ) {
    //继续
    that.setData( {
      startDisplay: "block",
      mainDisplay: "none",
      endDisplay: "none",
      myAirPath: "../assets/image/myAir.gif",
      backgroundPositionY: 0,
      top: 450,
      left: 160,
      myAirWidth: 60,
      myAirHeight: 60,
      bullets: [],
      enemys: [],
      scores: 0
    });
    mark = 0;
    mark1 = 0;
  }
});

/**
 * 开始游戏
 */
function start() {
  //页面背景滚动
  that.data.backgroundPositionY += 0.5;
  if( that.data.backgroundPositionY == 568 ) {
    that.data.backgroundPositionY = 0;
  }
  that.setData( { backgroundPositionY: that.data.backgroundPositionY });
  mark++;
  //创建敌机
  if( mark == 20 ) {
    mark1++;
    if( mark1 % 5 == 0 ) {
      //中飞机
      that.data.enemys.push( new enemy( 6, 25, 274, 46, 60, 5000, 360, random( 1, 3 ),
        "../assets/image/aircraftExplosion.gif", "../assets/image/enemy3_fly_1.png" ) );
    }
    if( mark1 == 20 ) {
      //大飞机
      that.data.enemys.push( new enemy( 12, 57, 210, 110, 164, 30000, 540, 1,
        "../assets/image/bigAircraftExplosion.gif", "../assets/image/enemy2_fly_1.png" ) );
      mark1 = 0;
    } else {
      //小飞机
      that.data.enemys.push( new enemy( 1, 19, 286, 34, 24, 1000, 360, random( 1, 4 ),
        "../assets/image/smallAircraftExplosion.gif", "../assets/image/enemy1_fly_1.png" ) );
    }
    mark = 0;
  }
  that.setData( { enemys: that.data.enemys });
  //移动敌机
  var enemtslen = that.data.enemys.length;
  for( var i = 0;i < enemtslen;i++ ) {
    var myEnemy = that.data.enemys[ i ];
    //planisdie == true|false 飞机死亡|飞机未死亡  
    if( myEnemy.planisdie != true ) {
      var scores = that.data.scores;
      if( scores <= 50000 ) {
        myEnemy.planY += myEnemy.plansudu;
      } else if( scores > 50000 && scores <= 100000 ) {
        myEnemy.planY += myEnemy.plansudu + 1;
      } else if( scores > 100000 && scores <= 150000 ) {
        myEnemy.planY += myEnemy.plansudu + 2;
      } else if( scores > 150000 && scores <= 200000 ) {
        myEnemy.planY += myEnemy.plansudu + 3;
      } else if( scores > 200000 && scores <= 250000 ) {
        myEnemy.planY += myEnemy.plansudu + 4;
      } else {
        myEnemy.planY += myEnemy.plansudu + 5;
      }
      that.setData( { enemys: that.data.enemys });
    }
    //如果敌机超出边界，删除敌机
    if( myEnemy.planY > 500 ) {
      removeEnemy( i );
      enemtslen--;
    }
    //当敌机死亡标志变成true的时候代表敌机已经死亡，过一段时间删除敌机
    if( myEnemy.planisdie == true ) {
      myEnemy.plandietimes += 20;
      if( myEnemy.plandietimes == myEnemy.plandietime ) {
        removeEnemy( i );
    	   enemtslen--;
      }
    }
  }

  //创建子弹
  if( mark % 5 == 0 ) {
    that.data.bullets.push( new oddbullet( that.data.left + 26, that.data.top - 10 ) );
  }
  //移动子弹
  var bulletslen = that.data.bullets.length;
  for( var i = 0;i < bulletslen;i++ ) {
    that.data.bullets[ i ].bulletY -= 20;
    that.setData( { bullets: that.data.bullets });
    //如果子弹超出边界，删除子弹
    if( that.data.bullets[ i ].bulletY < 0 ) {
      removeBullet( i );
      bulletslen--;
    }
  }
  for( var k = 0;k < bulletslen;k++ ) {
    for( var j = 0;j < enemtslen;j++ ) {
      //判断碰撞本方飞机
      var myEnemy = that.data.enemys[ j ];
      if( myEnemy.planisdie == false ) {
        if( ( myEnemy.planX + myEnemy.plansizeX >= that.data.left && myEnemy.planX <= that.data.left + that.data.myAirWidth ) &&
          ( myEnemy.planY + myEnemy.plansizeY >= that.data.top + 40 && myEnemy.planY <= that.data.top - 20 + that.data.myAirHeight ) ) {
          //飞机碰撞
          that.setData( { myAirPath: "../assets/image/MyAirBlast.gif", endDisplay: "block" });
          clearInterval( set );
        }
        var myBullet = that.data.bullets[ k ];
        if( myBullet != null ) {
          //判断子弹与敌机的碰撞
          if( ( myBullet.bulletX + myBullet.bulletsizeX > myEnemy.planX && myBullet.bulletX < myEnemy.planX + myEnemy.plansizeX ) &&
            ( myBullet.bulletY <= myEnemy.planY + myEnemy.plansizeY && myBullet.bulletY + myBullet.bulletsizeY >= myEnemy.planY ) ) {
            console.log( "=======打到飞机=======" );
            myEnemy.planhp -= myBullet.bulletattach;
            if( myEnemy.planhp == 0 ) {
              var scorse = that.data.scores;
              scores += myEnemy.planscore;
              that.setData( { scores: scores });
              myEnemy.planimagesrc = myEnemy.planboomimage;
              myEnemy.planisdie = true;
            }
            //删除子弹
            removeBullet( k );
            bulletslen--;
          }

        }

      }
    }
  }
}

/**
 * 删除子弹
 */
function removeBullet( index ) {
  var arr = that.data.bullets;
  arr.splice( index, 1 );
  that.setData( { bullets: arr });
}

/**
 * 删除敌机
 */
function removeEnemy( index ) {
  var arr = that.data.enemys;
  arr.splice( index, 1 );
  that.setData( { enemys: arr });
}


/**
 * 创建单行子弹类
 */
function oddbullet( X, Y ) {
  bullet.call( this, X, Y, 6, 14, "../assets/image/bullet1.png" );
}

/**
 * 创建子弹类
 */
function bullet( X, Y, sizeX, sizeY, imagesrc ) {
  this.bulletX = X;
  this.bulletY = Y;
  this.bulletattach = 1;
  this.bulletsizeX = sizeX;
  this.bulletsizeY = sizeY;
  this.imagesrc = imagesrc;
}

/**
 * 创建飞机类
 */
function plan( hp, X, Y, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc ) {
  this.planX = X;
  this.planY = Y;
  this.planhp = hp;
  this.planscore = score;
  this.plansizeX = sizeX;
  this.plansizeY = sizeY;
  this.planboomimage = boomimage;
  this.planisdie = false;
  this.plandirtimes = 0;
  this.plandietime = dietime;
  this.plansudu = sudu;
  this.planimagesrc = imagesrc;
}

/**
 * 创建敌机类
 */
function enemy( hp, a, b, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc ) {
  plan.call( this, hp, random( a, b ), -10, sizeX, sizeY, score, dietime, sudu, boomimage, imagesrc );
}

/**
 * 产生min max之间的随机数
 */
function random( min, max ) {
  return Math.floor( min + Math.random() * ( max - min ) );
}






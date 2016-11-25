const flyimages = require( './images.js' );
const emitter = require( '../utils/emitter.js' );

//游戏配置
var config = {
    "gameSpeed": 8,  //游戏速度
    "cartridgeSpeed": 10  //子弹速度
};

function flyGame( opts ) {
    var c_width = this.c_width = opts.width;
    var c_height = this.c_height = opts.height;  //画布的高和宽
    var cxt = this.cxt = opts.ctx;
    var id = this.id = opts.id;
    this.cxt.setFontSize( 30 );
    this.cxt.setFillStyle( "#333" );

    //等待时间
    var loadingTime = 0;

    //等待动画刷新事件
    var refresh = function() {
        drawBg();
        drawLogo();
        load();
        loadingTime++;
        wx.drawCanvas( {
            canvasId: id,
            actions: cxt.getActions()
        })
    }

    //设置背景
    function drawBg() {
        var bg_img = flyimages[ "bg" ];
        var bg_img_width = bg_img.width;
        var bg_img_height = bg_img.height;
        cxt.drawImage( bg_img.src, 0, 0, bg_img_width, bg_img_height );
    }

    //构造logo
    function drawLogo() {
        var logo_img = flyimages[ "logo" ];
        var logo_width = logo_img.width;
        var logo_height = logo_img.height;

        var y = 100;
        cxt.drawImage( logo_img.src, 0, y, logo_width, logo_height );
    }

    //等待动画
    function load() {
        if( loadingTime == 600 ) {
            loadingTime = 0;
            clearInterval( loadingClock );
            game.start();
        }

        //loadingTime每隔200换一张图, 实现等待动画
        var pic = flyimages[ "loading" + ( parseInt( loadingTime / 200 ) + 1 ) + "" ];
        var pic_width = pic.width;
        var pic_height = pic.height;

        var x = ( c_width - pic_width ) / 3;
        cxt.drawImage( pic.src, x, 220, pic_width, pic_height );
    }

    //开始动画
    var loadingClock = setInterval( refresh, 1 );

    var player = this.player = {};
    player.x;
    player.y;
    player.lastX;
    player.lastY;
    player.bomb = 0;
    player.status = true;
    player.model = flyimages[ "me" ];
    player.model2 = flyimages[ "me_2" ];
    player.width = c_width / 375 * player.model.width;
    player.height = player.width / player.model.width * player.model.height;
    player.move = function( x, y ) {
        player.lastX = player.x;
        player.lastY = player.y;
        player.x = x - player.width / 2;
        player.y = y - player.height / 2;
        player.x = player.x > c_width - player.width ? c_width - player.width : player.x;
        player.x = player.x < 0 ? 0 : player.x;
        player.y = player.y > c_height - player.height ? c_height - player.height : player.y;
        player.y = player.y < 0 ? 0 : player.y;
    }
    player.moveing = function() {
        if( !player.status ) {
            return;
        }

        cxt.drawImage( game.time % 30 > 15 ? player.model.src : player.model2.src, player.x, player.y, player.width, player.height );
        player.attacking();
    }
    player.cartridges = [];
    player.attackTime = 0;
    player.attackPower = false;
    player.attack = function() {
        if( !player.status ) {
            return;
        }

        player.attackTime++;
        if( ( player.attackTime * game.refreshInterval ) % ( game.refreshInterval * 20 ) != 0 ) {
            return;
        }

        player.attackTime = 0;
        //playAudio( "fire_bullet.mp3" );
        var cartridges;
        if( player.attackPower ) {
            cartridges = [ ( new cartridge( player.x - ( player.width / 5 ), player.y, 2, player ) ), ( new cartridge( player.x + ( player.width / 5 ), player.y, 2, player ) ) ];
        } else {
            cartridges = [ ( new cartridge( player.x, player.y, 1, player ) ) ];
        }
        Array.prototype.push.apply( player.cartridges, cartridges );
    }
    player.attacking = function() {
        player.attack();
        var cartridgeSpeed = config.cartridgeSpeed;
        var cartridges_length = player.cartridges.length;
        firstloop: for( var i = cartridges_length;i--; ) {
            var cartridge = player.cartridges[ i ];
            cxt.drawImage( cartridge.model.src, cartridge.x, cartridge.y, cartridge.width, cartridge.height );
            if( cartridge.y <= 0 ) {
                player.cartridges.splice( i, 1 );
                continue firstloop;
            }

            var plain_length = game.plains.length;
            secondloop: for( var j = plain_length;j--; ) {
                var plain = game.plains[ j ];
                var X = cartridge.x;
                var Y = cartridge.y;
                var nextY = Y - cartridgeSpeed;
                if(
                    X > plain.x
                    && X < ( plain.x + plain.width )
                    && nextY < ( plain.y + plain.height + plain.speed )
                    && Y >= ( plain.y + plain.height )
                ) {
                    plain.byAttack();
                    player.cartridges.splice( i, 1 );
                    continue firstloop;
                }
            }

            cartridge.y = cartridge.y - cartridgeSpeed;  //子弹向上移动
        }
    }
    player.useBomb = function() {
        if( game.player.bomb <= 0 ) {
            return;
        }
        game.player.bomb--;
        //playAudio( "use_bomb.mp3" );
        var plains_length = game.plains.length;
        for( var i = plains_length;i--; ) {
            var plain = game.plains[ i ];
            plain.die();
        }
    }
    player.die = function() {
        if( !player.status ) {
            return;
        }

        player.status = false;
        //playAudio( "game_over.mp3" );
        var dieSpeed = 20;
        var x = player.x;
        var y = player.y;
        var h = player.height;
        var w = player.width;

        game.plainsDies.push(( new playerDie() ) );

        function playerDie() {
            var dieTime = 4 * dieSpeed;
            this.animationTime = 4 * dieSpeed;

            this.call = function() {
                if( this.animationTime == 1 ) {
                    game.over();
                }
                var dieModel = flyimages[ "me_die" + ( parseInt(( dieTime - this.animationTime ) / dieSpeed ) + 1 ) + "" ];
                cxt.drawImage( dieModel.src, x, y, w, h );
                this.animationTime--;
            }
        }
    }

    var game = this.game = {};
    game.fire = this.__proto__.fire;
    game.score = 0;
    game.time = 0;
    game.player = player;
    game.bgImg = flyimages[ "bg" ];
    game.refreshInterval = config.gameSpeed;
    game.refresh = function() {
        game.time++;
        game.bgScroll();
        game.plainsScroll();
        game.plainsDying();
        game.player.moveing();
        game.propShow();
        game.refreshMessage();
        wx.drawCanvas( {
            canvasId: id,
            actions: cxt.getActions()
        })
    }
    game.bgScrollTime = 0;
    game.bgScroll = function() {
        var bg_img_height = game.bgImg.height;
        var bg_img_width = game.bgImg.width;
        game.bgScrollTime += 0.5;
        if( game.bgScrollTime > bg_img_height ) {
            game.bgScrollTime = 0;
        }
        cxt.drawImage( game.bgImg.src, 0, game.bgScrollTime - bg_img_height, bg_img_width, bg_img_height );
        cxt.drawImage( game.bgImg.src, 0, game.bgScrollTime, bg_img_width, bg_img_height );
    }
    game.props = [];
    game.addProp = function() {
        var interval = 10;
        if( ( game.time * game.refreshInterval ) % ( interval * 1000 ) == 0 ) {
            game.props.push(( new prop( parseInt( Math.random() * 1.8 + 1.1 ) ) ) );
            //playAudio( "show_prop.mp3" );
        }
    }
    game.propShow = function() {
        game.addProp();
        var props_length = game.props.length;
        for( var i = props_length;i--; ) {
            var prop = game.props[ i ];
            if( prop.isDeleted == true ) {
                game.props.splice( i, 1 );
                continue;
            }

            prop[ prop.status ]();

            if( prop.y > c_height ) {
                game.props.splice( i, 1 );
                continue;
            }
        }
    }
    game.plains = [];
    game.plainsNum = 0;
    game.addPlain = function() {
        if( game.time % 60 != 0 ) {
            return;
        }

        if( game.plainsNum == 26 ) {
            game.plainsNum = 0;
        }

        game.plainsNum++;
        switch( true ) {
            case game.plainsNum % 13 == 0:
                game.plains.push( new plain( 3 ) );
                break;
            case game.plainsNum % 6 == 0:
                game.plains.push( new plain( 2 ) );
                break;
            default:
                game.plains.push( new plain( 1 ) );
                break;
        }

    }
    game.plainsScroll = function() {
        game.addPlain();
        var removePlain = [];
        var plains_length = game.plains.length;
        for( var i = plains_length;i--; ) {
            var plain = game.plains[ i ];
            if( plain.y > c_height || plain.status == false ) {
                game.plains.splice( i, 1 );
                continue;
            }

            plain.show();

            if( isCollide( plain ) ) {
                game.player.die();
            }

            plain.y = plain.y + plain.speed;
        }

        //判断是否和玩家的飞机碰撞
        function isCollide( plain ) {
            var plainTopLeft = [ plain.x, plain.y ];
            var plainBottomRight = [ plain.x + plain.width, plain.y + plain.height ];
            var meTopLeft = [ game.player.x + game.player.width / 3, game.player.y ];
            var meBottomRight = [ game.player.x + ( game.player.width * 2 / 3 ), game.player.y + ( game.player.height * 2 / 3 ) ];

            var collideTopLeft = [ Math.max( plainTopLeft[ 0 ], meTopLeft[ 0 ] ), Math.max( plainTopLeft[ 1 ], meTopLeft[ 1 ] ) ];
            var collideBottomRight = [ Math.min( plainBottomRight[ 0 ], meBottomRight[ 0 ] ), Math.min( plainBottomRight[ 1 ], meBottomRight[ 1 ] ) ];

            if( collideTopLeft[ 0 ] < collideBottomRight[ 0 ] && collideTopLeft[ 1 ] < collideBottomRight[ 1 ] ) {
                return true;
            }

            return false;
        }
    }
    game.plainsDies = [];
    game.plainsDying = function() {
        var plainsDies_length = game.plainsDies.length;
        for( var i = plainsDies_length;i--; ) {
            var plainDie = game.plainsDies[ i ];
            if( plainDie.animationTime == 0 ) {
                game.plainsDies.splice( i, 1 );
                continue;
            }
            plainDie.call();
        }
    }
    game.over = function() {
        //game.music.pause();
        clearInterval( game.clock );
        game.fire( 'over', { score: game.score });
    }
    game.clear = function() {
        game.player.x = ( c_width - game.player.width ) / 2;
        game.player.y = c_height - game.player.height;

        game.plains = [];
        game.plainsDies = [];
        game.plainsNum = 0;
        game.time = 0;
        game.bgScrollTime = 0;
        game.score = 0;
        game.player.status = true;
        game.player.bomb = 0;
        game.player.attackPower = false;
        clearTimeout( game.player.attackPowerClock );
    }
    //game.music = creatAudio( "game_music.mp3" );
    game.start = function() {
        // game.music.currentTime = 0;
        // game.music.loop = true;
        // game.music.play();

        game.clear();
        game.clock = setInterval( function() {
            game.refresh();
        }, game.refreshInterval );
    }
    game.refreshMessage = function() {
        cxt.fillText( game.score, 20, 44 );

        if( game.player.bomb > 0 ) {
            var bombModel = flyimages[ "bomb" ];
            cxt.drawImage( bombModel.src, 10, c_height - bombModel.height - 10, bombModel.width, bombModel.height );
            cxt.fillText( game.player.bomb, 20 + bombModel.width, c_height - bombModel.height + 28 );
        }
    }

    function prop( type ) {
        this.type = type;
        this.status = "show";
        this.isDeleted = false;
        this.modelImg;
        this.getSound;
        switch( type ) {
            case 1:
                this.modelImg = "prop1";
                this.getSound = "get_bomb.mp3";
                break;
            case 2:
                this.modelImg = "prop2";
                this.getSound = "get_double_laser.mp3";
                break;
        }
        this.model = flyimages[ this.modelImg ];
        this.width = c_width / 375 * this.model.width;
        this.height = this.model.height / this.model.width * this.width;
        this.x = Math.random() * ( c_width - this.width );
        this.y = -this.height;

        var speed = this.speed = 6;
        var animateTime = this.animateTime = 70;
        this.showType = "down";
        this.show = function() {
            if( this.animateTime <= animateTime / 2 ) {
                this.showType = "up";
            }
            cxt.drawImage( this.model.src, this.x, this.y, this.width, this.height );
            if( isGain( this ) ) {
                this.isDeleted = true;
                this.byGain();
                return;
            }
            var move = ( ( c_height + this.height ) / 3 ) / ( animateTime / 2 );
            this.speed = move;
            if( this.showType == "down" ) {
                this.y += move;
            } else {
                this.y -= move;
            }
            this.animateTime--;
            if( this.animateTime <= 0 ) {
                this.speed = speed;
                this.status = "move";
            }
        }
        this.move = function() {
            this.y += this.speed;
            cxt.drawImage( this.model.src, this.x, this.y, this.width, this.height );
            if( isGain( this ) ) {
                this.isDeleted = true;
                this.byGain();
                return;
            }
        }

        this.byGain = function() {
            switch( this.type ) {
                case 1:
                    game.player.bomb++;
                    break;
                case 2:
                    game.player.attackPower = true;
                    game.player.attackPowerClock = setTimeout( function() {
                        game.player.attackPower = false;
                    }, 15000 );
                    break;
            }
            //playAudio( this.getSound );
        }

        //判断有没有吃到道具
        var isGain = function( prop ) {
            var leftX = prop.x;
            var rightX = prop.x + prop.width;
            if( rightX < game.player.x || leftX > ( game.player.x + game.player.width ) ) {
                return false;
            }
            var removing = prop.status == "move" ? prop.speed : ( prop.showType == "down" ? prop.speed : -prop.speed );
            var nextY = prop.y + removing;
            if( ( ( prop.y + prop.height ) > game.player.y || ( nextY + prop.height ) < game.player.y ) && game.player.lastY > ( prop.y + prop.height ) ) {
                return false;
            }
            return true;
        }
    }

    function plain( type ) {
        this.type = type;
        this.hp;  //飞机生命值
        this.height;
        this.width;
        this.maxSpeed;
        this.dieTime;
        this.status = true;  //飞机死了没
        var dieSpeed = 20;  //死亡动画播放速度

        switch( type ) {
            case 1:
                this.hp = 1;
                this.score = 1000;
                this.maxSpeed = 5;
                this.dieTime = dieSpeed * 3;
                break;
            case 2:
                this.hp = 8;
                this.score = 8000;
                this.maxSpeed = 2;
                this.dieTime = dieSpeed * 4;
                break;
            case 3:
                this.hp = 18;
                this.score = 30000;
                this.maxSpeed = 1;
                this.dieTime = dieSpeed * 6;
                break;
        }

        this.dieSound = "plain" + this.type + "_die.mp3";
        this.modelimg = "plain" + this.type + "";
        this.model = flyimages[ this.modelimg ];

        if( this.type == 3 ) {
            this.modelimg2 = "plain3_2";
            this.model2 = flyimages[ this.modelimg2 ];
        }

        this.width = c_width / 375 * this.model.width;
        this.height = this.width / this.model.width * this.model.height;

        this.x = Math.random() * ( c_width - this.width );
        this.y = -( this.height );

        var maxSpeed = game.time / 1000 > 10 ? 10 : game.time / 1000;
        this.speed = Math.random() * ( maxSpeed - 1 ) + 1;
        this.speed = this.speed < 0.5 ? Math.random() * 0.5 + 0.5 : this.speed;
        this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed;

        this.show = function() {
            if( this.type == 3 ) {
                cxt.drawImage( game.time % 30 > 15 ? this.model.src : this.model2.src, this.x, this.y, this.width, this.height );
                return;
            }
            cxt.drawImage( this.model.src, this.x, this.y, this.width, this.height );
        }

        this.die = function() {
            var plainType = this.type;
            var plainX = this.x;
            var plainY = this.y;
            var plainW = this.width;
            var plainH = this.height;

            game.plainsDies.push(( new die( this.dieTime ) ) );

            game.score += this.score;
            this.status = false;

            function die( dieTime ) {
                var dieTime = dieTime;
                this.animationTime = dieTime;

                this.call = function() {
                    if( this.animationTime <= 0 ) {
                        return;
                    }
                    var dieModel = flyimages[ "plain" + plainType + "_die" + ( parseInt(( dieTime - this.animationTime ) / dieSpeed ) + 1 ) + "" ];
                    cxt.drawImage( dieModel.src, plainX, plainY, plainW, plainH );
                    this.animationTime--;
                }
            }
        }

        var hp = this.hp;
        this.byAttack = function() {
            this.hp--;
            if( this.hp <= 0 ) {
                this.die();
                //playAudio( this.dieSound );
                return;
            }

            if( this.hp <= hp / 3 ) {
                this.model = flyimages[ "plain" + this.type + "_hurt" ];
            }
        }
    }

    function cartridge( x, y, type, player ) {
        this.model = flyimages[ type == 2 ? "cartridge_power" : "cartridge" ];

        this.width = c_width / 375 * this.model.width;
        this.height = this.width / this.model.width * this.model.height;
        this.x = x + ( player.width - this.width ) / 2;
        this.y = y - this.height;
    }
}

flyGame.prototype.startGame = function() {
    this.game.start();
}

flyGame.prototype.touchmove = function( x, y ) {
    this.game.player.move( x, y );
}

flyGame.prototype.touchclick = function() {
    this.game.player.useBomb();
}

emitter.setup( flyGame.prototype );

module.exports = flyGame;
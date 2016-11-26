const emitter = require('../utils/emitter.js');

function wxBird(opts) {
    var ctx = this.ctx = opts.ctx;
    var id = this.id = opts.id
    var cwidth = this.cwidth = opts.width;
    var cheight = this.cheight = opts.height;
    var objects = this.objects = [];
    var birdIndex = this.birdIndex = 0;
    var ver1 = this.ver1 = 10;
    var ver2 = this.ver2;
    var gravity = this.gravity = 2;
    var pipe_height = this.pipe_height = 200;
    var velocity = this.velocity = 10;
    var drawTimer = this.drawTimer = 0;
    var score = this.score = 0;
    var isScore = this.isScore = false;

    var birds = this.birds = ["../../images/0.gif", "../../images/1.gif", "../../images/2.gif"];

    var back = this.back = new Background(ctx, 0, 0, 400, 600, "../../images/bg.png");
    var up_pipe = this.up_pipe = new UpPipe(ctx, 0, 0, 100, 200, "../../images/pipe.png");
    var down_pipe = this.down_pipe = new DownPipe(ctx, 0, 400, 100, 200, "../../images/pipe.png");
    var ground = this.ground = new Background(ctx, 0, 550, 400, 200, "../../images/ground.png");
    var bird = this.bird = new Bird(ctx, 80, 300, 40, 40, birds);

    objects.push(back);
    objects.push(up_pipe);
    objects.push(down_pipe);
    objects.push(ground);
    objects.push(bird);

    function UpPipe(ctx, x, y, width, height, img_src) {
        this.ctx = ctx;
        this.px = x;
        this.py = y;
        this.pwidth = width;
        this.pheight = height;
        this.img_src = img_src;
        this.draw = drawUpPipe;
    }

    function drawUpPipe() {
        this.ctx.drawImage(this.img_src, 150, 500, 150, 800, this.px, this.py, this.pwidth, this.pheight);
    }

    function DownPipe(ctx, x, y, width, height, img_src) {
        this.ctx = ctx;
        this.px = x;
        this.py = y;
        this.pwidth = width;
        this.pheight = height;
        this.img_src = img_src;
        this.draw = drawDownPipe;
    }

    function drawDownPipe() {
        this.ctx.drawImage(this.img_src, 0, 500, 150, 500, this.px, this.py, this.pwidth, this.pheight);
    }

    function Background(ctx, x, y, width, height, img_src) {
        this.ctx = ctx;
        this.bgx = x;
        this.bgy = y;
        this.bgwidth = width;
        this.bgheight = height;
        this.img_src = img_src;
        this.draw = drawbg;
    }

    function drawbg() {
        this.ctx.drawImage(this.img_src, this.bgx, this.bgy, this.bgwidth, this.bgheight);
    }

    function Bird(ctx, x, y, width, height, img_srcs) {
        this.ctx = ctx;
        this.bx = x;
        this.by = y;
        this.bwidth = width;
        this.bheight = height;
        this.imgs = img_srcs;
        this.draw = drawbird;
    }

    function drawbird() {
        birdIndex++;
        this.img_src = this.imgs[birdIndex % 3];
        this.ctx.drawImage(this.img_src, this.bx, this.by, this.bwidth, this.bheight);
    }
}

wxBird.prototype.calculator = function () {
    if (this.bird.by + this.bird.bheight > this.ground.bgy ||
        ((this.bird.bx + this.bird.bwidth > this.up_pipe.px) && (this.bird.by > this.up_pipe.py) && (this.bird.bx + this.bird.bwidth < this.up_pipe.px + this.up_pipe.pwidth) && (this.bird.by < this.up_pipe.py + this.up_pipe.pheight)) ||
        ((this.bird.bx + this.bird.bwidth > this.up_pipe.px) && (this.bird.by > this.up_pipe.py) && (this.bird.bx + this.bird.bwidth < this.up_pipe.px + this.up_pipe.pwidth) && (this.bird.by < this.up_pipe.py + this.up_pipe.pheight)) ||
        ((this.bird.bx > this.down_pipe.px) && (this.bird.by > this.down_pipe.py) && (this.bird.bx < this.down_pipe.px + this.down_pipe.pwidth) && (this.bird.by < this.down_pipe.py + this.down_pipe.pheight)) ||
        ((this.bird.bx > this.down_pipe.px) && (this.bird.by + this.bird.bheight > this.down_pipe.py) && (this.bird.bx < this.down_pipe.px + this.down_pipe.pwidth) && (this.bird.by + this.bird.bheight < this.down_pipe.py + this.down_pipe.pheight))) {
        this.stoped = true;
        clearTimeout(this.drawTimer)
        this.ctx.setFillStyle("rgb(255,255,255)");
        this.ctx.setFontSize(30);
        this.ctx.fillText("您挂了,得分：" + this.score + "!", 90, 100)
        this.fire('over', { score: this.score });
        return;
    }

    this.ver2 = this.ver1 + this.gravity;
    this.bird.by += (this.ver2 + this.ver1) * 0.5;

    if (this.up_pipe.px + this.up_pipe.pwidth > 0) {
        this.up_pipe.px -= this.velocity;
        this.down_pipe.px -= this.velocity;
    } else {
        this.up_pipe.px = 400;
        this.down_pipe.px = 400;
        this.up_pipe.pheight = 100 + Math.random() * 200;
        this.down_pipe.py = this.up_pipe.pheight + this.pipe_height;
        this.down_pipe.pheight = 600 - this.down_pipe.py;
        this.isScore = true;
    }

    if (this.isScore && this.bird.bx > this.up_pipe.px + this.up_pipe.pwidth) {
        this.score += 1;
        this.isScore = false;
        if (this.score > 0 && this.score % 10 === 0) {
            this.velocity++;
        }
    }

    this.ctx.setFillStyle("rgb(255,255,255)");
    this.ctx.setFontSize(30);
    if (this.score > 0) {
        this.score % 10 !== 0 ? this.ctx.fillText(this.score, 180, 100) : this.ctx.fillText("非常棒!" + this.score, 120, 100);
    }
}

wxBird.prototype.drawall = function () {
    if (this.stoped) return
    this.ctx.clearRect(0, 0, this.cwidth, this.cheight);
    var i;
    for (i = 0; i < this.objects.length; i++) {
        this.objects[i].draw();
    }
    this.calculator();

    wx.drawCanvas({
        canvasId: this.id,
        actions: this.ctx.getActions()
    })
    this.drawTimer = setTimeout(() => {
        this.drawall()
    }, 80)
}

wxBird.prototype.startGame = function () {
    this.stoped = false;
    this.ver1 = 10;
    this.gravity = 2;
    this.pipe_height = 200;
    this.velocity = 10;
    this.score = 0;
    this.isScore = false;

    this.bird.by = 300;
    this.up_pipe.px = 0;
    this.up_pipe.pheight = 200;
    this.down_pipe.px = 0;
    this.down_pipe.py = 400;
    this.down_pipe.pheight = 200;

    this.drawall();
}

wxBird.prototype.keyup = function () {
    this.bird.by -= 80;
    if (this.bird.by < 0)
        this.bird.by = 0
}

emitter.setup(wxBird.prototype);

module.exports = wxBird;
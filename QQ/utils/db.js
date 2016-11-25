
var users =   {
    '1' :{
        userName:'邓爷爷',
        head    : 'http://img1.imgtn.bdimg.com/it/u=1127030409,1818611854&fm=21&gp=0.jpg',
        userId  : '1'
    },
    '2' :{
        userName:'毛爷爷',
        head    : 'http://img1.imgtn.bdimg.com/it/u=2722982423,2495037252&fm=21&gp=0.jpg',
        userId  : '2'
    },
    '3' :{
        userName:'温爷爷',
        head    : 'http://img4.imgtn.bdimg.com/it/u=853691368,433891158&fm=21&gp=0.jpg',
        userId  : '3'
    },
    '4' :{
        userName:'胡大大',
        head    : 'http://img3.imgtn.bdimg.com/it/u=2023820346,972301587&fm=21&gp=0.jpg',
        userId  : '4'
    },
    '5' :{
        userName:'李大大',
        head    : 'http://p3.img.cctvpic.com/nettv/politics/leaders/20120418/images/110956_1334749475347.jpg',
        userId  : '5'
    },
    '6' :{
        userName:'习大大',
        head    : 'http://img2.imgtn.bdimg.com/it/u=1909260454,3622143518&fm=21&gp=0.jpg',
        userId  : '6'
    },
    '7' :{
        userName:'张三',
        head    : 'http://img2.imgtn.bdimg.com/it/u=171297155,1064802477&fm=21&gp=0.jpg',
        userId  : '7'
    },
    '8' :{
        userName:'陈七',
        head    : 'http://p3.gexing.com/G1/M00/F6/12/rBACFFMIULqToQbCAADaP1I_vbc109_200x200_3.png?recache=20131108',
        userId  : '8'
    },
    '9' :{
        userName:'王二',
        head    : 'http://img0.imgtn.bdimg.com/it/u=2438790241,2118395745&fm=21&gp=0.jpg',
        userId  : '9'
    },
    '10':{
        userName:'赵六',
        head    : 'http://p3.gexing.com/G1/M00/1F/66/rBACE1QmgMDzOHHzAADSFmNnm1I752_200x200_3.png?recache=20131108',
        userId  : '10'
    },
    '11':{
        userName:'董小姐',
        head    : 'http://img0.imgtn.bdimg.com/it/u=3492605483,1500445679&fm=21&gp=0.jpg',
        userId  : '11'
    },
    '12':{
        userName:'董小姐男友',
        head    : 'http://www.ipb.cc/uploads/allimg/c150225/1424U494N9450-124492.jpg',
        userId  : '12'
    },
    '13':{
        userName:'赵二六',
        head    : 'http://img3.imgtn.bdimg.com/it/u=2358266527,793576346&fm=21&gp=0.jpg',
        userId  : '13'
    }
}

//模拟本地数据库 用户表操作
var db = {
    findUserById : function(id){
        return users[id];
    },
    addUser      : function(user){
        users[user.userId] = user;
    },
    updateUser   : function(user){
        var temp = users[user.userId];
        if(typeof temp != 'undefined'){
            for(var key in user){ temp[key] = user[key]; }
            users[user.userId] = temp;
        }
    }
};
module.exports = db;

//app.js
App({

  // 全局数据对象(整个应用程序共享)

  globalData:{
    userInfo:null,
    collectionMsg: [],
    req: [{
      "content":"女生分手的原因有两个， 一个是：闺蜜看不上。另一个是：闺蜜看上了。",
      "hashId":"607ce18b4bed0d7b0012b66ed201fb08",
      "unixtime":1418815439,
      "updatetime":"2014-12-17 19:23:59",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"谁动了我的冰箱！",
      "hashId":"DDE51B6C09E1557D6542627755901308",
      "unixtime":1418967626,
      "updatetime":"2014-12-19 13:40:26",
      "url":"http://img.juhe.cn/joke/201412/19/DDE51B6C09E1557D6542627755901308.gif",
      "zan": 99,
      "iszen": true,
      "cai": 22
    },
    {
      "content":"老师讲完课后，问道 “同学们，你们还有什么问题要问吗？” 这时，班上一男同学举手， “老师，这节什么课？”",
      "hashId":"20670bc096a2448b5d78c66746c930b6",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"“老公，结婚前你不是常对我说，我是你的女神吗？” “老婆，现在你总该看出来，自从结婚后，我成了一个无神论者。”",
      "hashId":"1a0b402983f22b7ad6ff38787e238f6d",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"昨天下班坐公交车回家，白天上班坐着坐多了想站一会儿， 就把座位让给了一个阿姨，阿姨道谢一番开始和我聊天，聊了挺多的。 后来我要下车了，阿姨热情的和我道别。 下车的一瞬间我回头看了一眼，只见那阿姨对着手机说：“儿子， 刚才遇见一个姑娘特不错，可惜长得不好看，不然我肯定帮你要号码！” 靠，阿姨你下车，我保证不打死你！",
      "hashId":"d4d750debbb73ced161066368348d611",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"这鱼我怎么抓不到？",
      "hashId":"B0C3ABBEBBE0A6EA5B8FE04E27215FBC",
      "unixtime":1418965236,
      "updatetime":"2014-12-19 13:00:36",
      "url":"http://img.juhe.cn/joke/201412/19/B0C3ABBEBBE0A6EA5B8FE04E27215FBC.gif",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"小时候妈妈喂我饭之前会看书，我问她看的什么时。 妈妈总是笑着告诉我：“是《育儿经验宝典》啊！” 我很感动，直到我认识字才发现，妈妈看的是《猪崽饲养手册》。",
      "hashId":"d6161d9d7b113a920e7b33b25c3b5f0b",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"期末考试了，送各位学生党一张图",
      "hashId":"B9EBF01A3C718DABB4C166356CC839A8",
      "unixtime":1418964026,
      "updatetime":"2014-12-19 12:40:26",
      "url":"http://img.juhe.cn/joke/201412/19/B9EBF01A3C718DABB4C166356CC839A8.jpg",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"刚刚在舞蹈学校外接儿子，听到两个已经接到孩子到妈妈在聊天。 妈妈甲：“你闺女这么小就是个美人胚子，大眼睛，双眼皮，瓜子脸。” 妈妈乙：“是啊，长大了不知道要祸害多少男孩！”",
      "hashId":"6a6313c771b5bbc5b5688a926dcc836e",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"和室友说我约了一个女孩过夜， 临出门室友提醒我：“要采取安全措施啊，保护好自己，你要没有我借你。” “不用不用，我自己有。”说完我马上打开抽屉，翻出一把刀带着出门了。",
      "hashId":"7d877e3ba86819a523175656e97b9cdf",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"云雨过后，男友抱着我说“想想咱俩还真是有缘”　　“可不是吗，咋俩小学同校，初中同班，高中同桌，大学同寝”",
      "hashId":"62287B57ED97B8A06861ADA51D921CEB",
      "unixtime":1418962826,
      "updatetime":"2014-12-19 12:20:26",
      "url":"http://img.juhe.cn/joke/201412/19/62287B57ED97B8A06861ADA51D921CEB.jpg",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"自从有了这个装置，妈妈再也不担心我的起床了！",
      "hashId":"E005FFD7C7A9C80F1C0E8EEF3F44DB71",
      "unixtime":1418961624,
      "updatetime":"2014-12-19 12:00:24",
      "url":"http://img.juhe.cn/joke/201412/19/E005FFD7C7A9C80F1C0E8EEF3F44DB71.gif",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"那些神馬有錢任性的都弱爆了，前幾天在銀行辦理業務，一哥們走到櫃檯，哥們：“給我取30萬，謝謝！”一會兒工作人員就說：“先生，對不起！卡上餘額不足。”只見這哥們悠悠衝懷裡掏出手槍：“沒辦法有槍就是任性！！”我想說哥們你搶劫就搶劫，裝神馬B！",
      "hashId":"E3070767518CB4DFEA708DCCC332EE2F",
      "unixtime":1418960433,
      "updatetime":"2014-12-19 11:40:33",
      "url":"http://img.juhe.cn/joke/201412/19/E3070767518CB4DFEA708DCCC332EE2F.jpg",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"妹纸你想多了吧。",
      "hashId":"334E065AEF92B5C7ACB1CDD332DE5A59",
      "unixtime":1418956854,
      "updatetime":"2014-12-19 10:40:54",
      "url":"http://img.juhe.cn/joke/201412/19/334E065AEF92B5C7ACB1CDD332DE5A59.gif",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"班里一女生对小明说，如果这次考试你在班里能考第一的话，我就同意做你女朋友。考试那天，班里所有同学都把笔往桌上一放，俨然一副交白卷的节奏。多么感人的一幕啊…… 小明一看，直接哭了，然后伴着泪水把试卷吃了。",
      "hashId":"3C77F1A6A8B66083206E44EABDAE7BB6",
      "unixtime":1418955707,
      "updatetime":"2014-12-19 10:21:47",
      "url":"http://img.juhe.cn/joke/201412/19/3C77F1A6A8B66083206E44EABDAE7BB6.png",
      "zan": 99,
      "cai": 22
    },    
    {
      "content":"“科学研究发现，睡眠不足会带来许多身心伤害：免疫力下降、 记忆力减弱、易衰老、失去平衡等等，从而引发多种疾病。 从科学角度讲，睡懒觉有助于身心健康。” “所以，李老师，这就是你在课堂上睡觉的原因？”校长生气的问我。",
      "hashId":"cb01359d7740e19435b9ea4e2d5516a1",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"最假的碰瓷",
      "hashId":"61B105FCECFD537CA6249CEB71168C17",
      "unixtime":1418954054,
      "updatetime":"2014-12-19 09:54:14",
      "url":"http://img.juhe.cn/joke/201412/19/61B105FCECFD537CA6249CEB71168C17.gif",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"你跟这棵树有仇吗",
      "hashId":"02E745D0EDF038C01CA320C3E2FC3780",
      "unixtime":1418954054,
      "updatetime":"2014-12-19 09:54:14",
      "url":"http://img.juhe.cn/joke/201412/19/02E745D0EDF038C01CA320C3E2FC3780.gif",
      "zan": 99,
      "cai": 22
    },    
    {
      "content":"做饭的时候发现没食用油了， 就叫五岁的儿子“娃儿，去楼下小商店买壶油，顺便买点姜回来。别搞忘了。” 儿子答应，边出门边念叨“油，姜，油，姜，油，姜，油…………” 果然，回来带了瓶酱油……",
      "hashId":"473a3a81c621e03afadf453c23c989b5",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    },
    {
      "content":"我妈研究了几个新菜，邀请我品尝， 结果我没有给她一个yes，被臭骂了一顿， 要和我断绝关系。找我爸评理， 老头说为了公平起见，我还是尝尝菜吧。 吃完后，老头幽幽的说道，你和我也断绝关系吧。",
      "hashId":"8251a1ff78568624730f3d6ae8de7c6f",
      "unixtime":1418814837,
      "updatetime":"2014-12-17 19:13:57",
      "zan": 99,
      "cai": 22
    }]
  },
  // 应用程序全局方法
  fetchApi (api_url, callback) {

    wx.request({
      url: api_url,
      data: {},
      header: { 'Content-Type': 'application/json' },
      success (res) {
        callback(null, res.data)
      },
      fail (e) {
        callback(e)
      }
    })

  },

  getClt: function (cb) {
    var that = this
    typeof cb == "function" && cb(that.globalData.collectionMsg)
  },

  setClt: function (cb){
    var that = this
    var list = that.globalData.collectionMsg;
    list.push(cb)
    that.globalData.collectionMsg = list;
  },

  addReq: function(cd,add){

    var that = this
    var list = that.globalData.req

    if (add=='add') {
      list.unshift(cd)
      this.globalData.req = list
    }else{
      typeof cd == 'function' && cd(that.globalData.req)
    }

    console.log(that.globalData.req)

  },


  // 生命周期方法

  onLaunch: function () {
    // 应用程序启动时触发一次
    console.log('App Launch')
  },

  onShow: function () {
    // 当应用程序进入前台显示状态时触发
    console.log('App Show')
  },

  onHide: function () {
    // 当应用程序进入后台状态时触发
    console.log('App Hide')
  }
})
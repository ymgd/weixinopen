var index = require("../../data/index-list.js")
var util = require("../../utils/util.js")
var comobj = require("../../obj/comobj.js")
var crypt = require("../../utils/crypt.js")
var api = require("../../utils/api.js")


//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    articles: [],
    pageIndex:1,
    pageSize:2,
    audioIcon:"http://i.pengxun.cn/content/images/voice/voiceplaying.png",
    typeList:[],
    currentTypeId:0,
    hot:0,
    scrollLeft:0,
    praised:{}, // 是否已经点赞
    showRecommend:{
      id:"",
      toUserId:null,// 回复评论用户
      commontId:null,// 回复评论ID
      toUserName:null,// 回复评论用户名称
    },
    emoij:{
      id:""
    },
    commentText:"",
    selectedImgs:[],
    currentMoreComment:null,
    headInfo:{
      "backMap":"http://i.pengxun.cn/images/bms1/050_app[1].jpg",
      "logoUrl":"http://i.pengxun.cn/upload/thumbnail/20150923/130874432266460890.jpg",
      "articleCount":23131,
      "clickCount":1231,
      "isSign":"true",
      "isConcern":"false"
    },
    categories:[{
        "Id" : 0,
        "Title" : "全部"
      },{
        "Id" : 3132,
        "Title" : "运营日报"
      },{
        "Id" : 875,
        "Title" : "操作指南"
      },{
        "Id" : 2038,
        "Title" : "常见问题"
      },{
        "Id" : 2033,
        "Title" : "微赞故事"
      },{
        "Id" : 1,
        "Title" : "更新进度"
      }]
    },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.init();

    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    // this.ready();
  },

  /**
   * 初始化
   */
  init:function(){
    this.showHeadInfo();
    this.getartlistbyminisnsid(1, 0, 1);
  },

  more_bankuai: function () {
    console.log ("获取更多版块");
  },
  // 加载数据
  ready: function () {
    this.setData({
      articles:index.articles.slice(0,10),
      typeList:index.typeList
    })
  },
  /**
   * 下拉刷新
   
  nextPage: function (event) {
    console.log ("moreArticle: 加载更多");
    console.log("moreArticle: pageIndex: " + event.currentTarget.dataset.pageIndex);
    wx.showNavigationBarLoading();
    var that = this;
    var minisId = wx.getStorageSync('minisns').id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.request({
      url: 'https://xiuxun.top/wx/app/minisnsapp/getartlistbyminisnsid',
      data: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": that.data.currentTypeId, "pageIndex":that.data.pageIndex},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          console.log("下拉刷新成功");
          var articles = [];
          if (that.data.pageIndex <= 1) {
              articles = res.data.objArray; // 更新数据
          } else {
              articles = that.data.articles.concat(res.data.objArray);
          }
          that.setData({articles:articles,pageIndex:that.data.pageIndex+1});
          wx.hideNavigationBarLoading();
      }
    })  
  },
  */
  nextPage: function(e) {
    console.log ("moreArticle: 加载更多");
    console.log("moreArticle: pageIndex: " + e.currentTarget.dataset.pageIndex);
    wx.showNavigationBarLoading();
    var that = this;
    var minisId = wx.getStorageSync('minisns').Id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.uploadFile({
      url: 'http://apptest.vzan.com/minisnsapp/getartlistbyminisnsid',
      filePath: wx.getStorageSync('tmpFile'),
      name:'file',
      // header: {}, // 设置请求的 header
      formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": that.data.currentTypeId, "pageIndex":that.data.pageIndex}, // HTTP 请求中其他额外的 form data
      success: function(res){
          console.log("下拉刷新成功");
          var result = JSON.parse(res.data);
          var articles = [];
          if (that.data.pageIndex <= 1) {
              articles = result.objArray; // 更新数据
          } else {
              articles = that.data.articles.concat(result.objArray);
          }
          that.setData({articles:articles,pageIndex:that.data.pageIndex+1});
          wx.hideNavigationBarLoading();
      }
    })
  },


  /**
   * 点击版块跳转
   
  toBankuai: function (event) {
    var that = this;
    console.log("点击版块跳转");
    console.log(event);
    var typeId = event.currentTarget.dataset.typeid;
    var hot = event.currentTarget.dataset.hot;
    if (hot) {
      typeId = 0;
      hot = 1;
    } else {
      typeId= typeId;
      hot = 0;
    }
    console.log(this.data.currentTypeId);
    console.log(this.data.hot);
    that.setData({currentTypeId:typeId, hot:hot});
    // 获取articles
    var minisId = wx.getStorageSync('minisns').Id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.request({
      url: 'https://xiuxun.top/wx/app/minisnsapp/getartlistbyminisnsid',
      data: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": that.data.currentTypeId, "pageIndex":1},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          that.setData({articles:res.data.objArray});
      }
    })
  },
  */
  toBankuai: function (event) {
    var that = this;
    console.log("点击版块跳转");
    console.log(event);
    var typeId = event.currentTarget.dataset.typeid;
    var hot = event.currentTarget.dataset.hot;
    if (hot) {
      typeId = 0;
      hot = 1;
    } else {
      typeId= typeId;
      hot = 0;
    }
    console.log(this.data.currentTypeId);
    console.log(this.data.hot);
    that.setData({currentTypeId:typeId, hot:hot});
    // 获取articles
    var minisId = wx.getStorageSync('minisns').Id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.uploadFile({
      url: 'http://apptest.vzan.com/minisnsapp/getartlistbyminisnsid',
      filePath: wx.getStorageSync('tmpFile'),
      name:'file',
      // header: {}, // 设置请求的 header
      formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": that.data.currentTypeId, "pageIndex":1}, // HTTP 请求中其他额外的 form data
      success: function(res){
          var result =JSON.parse(res.data);
          that.setData({articles:result.objArray});
      },
    })
  },
  // 展开箭头 举报
  openArrow: function(event) {
    console.info("openArrow: ");
    var user = event.currentTarget.dataset.userId;
    console.log(user)
    wx.showActionSheet({
        itemList:["举报", "取消"],
        success: function(res) {
          if (res.tapIndex==0) {
            // 举报
            console.info("举报");
            util.tipOff(user);
          }
        }
    });
  },
  // 播放声音
  playAudio: function(event) {
    console.info ("播放声音");
    var voiceId = event.currentTarget.dataset.vId;
    console.info (voiceId);
    var storageVoice =  wx.getStorageSync('playingVoice');
    var audioContext = wx.createAudioContext(voiceId+"");
    // 获取正在播放的内容
    if (typeof storageVoice == "undefined" || storageVoice == "" || storageVoice == null) {
        // 当前未播放
        audioContext.play();
        storageVoice = new Object();
        storageVoice.id=voiceId;
        storageVoice.status=2;
      } else if(storageVoice.id == voiceId) {
        // 暂定状态
        if (storageVoice.status == 1) {
          audioContext.play();
          storageVoice.status=2;
        } else
        // 播放状态 - 转为暂停
        if (storageVoice.status == 2) {
            audioContext.pause();
            storageVoice.status=1;
        }
      } else {
        // 停止当前的，播放另一个
        var usingAudioContext = wx.createAudioContext(storageVoice.id+"")
        usingAudioContext.seek(0);
        usingAudioContext.pause();
        storageVoice = new Object();
        storageVoice.id = voiceId;
        storageVoice.status = 2;
        audioContext.play();
      }
      wx.setStorageSync('String', storageVoice);

  },
  /**
   * 更多版块
   */
  moreType: function(event) {
    var that = this;
    var categories = wx.getStorageSync('categories');
    if (typeof categories == "undefined") {
      return ;
    }
    var typeIds = [];
    var typeNames = [];
    for (var i = 0; i < categories.length; i++) {
      typeIds[i] = categories[i].Id;
      typeNames[i] = categories[i].Title;
    }
    wx.showActionSheet({
        itemList:typeNames,
        success:function(res){
          if (res.cancel) { console.log("取消");
          } else {
            // 获取新的内容
            var idx = res.tapIndex;
            var typeId = typeIds[idx];
            that.typeChange(typeId);
          }
        }
    })
  },
  /**
   * 切换版块
   * 
  typeChange: function(typeId) {
      var that = this;
      var tmp = wx.getStorageSync('categories');
      var typeList = tmp;
      for (var i=0 ; i<typeList.length ; i++) {
          if (typeList[i].Id == typeId) {
            var tmpType={ Id:typeId, Title:typeList[i].Title }
            typeList.splice(i,1);
            typeList.splice(0, 0, tmpType);
          }
      }
      // 获取新的数据
      var minisId = wx.getStorageSync('minisns').id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      wx.request({
        url: 'https://xiuxun.top/wx/app/minisnsapp/getartlistbyminisnsid',
        data: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": typeId, "pageIndex":1},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 headers
        success: function(res){
            that.setData({articles:res.data.objArray})
            that.setData({ currentTypeId : typeId, categories:typeList, scrollLeft:-900 })
        }
      })
  },
   */ 
  typeChange: function(typeId) {
      var that = this;
      var tmp = wx.getStorageSync('categories');
      var typeList = tmp;
      for (var i=0 ; i<typeList.length ; i++) {
          if (typeList[i].Id == typeId) {
            var tmpType={ Id:typeId, Title:typeList[i].Title }
            typeList.splice(i,1);
            typeList.splice(0, 0, tmpType);
          }
      }
      // 获取新的数据
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      wx.uploadFile({
        url: 'http://apptest.vzan.com/minisnsapp/getartlistbyminisnsid',
        filePath: wx.getStorageSync('tmpFile'),
        name:'file',
        // header: {}, // 设置请求的 header
        formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":1, "categoryId": typeId, "pageIndex":1}, // HTTP 请求中其他额外的 form data
        success: function(res){
            var result = JSON.parse(res.data);
            that.setData({articles:result.objArray})
            that.setData({ currentTypeId : typeId, categories:typeList, scrollLeft:-900 })
        }
      })
  },


  /**
   *  展示首页Head信息 
   * 
  showHeadInfo: function() {
    var that = this;
    var minisId = wx.getStorageSync('minisns').id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.request({
      url: 'https://xiuxun.top/wx/app/minisnsapp/getminisnsheadinfo',
      data: { "deviceType": verifyModel.deviceType, "uid": verifyModel.uid, "versionCode":verifyModel.versionCode,
      "timestamp": verifyModel.timestamp, "sign":verifyModel.sign, "id":minisId },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
          that.setData({
              headInfo:{"backMap":res.data.obj.BackMap, "logoUrl":res.data.obj.LogoUrl, "articleCount":res.data.obj.ArticleCount,
                  "clickCount":res.data.obj.ClickCount, "isSign":res.data.obj.IsSign, "isConcern":res.data.obj.IsConcern },
              categories:res.data.obj.Categories
          });
          wx.setStorageSync('categories', res.data.obj.Categories);
      }
    })  
  },
  */
  showHeadInfo: function() {
    var that = this;
    var minisId = wx.getStorageSync('minisns').Id;
    var unionid = wx.getStorageSync('user').unionid;
    var verifyModel = util.primaryLoginArgs(unionid);
    wx.uploadFile({
      url: 'http://apptest.vzan.com/minisnsapp/getminisnsheadinfo',
      filePath: wx.getStorageSync('tmpFile'),
      name:'file',
      // header: {}, // 设置请求的 header
      formData: {"deviceType": verifyModel.deviceType, "uid": verifyModel.uid, "versionCode":verifyModel.versionCode,
      "timestamp": verifyModel.timestamp, "sign":verifyModel.sign, "id":minisId }, // HTTP 请求中其他额外的 form data
      success: function(res){
          var result = JSON.parse(res.data);
          that.setData({
              headInfo:{"backMap":result.obj.BackMap, "logoUrl":result.obj.LogoUrl, "articleCount":result.obj.ArticleCount,
                  "clickCount":result.obj.ClickCount, "isSign":result.obj.IsSign, "isConcern":result.obj.IsConcern },
              categories:result.obj.Categories
          });
          wx.setStorageSync('categories', result.obj.Categories);
      }
    }) 
  },


  /**
   * 展示首页帖子
  
  getIndexArticles: function() {
      var that = this;
      data = { "deviceType": verifyModel.deviceType, "uid": verifyModel.uid, "versionCode":verifyModel.versionCode, "timestamp": verifyModel.timestamp,
          "sign":verifyModel.sign, "id":"3", "keyWord":null, pageIndex:that.pageIndex
      }
      api.articles(data, function(res){
          var that = this;
          var articles = [];
          for (var i = 0; i < res.objArray.length; i++) {
            var article = res.objArray[i]
            var rewardUsers = []; // 打赏用户列表
            var praiseUsers = []; // 点赞用户列表

            var comments = []; // 评论列表
            var images = [];

            // 打赏
            for (var r = 0; r < res.objArray[i].RewardUsers.length; r++) {
              var rewardUser = res.objArray[i].RewardUsers[r]
              rewardUsers.push({
                  "Id":rewardUser.Id,
                  "Headimgurl":rewardUser.Headimgurl,
                  "NickName":rewardUser.NickName
              });
            }

            // 点赞
            for (var p = 0; p < res.objArray[i].PraiseUsers.length; p++) {
              var praiseUser = res.objArray[i].PraiseUsers[p]
              praiseUsers.push({
                  "Id":praiseUser.Id,
                  "Headimgurl":praiseUser.Headimgurl,
                  "NickName":praiseUser.NickName
              });
            }

            // 评论
            for(var c = 0; c < res.objArray[i].articleComments.length; c++) {
                var commentImgs = []; // 评论图片列表
                var comment = res.objArray[i].articleComments[i];
                for (var ci = 0; c < res.objArray[i].articleComments[c].Images.length; ci++) {
                  var img = res.objArray[i].articleComments[c].Images[ci];
                  commentImgs.push({
                      "Thumbnail":img.Thumbnail,
                      "filepath":img.filepath
                  })
                }
                comments.push({
                  "Id": comment.Id,
                  "IsShowBest":comment.IsShowBest,
                  "CreateDate":comment.CreateDate,
                  "Content":comment.Content,
                  "ContentHtml":comment.ContentHtml,
                  "ComUser":{
                    "Id":comment.ComUser.Id,
                    "Headimgurl":comment.ComUser.Headimgurl,
                    "NickName":comment.ComUser.NickName,
                    "Level":comment.ComUser.Level
                  },
                  "DUser":{
                    "Id":comment.DUser.Id,
                    "Headimgurl":comment.DUser.Headimgurl,
                    "NickName":comment.DUser.NickName,
                    "Level":comment.DUser.Level
                  },
                  "Voice":{
                    "Id":comment.Voice.Id,
                    "DownLoadFile":comment.Voice.DownLoadFile,
                    "VoiceTime":comment.Voice.VoiceTime,
                    "TransFilePath":comment.Voice.TransFilePath,
                  },
                  "Images":commentImgs
                })
            }
            
            // 图片
            for (var im = 0; im < res.objArray[im].Images; im++) {
              var image = res.objArray[im].images[im];
              images.push({
                  "thumbnail":image.thumbnail,
                  "filepath":image.filepath
              })
            }

              articles.push({
                  "Id":article.Id,
                  "Title":article.Title,
                  "CreateDate":article.CreateDate,
                  "Click":article.Click,
                  "ContentDesc":article.ContentDesc,
                  "Content":article.Content,
                  "ContentDescAll":article.ContentDescAll,
                  "Address":article.Address,
                  "IsPraise":article.IsPraise,
                  "Praise":article.Praise,
                  "Reward":article.Reward,
                  "CommentCount":article.CommentCount,
                  "ShareCount":article.ShareCount,
                  "IsNew":article.IsNew,
                  "ArticleTypeID":article.ArticleTypeID,
                  "ArticleTypeName":article.ArticleTypeName,
                  "VideoList":article.VideoList,
                  "IsAdv":article.IsAdv,
                  "IsTop":article.IsTop,
                  "IsSubTop":article.IsSubTop,
                  "IsHot":article.IsHot,
                  "IsGuerdon":article.IsGuerdon,
                  "GuerdonMoney":article.GuerdonMoney,
                  "User":{
                      "Id":article.User.Id,
                      "Headimgurl":article.User.Headimgurl,
                      "NickName":article.User.NickName,
                      "Level":article.User.Level
                  },
                  "RewardUsers":rewardUsers,
                  "PraiseUsers":praiseUsers,
                  "ArticleComments":comments,
                  "Voice":{
                    "Id":article.Voice.Id,
                    "DownLoadFile":article.Voice.DownLoadFile,
                    "VoiceTime":article.Voice.VoiceTime,
                    "TransFilePath":article.Voice.TransFilePath
                  },
                  "Images":images,
                  "Video":null
              })
          }

          // 设置Articles
          that.setData({
            articles:articles,
            pageIndex:that.pageIndex+1
          })
          
      });
  },
 */
  toArticleDetail: function(event) {
    var articleId = event.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: '/pages/articledetail/articledetail?id=' + articleId,
    })
  }
  , 
  showBigImg: function(e) { // 展示大图
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
       current: src, // 当前显示图片的链接，不填则默认为 urls 的第一张
       urls: [src],
    })
    return false;
  },
  // 签到
  sign: function() {

  },
  // 关注
  concern: function() {
    
  },
  /**
   * 对帖子点赞
   */
  praise:function(e){
      var that = this;
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      var id = e.currentTarget.dataset.id; // 帖子ID
      var verifyModel = util.primaryLoginArgs(unionid);
      wx.uploadFile({
        url: 'http://apptest.vzan.com/minisnsapp/articlepraise',
        filePath: wx.getStorageSync('tmpFile'),
        name:'file',
        // header: {}, // 设置请求的 header
        formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode,"sign":verifyModel.sign, "artId":id}, // HTTP 请求中其他额外的 form data
        success: function(res){
            var tmp = that.data.articles;
            var result = JSON.parse(res.data);
            // 修改状态
            if(result.result==true) {
                for(var i=0; i < tmp.length; i++) {
                  if (tmp[i].Id==id) {
                    tmp[i].IsPraise=true;
                    tmp[i].Praise = tmp[i].Praise + 1; 
                  }
                }
                that.setData({articles:tmp})
            }
        }
      })
      // 测试用
      // var tmp = that.data.articles;
      // // 修改状态
      // for(var i=0; i < tmp.length; i++) {
      //   if (tmp[i].Id==id) {
      //     tmp[i].IsPraise=true;
      //   }
      // }
      // that.setData({articles:tmp})
  },
  /**
   * 评论帖子
   */
  showReComment:function(e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var existId = that.data.showRecommend.id;
      var emoij = that.data.emoij;
      var commentText = that.data.commentText;
      var selectedImgs = that.data.selectedImgs;
      var existCommontid = that.data.showRecommend.commontId;
      if (existId == id && existCommontid == null){ // 关闭
        id = "";
      }
      if (existId != id) { // 打开新的
        emoij = {id:""},
        commentText = "";
        selectedImgs = [];
      } 
      // var tmp = that.data.articles;
      that.setData({
        showRecommend:{id:id, toUserId:null, commontId:null, toUserName:null}, 
        emoij:emoij, 
        commentText:commentText, 
        selectedImgs:selectedImgs
      })
  },
  /**
   * 回复用户评论
   */
commentUser:function(e){
    var that = this;
    var artId = e.currentTarget.dataset.artid;
    var uid = e.currentTarget.dataset.uid;
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;

    var emoij = that.data.emoij;
    var commentText = that.data.commentText;
    var selectedImgs = that.data.selectedImgs;
    
    var existId = that.data.showRecommend.id;
    var existCommontid = that.data.showRecommend.commontId;
    if (artId == existId && existCommontid == id) { 
        // 关闭当前评论
        artId = "";
    }
    if (existId != artId || existCommontid != id) {
        // 清空数据 ,打开新的
        emoij = {id:""};
        commentText = "";
        selectedImgs = [];
    }
    that.setData({
        showRecommend:{id:artId,toUserId:uid,commontId:id,toUserName:name},
        emoij:emoij,
        commentText:commentText,
        selectedImgs:selectedImgs,
    })
},

  /**
   * 转发
   */
  zhuan:function(){

  },
  /**
   * 赏
   */
  reward:function(){
    wx.request({
      url: 'https://xiuxun.top/wx/eee/',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log("测试.top")
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  /**
   * 选择Emoij
   */
  selectEmoij:function(e){

      var id = e.currentTarget.dataset.id;
      var eid = this.data.emoij.id;
      if (eid == id) {
        id="";
      }
      this.setData({emoij:{id:id}})
  },
  /**
   * 保存评论的内容
   */
  saveTextValue:function(e) {
      var content = e.detail.value;
      this.setData({commentText:content});
  },
  /**
   * 保存选择的表情
   */
  emoijSelected:function(e){
      var code = e.currentTarget.dataset.code;
      var tmp = this.data.commentText;
      tmp = tmp + code;
      this.setData({commentText:tmp});
  },

  /**
   * 选择图片
   */
  selectImg: function(e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res){
          var tmp = res.tempFilePaths;
          for(var i=0; i<tmp.length; i++) {
                // 上传图片s
              wx.uploadFile({
                url: 'http://apptest.vzan.com/minisnsapp/uploadfilebytype',
                filePath:tmp[i],
                name:'file',
                // header: {}, // 设置请求的 header
                formData: {"fid":minisId, "uploadType":"img", "deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
                           "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign}, // HTTP 请求中其他额外的 form data
                success: function(res){
                    var result = JSON.parse(res.data);
                  // 刷新页面
                  var rtmp = that.data.selectedImgs;
                  rtmp = rtmp.concat({id:result.obj.id,src:result.obj.url});
                  that.setData({selectedImgs:rtmp});
                }
              })
              // 模拟上传成功
              // var rtmp = that.data.selectedImgs;
              // rtmp = rtmp.concat({id:0,src:"http://oss.vzan.cc/image/jpg/2016/6/29/104132817bf9689a7340798e7927d447ef56d7.jpg"});
              // that.setData({selectedImgs:rtmp});
          }
        }
      })
  },
    // 删除图片
  removeImg: function(event){
    var that = this;
    var id = event.currentTarget.dataset.id;
    var imgs = that.data.selectedImgs;
    for (var i=0; i<imgs.length; i++) {
      if(imgs[i].id == id) {
        imgs.splice(i,1)
        break;
      }
    }
    that.setData({selectedImgs:imgs})
  },
  /**
   * 取消评论
   */
  commentCancle:function(e) {
    console.log("取消评论")
    this.setData({
        showRecommend:{ id:"",toUserId:null,commontId:null,toUserName:null },
        emoij:{ id:"" }, commentText:"", selectedImgs:[] 
    })
  },
  /**
   * 提交帖子评论 | 回复
   */
  commentSubmit:function(e){
      var that = this;
      var id = e.currentTarget.dataset.id;
      var showRecommend = that.data.showRecommend;
      if (showRecommend.commontId) { // 回复用户
          that.replyComment(id);
      } else {
          that.replyPost(id); // 回复帖子
      }
      // 清空评论数据
      that.setData({
        showRecommend:{ id:"",toUserId:null,commontId:null,toUserName:null },
        emoij:{ id:"" }, commentText:"", selectedImgs:[] 
      })
      console.log("提交评论 -- END");
  },
  /**
   * 重新加载数据
   */
  reload:function(){
  },

  /**
   * 回复帖子
   * @Param id 帖子ID
   
  replyPost: function(id) {

      var that = this;
      var minisId = app.globalData._minisns.Id;
      var unionid = app.globalData._user.unionid;
      var imgs = [];
      for (var i=0; i < this.data.selectedImgs.length; i++) {
        imgs.push(this.data.selectedImgs[i].id);
      }
      var content = this.data.commentText;
      var verifyModel = util.primaryLoginArgs(unionid);

      var data = {
        "deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode,"sign":verifyModel.sign,
        "artId":id,"comment":content,"images":imgs
      }
      wx.request({
        url: 'https://apptest.vzan.com/minisnsapp/commentartbyid',
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          if(res.result == true) {
            // 获取评论列表
            var url = "https://apptest.vzan.com/minisnsapp/getcmt-"+id;
            wx.request({
              url: url,
              data: {fid:minisId,pageIndex:1},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                if (res.result == true) {
                    var arts = that.data.articles;
                    for (var i=0; i<arts.length;i++) {
                        var tmp = arts[i];
                        if (tmp.Id==id) {
                          var list = []; // 评论信息
                          for(var j = 0; j < res.CommentList.length; j++) {
                            var comment = res.CommentList[j];
                            list.push({"Id": comment.Id, "CreateDate": comment.CreateDate, "Content": comment.Content,
                                  "CommentCount": 0,
                                  "ComUser": { "Id": comment.User.Id,"Headimgurl": comment.User.Headimgurl,"NickName": comment.User.Nickname,},
                                  "DUser": { "Id":comment.PUserId,"NickName":comment.PUserName,},
                                  "Voice": comment.Voice,
                                  "Images": comment.Images
                            })
                          }
                          tmp.articleComments = list;
                          arts[i] = tmp;
                          // 更新数据
                          that.setData({articles:tmp})
                          break;
                        }
                    }
                }
              }
            })
          }
        }
      })
  },
*/
replyPost: function(id) {
      var that = this;
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      var imgs = "";
      for (var i=0; i < that.data.selectedImgs.length; i++) {
        if (i=0) {
          imgs = that.data.selectedImgs[i].id;
        } else {
          imgs = imgs + "," + that.data.selectedImgs[i].id;
        }
      }
      var content = this.data.commentText;
      wx.uploadFile({
        url: 'http://apptest.vzan.com/minisnsapp/commentartbyid',
        filePath: wx.getStorageSync('tmpFile'),
        name:'file',
        // header: {}, // 设置请求的 header
        formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode,"sign":verifyModel.sign,
        "artId":id,"comment":content,"images":imgs}, // HTTP 请求中其他额外的 form data
        success: function(res){
            var result = JSON.parse(res.data);
            if (result.result == true) { // 发帖成功
               // 获取评论列表
            wx.request({
              url: "http://apptest.vzan.com/minisnsapp/getcmt-"+id,
              data: {fid:minisId,pageIndex:1},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function(res){
                  var arts = that.data.articles;
                  for (var i=0; i<arts.length;i++) {
                      var tmp = arts[i];
                      if (tmp.Id==id) {
                        tmp.articleComments = that.generateComments(res.data.CommentList);
                        arts[i] = tmp;
                        // 更新数据
                        that.setData({articles:arts})
                        break;
                      }
                  }
              }
            })              
            }
        }
      })

  },

/**
 * 回复用户评论
 * @param id 帖子ID
 
  replyComment:function(id) {
      var that = this;
      var minisId = app.globalData._minisns.Id;
      var unionid = app.globalData._user.unionid;
      var imgs = [];
      for (var i=0; i < this.data.selectedImgs.length; i++) {
        imgs.push(this.data.selectedImgs[i].id);
      }
      var content = this.data.commentText;
      var verifyModel = util.primaryLoginArgs(unionid);
      var showRecommend = that.data.showRecommend;
      data={"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "artId":id, "toUserId":showRecommend.toUserId, "commontId":commontId, "comment":content, "images":imgs}

      wx.request({
        url: 'https://apptest.vzan.com/minisnsapp/replyartcommentbyid',
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          if (res.result == true) { // 发送成功，刷新帖子
              var arts = that.data.articles;
              for (var i=0; i<arts.length;i++) {
                  var tmp = arts[i];
                  if (tmp.Id==id) {
                    var list = []; // 评论信息
                    for(var j = 0; j < res.CommentList.length; j++) {
                      var comment = res.CommentList[j];
                      list.push({"Id": comment.Id, "CreateDate": comment.CreateDate, "Content": comment.Content,
                            "CommentCount": 0,
                            "ComUser": { "Id": comment.User.Id,"Headimgurl": comment.User.Headimgurl,"NickName": comment.User.Nickname,},
                            "DUser": { "Id":comment.PUserId,"NickName":comment.PUserName,},
                            "Voice": comment.Voice,
                            "Images": comment.Images
                      })
                    }
                    tmp.articleComments = list;
                    arts[i] = tmp;
                    // 更新数据
                    that.setData({articles:tmp})
                    break;
                  }
              }
          }
        }
      })
  },
  */
  replyComment:function(id) {
      var that = this;
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      var imgs = "";
      for (var i=0; i < that.data.selectedImgs.length; i++) {
        if (i=0) {
          imgs = that.data.selectedImgs[i].id;
        } else {
          imgs = imgs + "," + that.data.selectedImgs[i].id;
        }
      }
      var content = that.data.commentText;
      var showRecommend = that.data.showRecommend;
      wx.uploadFile({
        url: 'http://apptest.vzan.com/minisnsapp/replyartcommentbyid',
        filePath: wx.getStorageSync('tmpFile'),
        name:'file',
        // header: {}, // 设置请求的 header
        formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "artId":id, "toUserId":showRecommend.toUserId, "commontId":commontId, "comment":content, "images":imgs}, // HTTP 请求中其他额外的 form data
        success: function(res){
            var result = JSON.parse(res.data);
            if (result.result == true) {
                var arts = that.data.articles;
                for (var i=0; i<arts.length;i++) {
                    var tmp = arts[i];
                    if (tmp.Id==id) {
                      tmp.articleComments = that.generateComments(res.data.CommentList);
                      arts[i] = tmp;
                      // 更新数据
                      that.setData({articles:arts})
                      break;
                    }
                }
            }
        }
      })
  },

  /**
   * 获取论坛帖子列表(包含热帖)
   
  getartlistbyminisnsid: function(hotshow, categoryId, pageIndex) {
      var that = this;
      var minisId = wx.getStorageSync('minisns').id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      
      var data = {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":hotshow, "categoryId": categoryId, "pageIndex":pageIndex}
      
      wx.request({
        // url: 'https://apptest.vzan.com/minisnsapp/getartlistbyminisnsid',
        url: 'https://xiuxun.top/wx/app/minisnsapp/getartlistbyminisnsid',
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {"Content-Type":"multipart/form-data;charset=utf-8"}, // 设置请求的 header
        success: function(res){
            var articles = [];
            if (pageIndex <= 1) {
                articles = res.data.objArray; // 更新数据
            } else {
                articles = that.data.articles.concat(res.data.objArray);
            }
            that.setData({articles:articles})
        }
      })
  },
  */
  getartlistbyminisnsid: function(hotshow, categoryId, pageIndex) {
      var that = this;
      var minisId = wx.getStorageSync('minisns').Id;
      var unionid = wx.getStorageSync('user').unionid;
      var verifyModel = util.primaryLoginArgs(unionid);
      
      wx.uploadFile({
        url: 'http://apptest.vzan.com/minisnsapp/getartlistbyminisnsid',
        filePath:wx.getStorageSync('tmpFile'),
        name:'file',
        // header: {}, // 设置请求的 header
        formData: {"deviceType":verifyModel.deviceType, "timestamp":verifyModel.timestamp, 
        "uid": unionid, "versionCode":verifyModel.versionCode, "sign":verifyModel.sign,
        "fid": minisId, "hotshow":hotshow, "categoryId": categoryId, "pageIndex":pageIndex}, // HTTP 请求中其他额外的 form data
        success: function(res){
            var result = JSON.parse(res.data);
            var articles = [];
            if (pageIndex <= 1) {
                articles = result.objArray; // 更新数据
            } else {
                articles = result.articles.concat(res.data.objArray);
            }
            that.setData({articles:articles})
        }
      })
  },

  /**
   * 整合评论信息
   */
  generateComments: function(commentList) {
      var comment = {};
      for (var i=0; i<commentList.length; i++) {
        var tmp = commentList[i];
        // 回复者
        for(var j=0; j<tmp.Comments.length; j++) {
            var rTmp = tmp.Comments[j];
            rTmp.DUser = {"Id":tmp.User.Id,"Headimgurl":tmp.User.Headimgurl,"NickName":tmp.User.Nickname};
   	        rTmp.ComUser = rTmp.User;
            comment[rTmp.Id] = rTmp;
        }
        if (typeof comment[tmp.Id] == "undefined") {
             tmp.ComUser = tmp.User;             
             comment[tmp.Id] = tmp;
        }
      }
      var list = [];
      for (var key in comment) {
        list.push(comment[key])
      }
      return list.reverse();
  },
  /**
   * 更多评论信息
   */
  moreComment: function(e) {
      this.setData({currentMoreComment:e.currentTarget.dataset.id})
  },
})





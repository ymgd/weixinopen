

var util = require("../../utils/util.js")

var app = getApp()
var that;
var recordTimeInterval;
Page({
  data:{
      typeList:[
      {"id":1,"name":"运营日报"},
      {"id":2,"name":"操作指南"},
      {"id":3,"name":"常见问题"}
    ],
    minisnsId:1,
    emoij:0,
    title:"",
    artContent:"",
    choosedType:null,
    address:{
      "hidlat":"",
      "hidlng":"",
      "hidspeed":"",
      "hidaddress":"",
    },
    locationMsg:"点击确定位置",
    selectedImgs:[{
      "src":"http://oss.vzan.cc/image/jpg/2016/6/29/104132817bf9689a7340798e7927d447ef56d7.jpg",
      "id":0
    },{
      "src":"http://oss.vzan.cc/image/jpg/2016/6/29/104132817bf9689a7340798e7927d447ef56d7.jpg",
      "id":1
    },{
      "src":"http://oss.vzan.cc/image/jpg/2016/6/29/104132817bf9689a7340798e7927d447ef56d7.jpg",
      "id":2
    },{
      "src":"http://oss.vzan.cc/image/jpg/2016/6/29/104132817bf9689a7340798e7927d447ef56d7.jpg",
      "id":3
    }],
    voice:null,
    audioIcon:"http://i.pengxun.cn/content/images/voice/voiceplaying.png",
    recording : 0,
    playing : 0,
    hasRecorded : 0,
    recordTime : 0,
    formatedRecordTime:"00:00:00",
    voiceSelected:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     that = this;
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    that.init();
  },
  onUnload:function(){
    // 页面关闭
    that.init();
  },

  init: function() {
    that.stopRecord()
    that.setData({
      voice:null,
      audioIcon:"http://i.pengxun.cn/content/images/voice/voiceplaying.png",
      recording : 0,
      playing : 0,
      hasRecorded : 0,
      recordTime : 0,
      formatedRecordTime:"00:00:00",
      voiceSelected:0,
      tempRecordFile:"",
      locationMsg:"点击确定位置",
    })
  },

  // 提交 TODO
  submit: function(event) {
    var that = this;
    var detail = event.detail;
    console.info(detail);
    var content = detail.value.artContent;
    var title = detail.value.title;
    if (content == "" || typeof content=="undefined") {
      // 弹出提示窗
      wx.showToast({
        title: "内容不能为空",
        icon:"success",
      })
      return false;
    }
    that.setData({ artContent:content, title:title })
    var requestData={
      id:that.data.minisnsId,
      txtContentAdd:that.data.artContent,
      hidrecordId:that.data.voice.id,
      txtTitle:that.data.title,
      hvideo:that.data.vdeio.src,
      choosedType:that.data.choosedType,
      hImgIds:that.data.selectedImgs,
      hidlat:that.data.address.hidlat,
      hidlng:that.data.address.hidlng,
      hidspeed:that.data.address.hidspeed,
      hidaddress:that.data.address.hidaddress
    }
    // 发帖
    wx.request({
      url: 'https://URL',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      }
    })


    console.info("提交");
  },
  // 获取Content值
  getContent: function(){

  },
  // 定位
  getLocate: function() {
    console.info("定位")
    var that = this;
    wx.chooseLocation({
      success: function(res){
        var latitude = res.latitude;
        var longitude = res.longitude; 
        var address = res.address;
        that.setData( {
          address: {"hidlat":latitude,"hidlng":longitude,"hidaddress":address},
          locationMsg:address
        });
        console.log(that.address);
      }
    })
    // wx.getLocation({
    //   type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: function(res){
    //     console.info(res)
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     var speed = res.speed;
    //     that.data.location.hidlat = latitude;
    //     that.data.location.hidlng = longitude;
    //     that.data.location.hidspeed = res.speed;
    //   }
    // })
  },
  // 实现表情
  changeEmoij: function() {
    var emoij = that.data.emoij;
    if (emoij != 0) {
      emoij = 0;
    } else {
      emoij = 1
    }
    that.setData({
      emoij:emoij
    })
  },
  // 选择表情
  emoijSelected: function(event) {
      var title = event.currentTarget.dataset.title;
      var code = event.currentTarget.dataset.code;
      console.log("emoijSelected")
      console.log(title);
      console.log(code);
      var content = that.data.artContent + code;
      that.setData({ artContent:content })
  },
  // 获取图片
  selectImg: function(event) {
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
          var imgs = res.tempFilePaths;
          var exisImgs = that.data.selectedImgs;
          var user = wx.getStorageSync('user');
          for(var i = 0; i<imgs.length; i++) {
            // 上传图片
            wx.uploadFile({
              url: 'https://String',
              filePath:imgs[i],
              name:'file',
              // header: {}, // 设置请求的 header
              formData: {"minisnsId":that.data.minisnsId,"userid":user.id}, // HTTP 请求中其他额外的 form data
              success: function(res){
                 var img = {"src": res.url, "id": res.id};
                 exisImgs.push(img);
              }
            })
          }
          that.setData({ selectedImgs:exisImgs })
      }
    })
  },
  // 删除图片
  removeImg: function(event){
    var id = event.currentTarget.dataset.id;
    var imgs = that.data.selectedImgs;
    for (var i=0; i<imgs.length; i++) {
      if(imgs[i].id == id) {
        imgs.splice(i,1)
        break;
      }
    }
    that.setData({
      selectedImgs:imgs
    })
    console.info(that.data);
  },
  // 语音
  selectVoice: function() {
    console.log("语音")
    that.setData( {voiceSelected:1} )
  },

  /**
   * 开始录音
   */
  startRecord: function(){
    console.info("开始录音")
    that.setData({recording:1})
    recordTimeInterval = setInterval(function(){
        var recordTime = that.data.recordTime + 1;
        that.setData({
          recordTime : recordTime,
          formatedRecordTime: util.formatTime(recordTime)
        })
    }, 1000)
    wx.startRecord({
      success: function(res){
        var user = wx.getStorageSync('user');
        // 上传到服务器
        wx.uploadFile({
          url: 'https://String',
          filePath: res.tempFilePath,
          name:'file',
          // header: {}, // 设置请求的 header
          formData: {"minisnsId":that.data.minisnsId,"userid":user.id}, // HTTP 请求中其他额外的 form data
          success: function(res){
             that.setData({voice:{id:res.id,src:res.url}})
          },
        })
        that.setData({
            hasRecorded:1,
            recording:0,
            recordTime:0,
        })
      },
      complete: function() {
          that.setData({ recording:0, voiceSelected:0, formatedRecordTime:"00:00:00" })
          clearInterval(recordTimeInterval);
          console.info("StartRecord: 录音完成");
      }
    })
  },
  /**
   * 结束录音
   */
  stopRecord: function() {
    console.info("结束录音")
    wx.stopRecord({
      success: function(res){
          // 上传录音
          var user = wx.getStorageSync('user');
          wx.uploadFile({
            url: 'https://String',
            filePath:res.tempFilePath,
            name:"file",
            // header: {}, // 设置请求的 header
            formData: {"minisnsId":that.data.minisnsId, "userid":user.id}, // HTTP 请求中其他额外的 form data
            success: function(res){
               that.setData({voice:{id:res.id, src:res.url}})
            }
          })
          that.setData( {
            recording:0,
            hasRecorded:1,
            formatedRecordTime: util.formatTime(that.data.recordTime)
          } )
          console.info("录音完成")
      },
      complete: function() {
         console.info("停止录音，Complete");
      }
    })
    that.setData({voiceSelected:0, recording:0,hasRecorded:1,recordTime:0,formatedRecordTime:"00:00:00"})  
    clearInterval(recordTimeInterval);
  },
  /**
   * 上传视频
   */
  selectVdeio: function(event) {
     var that = this;
      wx.chooseVideo({
        sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
        // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
        camera: ['front', 'back'],
        success: function(res){
            var user = wx.getStorageSync('user') 
            // 上传到服务器
            wx.uploadFile({
              url: 'https://String',
              filePath:res.tempFilePath,
              name:'file',
              // header: {}, // 设置请求的 header
              formData: {"minisnsId":that.data.minisnsId, "userid":user.id}, // HTTP 请求中其他额外的 form data
              success: function(r){
                that.setData({voice:{id:r.id, src:r.url, duration:res.duration }})
              }
            })
        }
      })
  },
  // 悬赏
  selectReward:function(event) {
    var that = this;
    wx.showModal({
      title:"提示",
      content:"敬请期待"
    });
  },
  // 选择板块
  selectType: function(event) {
    var id = event.currentTarget.dataset.id;
    this.setData({choosedType:id});
  }
})
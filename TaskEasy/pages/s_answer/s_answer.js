//s_answer.js
//获取应用实例
var app = getApp()
Page({
  data: {
    task: {
        teacher: "李老师",
        time: "2016-10-01",
        details: "背诵《观沧海》。"
    },
    answers: [{
            user: "me",
            time: "2015-10-01 10:20:20",
            content: "第一次，行不行？"
        }, {
            user: "me",
            time: "2016-10-02 08:00:30",
            content: "第二次，这回行了吧。"
        },{
            user: "teacher",
            time: "2016-10-03 08:30:30",
            content: "还不行呢！多读几遍，才能流利一些。"
        }],
    toast1Hidden: true,
  },
  //事件处理函数

  // 发送信息
  formSubmit: function(e) {
    if (e.detail.value.input == "")
    {
        this.setData({
            toast1Hidden: false   // 消息提示框
        })
    }
    else{
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }
  },

  toast1Change(){
      this.setData({
          toast1Hidden: true   // 消息提示框
      })
  },

  // 录音
  startRecord() {
      wx.starRecord({
          success: function(res) {
          var tempFilePath = res.tempFilePath 
        },
        fail: function(res) {
        //录音失败
        }
      })
      setTimeout(function() {
          //结束录音   
          wx.stopRecord()
      }, 10000)
  },

  // 录音结束
  stopRecord() {
      wx.stopRecord()
  },

    // 从相册选择照片或拍摄照片
    chooseImage() {
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],

            success: (res) => {
                this.showLoading('正在上传图片…');

                console.log(api.getUrl('/upload'));
                wx.uploadFile({
                    url: api.getUrl('/upload'),
                    filePath: res.tempFilePaths[0],
                    name: 'image',

                    success: (res) => {
                        let response = JSON.parse(res.data);

                        if (response.code === 0) {
                            console.log(response);

                            let albumList = this.data.albumList;
                            albumList.unshift(response.data.imgUrl);

                            this.setData({ albumList });
                            this.renderAlbumList();

                            this.showToast('图片上传成功');
                        } else {
                            console.log(response);
                        }
                    },

                    fail: (res) => {
                        console.log('fail', res);
                    },

                    complete: () => {
                        this.hideLoading();
                    },
                });

            },
        });
    },

    //  选择视频
    chooseVideo: function() {
        var that = this
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
            camera: ['front','back'],
            success: function(res) {
                that.setData({
                    src: res.tempFilePath
                })
            }
        })
    },
    

  onLoad: function () {

  }
})

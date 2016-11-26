//s_answer.js
//获取应用实例
var app = getApp()
Page({
  data: {
    task: {
        student: "张三",
        time: "2016-10-01",
        details: "背诵《观沧海》。",
        status: false
    },
    answers: [{
            user: "student",
            time: "2015-10-01 10:20:20",
            content: "第一次，行不行？"
        }, {
            user: "student",
            time: "2016-10-02 08:00:30",
            content: "第二次，这回行了吧？"
        },{
            user: "teacher",
            time: "2016-10-03 08:30:30",
            content: "还不行呢！好好多读几遍。"
        }],
        toast1Hidden: true,
        toast2Hidden: true,
        toast3Hidden: true,
  },
  //事件处理函数
  
  onLoad: function () {

  },

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

  // 结束任务
  finish_homework: function(){
      this.setData({
          toast2Hidden: false   // 消息提示框
      })
  },

  // 重启任务
  restart_homework: function() {
      this.setData({
          toast3Hidden: false   // 消息提示框
      }),
      console.log('任务重启')
  },


  toast1Change(){
      this.setData({
          toast1Hidden: true   // 消息提示框
      })
  },
  toast2Change(){
      this.setData({
          toast2Hidden: true   // 消息提示框
      }),
      console.log('关闭了一次作业'),
      wx.navigateBack()
  },
  toast3Change(){
      this.setData({
          toast3Hidden: true   // 消息提示框
      })
  },

})

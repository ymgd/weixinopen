//获取应用实例
var app = getApp()
Page({
  data: {
    students: [
      {
      id: 1,
      name: "张三"
    }, {
      id: 2,
      name: "李四"
    }, {
      id: 3,
      name: "王五"
    }, {
      id: 4,
      name: "赵六"
    }
    ],
    toast1Hidden: true,
    toast2Hidden: true,
    toast3Hidden: true,
 

  },
  //事件处理函数
  // 发送信息
  formSubmit: function(e) {
    if (e.detail.value.checkbox.length == 0)
    {
        this.setData({
            toast1Hidden: false   // 消息提示框
        })
    }
    else if (e.detail.value.input == ""){
        this.setData({
            toast2Hidden: false   // 消息提示框
        })
    }
    else{
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        this.setData({
            toast3Hidden: false
        })
        wx.navigateTo({url: "../t_tasks/t_tasks"})
    }
  },

  toast1Change(){
      this.setData({
          toast1Hidden: true   // 消息提示框
      })
  },

  toast2Change(){
      this.setData({
          toast2Hidden: true   // 消息提示框
      })
  },


  toast3Change(){
      this.setData({
          toast3Hidden: true   // 消息提示框
      })
  }
})
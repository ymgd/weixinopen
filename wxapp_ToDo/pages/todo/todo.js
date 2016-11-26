//todo.js
Page({
  data: {
    textShow: true, // 是否有todo存在
    modalHidden: true, // 新增todo窗口
    flagSubmit: false, // 新增todo时是否填写事件
    toastHidden: true, // 消息提示框
    
    actionTodo: true, // 修改todo
    actionSheetItems: ['置顶', '提醒', '编辑', '删除'],
    actionWhich: -1,
    not_active: '提醒', // 暂不提供提醒功能

    userTime: 25, // 默认时间    
    addVal: '', 

    startD: 0,
    naviFlag: false,

    todo: [
      /*{
        name: '游泳',
        time: 20,
        bgCls: 'bg1'
      },
      {
        name: '跑步',
        time: 20,
        bgCls: 'bg3'
      },
      {
        name: '骑车',
        time: 20,
        bgCls: 'bg5'
      }*/
    ],
    defaults: {
      time: [
        {value: '5'},
        {value: '25', checked: 'true'},
        {value: '35'}
      ]
    }
  },
  onShow: function () {
    if (this.data.todo.length < 1) {
      this.setData({
        textShow: false
      })
    }
  },
  /**
   * user defined methods & property
   */
  // xss & trim
  dataFormat: function(data) {
    var remove_spaces = /^\s+|\s+$/g,
        remove_lt = /</g,
        remove_gt = />/g;
    return data.toString()
              .replace(remove_spaces, '')
              .replace(remove_lt, '&lt;')
              .replace(remove_gt, '&gt;');
  },
  // 添加ToDo
  addHandle: function(e) {
    this.setData({
      textShow: true,
      modalHidden: false
    })
  },
  // 弹出ToDo内容框
  modalChange: function(e) {
    if (this.data.flagSubmit) {
      this.setData({
        modalHidden: true,
        todo: [].concat(this.data.todo, {
          name: this.data.addVal,
          time: this.data.userTime,
          bgCls: 'bg'+(Math.ceil(Math.random()*5))
        })
      })
      // 处理新增ToDo
    }
  },
  // input失去焦点触发
  inputChange: function(e) {
    var val = this.dataFormat(e.detail.value)
    if (val.length > 0) {
      this.setData({
        flagSubmit: true,
        addVal: val
      })
    }
  },
  // radio修改
  rChange: function(e) {
    this.setData({
      userTime: e.detail.value
    })
  },

  // 长按todo
  changeTodo: function(e) {
    var index = e.target.dataset.index;
    this.setData({
      actionTodo: false,
      actionWhich: index
    })
  },
  // 取消长按
  cancelTodo: function(e) {
    this.setData({
      actionTodo: true,
      actionWhich: -1
    })
  },
  // 操作todo
  todoItem: function(e) {
    var index = e.target.dataset.index;
    /**
     * 开关选项
     * 0: 置顶
     * 1: 提醒
     * 2: 编辑
     * 3: 删除
     */
    switch(index) {
      case '0':
        // 置顶操作
        var todo = this.data.todo;
        var item = todo.splice(this.data.actionWhich, 1)[0];
        todo.unshift(item);
        this.setData({
          todo: todo,
          actionTodo: true
        })
        break;
      case '1':
        this.setData({
          not_active: '提醒',
          actionTodo: true,
          toastHidden: false
        })
        break;
      case '2':
        this.setData({
          not_active: '编辑',
          actionTodo: true,
          toastHidden: false
        })
        break;
      case '3':
        var todo = this.data.todo;
        todo.splice(this.data.actionWhich, 1);
        if (todo.length === 0) {
          this.setData({
            todo: todo,
            actionTodo: true,
            textShow: false
          })
        } else {
          this.setData({
            todo: todo,
            actionTodo: true
          })
        }
        break;
    }
  },
  // 消息提示框
  toastChange: function(e) {
    this.setData({
      toastHidden: true
    })
  },

  // 触摸事件
  touchStart: function(e) {
    this.setData({
      startD: e.touches[0].clientX
    })
  },
  touchMove: function(e){
    var to = e.touches[0].clientX;
    if ((this.data.startD - to) > 100) {
      this.setData({
        naviFlag: true
      })
    }
  },
  touchEnd: function(e) {
    if (this.data.naviFlag) {
      this.setData({
        naviFlag: false
      });
      wx.navigateTo({
        url: '/pages/todos/todos'
      })
    }
  },

  // 开始todo
  startTodo: function(e) {
    var index = e.target.dataset.index;
    var time = ''+this.data.todo[index].time;
    var name = this.data.todo[index].name;
    wx.setStorageSync('todoTime', time);
    wx.setStorageSync('todoName', name)
    wx.navigateTo({
      url: '/pages/doing/doing',
      complete: function() {
        wx.navigateBack();
      }
    })
  }
})

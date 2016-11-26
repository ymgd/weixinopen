
var app = getApp()

Page({
  data: {
    left: '0',
    center: '',
    right:'',
    result:''
  },
  onLoad: function () {
    console.log('欢迎加入微信小程序开发QQ群:171477235')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  },

  evt_touch:function (e){
    console.log("按下的按键是 : "+e.target.id)
    //按下的按钮
    var enid = e.target.id;
    //当前左边的数值
    var left = this.data.left;
    //当前中间的数值
    var center = this.data.center;
    //当前右边的数值
    var right = this.data.right;
    //当前结果值
    var result = this.data.result;

    switch (enid){
      case "jia":
        //加法
        this.setData({
          center:'+'
        })
        if(result != ''){
          this.setData({
            left:(result),
            result:''
          });
        }
        break
      case "jian":
        //减法
        this.setData({
          center:'-'
        })
        if(result != ''){
          this.setData({
            left:(result),
            result:''
          });
        }
        break
      case "cheng":
        //乘法
        this.setData({
          center:'*'
        })
        if(result != ''){
          this.setData({
            left:(result),
            result:''
          });
        }
        break
      case "chu":
        //除法
        this.setData({
          center:'/'
        })
        if(result != ''){
          this.setData({
            left:(result),
            result:''
          });
        }
        break
      case "ac":
        //清零
        this.setData({
          left:'0',
          center:'',
          right:'',
          result:'',
        })
        break
      case "dengyu":
        //等于
        left = Number(left);
        right = Number(right);
        result = '';
        switch(center){
          case '+':
            result = left + right;
            break
          case '-':
            result = left - right;
            break
          case '*':
            result = left * right;
            break
          case '/':
            result = left / right;
            break
        }
        
        //调用API从本地缓存中获取数据
        var results = wx.getStorageSync('results') || []
        results.unshift(left+''+center+''+right+'='+result)
        wx.setStorageSync('results', results)

        this.setData({
          left:'',
          center:'',
          right:'',
          result:result,
        })
        break
      default:
        console.log('default');
        
        if(result != ''){
          this.setData({
            left:(result),
            result:''
          });
          left = this.data.left;
        }
        if(left == 0){
          this.setData({
            left:(enid)
          })
        }else if(this.data.center == ''){
          this.setData({
            left:(left + '' + enid)
          })
        }else if(this.data.right == ''){
          this.setData({
            right:(enid)
          })
        }else{
          this.setData({
            right:(right + '' + enid)
          })
        }

    }
  }
})

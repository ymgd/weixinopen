const Constant = require( '../../common/constant.js' );
const util = require( '../../common/utils.js' );
Page( {
  data: {  //状态机数据
    inputValue: "", //输入的内容
    loading: false, //加载状态
    disabled: true, //按钮是否可用
    modalHidden: true, //modal弹出状态
    modalErrorText:"请求失败,请检测网络"//modal弹出提示文字
  },
  //输入框绑定的事件
  bindKeyInput: function( e ) {
    let value = e.detail.value;
    //输入框,当输入的值大于0的时候按钮可用
    this.setData( {
      inputValue: value,
      disabled: !value.length > 0
    });
  },
  search: function( e ) {
    //查询按钮
    this.setData( {
      loading: true,
      disabled:true
    });
    let that = this;//保留page函数中object的引用
    //联网
    wx.request( {
      url: Constant.AIR_QUALITY_URL,
      header: {
        "Content-Type": "application/json",
        "apikey": Constant.API_KEY
      },
      data: {
        "city": this.data.inputValue
      },
      //res = {data: '开发者服务器返回的内容'}
      success: function( res ) {
        console.log( res.data );
        if( res.data.errNum === 0 ) { //成功
        //跳转地址可以写相对路径,绝对路径一定要以/ 开头 这样写pages/air_quality/result是错误的
          wx.navigateTo( {  
            url:util.createURL( "./result", res.data.retData),
          });
        }else{
          that.setData( { //这个位置应该用page的引用调用
            modalHidden: false,
            modalErrorText:res.data.retMsg
          });
        }

      },
      //失败,弹出modal
      fail: function() {
        //console.log(this); //这时候的this不是Page了
        that.setData( { //这个位置应该用page的引用调用
          modalHidden: false,
           modalErrorText:"请求失败,请检测网络"
        })
      },
      //无论成功与失败,loading都取消
      complete: function() {
        console.log("complete")
        that.setData( {
          loading: false,
          disabled:false
        })
      }
    });
  },
  modalChange: function() {
    this.setData( {
      modalHidden: true
    })
  }

});
Page( {
  data: {
    // text:"这是一个页面"
    inputValue1: "",
    inputValue2: "",
    toast1Hidden: true,
  },
  login: function() {
    // 页面渲染完成
    console.log( "user: " + this.data.inputValue1 + "psd: " + this.data.inputValue2 )
    if( this.data.inputValue1 == "123" && this.data.inputValue2 == "123" ) {
      wx.redirectTo( {
        url: "../index/index"
      })
      this.setData( {
        toast1Hidden: false
      })
    } else {
      console.log( "登录失败" )
    }
  },
  bindKeyInput1: function( e ) {
    this.setData( {
      inputValue1: e.detail.value
    })
  },
  bindKeyInput2: function( e ) {
    this.setData( {
      inputValue2: e.detail.value
    })
  },
  toast1Change: function( e ) {
    this.setData( {
      toast1Hidden: true
    })
  },

})
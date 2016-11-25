Page({
  data:{
    inputValue: '',
    chooseValue: '',
    info: '',
    items: [
      {name: 'cook', value: '菜谱'},
      {name: 'disease', value: '病症'},
      {name: 'drug', value: '药品'},
    ]
  },
  bindKeyInput: function(e) {
    this.inputValue = e.detail.value
  },
  startSearch: function(e) {
    var that = this;
    console.log(this.inputValue + this.chooseValue)

    wx.request({
        url: 'http://www.tngou.net/api/' + that.chooseValue + '/name?name=' + that.inputValue,
        data: {},
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
          if (that.chooseValue == 'cook') {
              wx.navigateTo({
                  url:'../detial/detial?info=' + res.data.tngou[0].message,
              })
          } else {
              wx.navigateTo({
                  url:'../detial/detial?info=' + res.data.message,
              })
          }
          
        }
    })
    
    console.log(this.info+'$$$$$$$$$$')


  },
  radioChange: function(e) {
    this.chooseValue = e.detail.value
  },
  onLoad:function(options){
    
  },
  onReady:function(){
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){
  }
})
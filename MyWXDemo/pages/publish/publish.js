var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    logs: [],
     toView: 'red',
    scrollTop: 100
  },
  onLoad: function () {

  },
  tapName: function(event) {
    console.log(event)
  },
  handleTap1:function(event){
    console.log(event)
  },
  handleTap2:function(event){
    console.log(event)
  },
  handleTap3:function(event){
    console.log(event)
  },
  touchListener:function(event){
    console.log(event)
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
  
})
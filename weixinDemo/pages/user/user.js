Page({
  data: {
      mmmm:'0',
      nnnn:'0'
  },
  switchover: function(e){
      console.log(e.currentTarget.dataset.index)
      this.setData({
          mmmm:e.currentTarget.dataset.index,
          nnnn:e.currentTarget.dataset.index
      })
  }
})
Page({
  data: {
    navTab: ["通知", "感谢", "关注"],
    currentNavtab: "0"
  },
  onLoad: function () {
  },
  oTs:function(e){
    var m = this;
    m._x = e.touches[0].clientX;
  },
  oTe:function(e){
    var m = this;
    var current_num = parseInt(this.data.currentNavtab);

    m._new_x = e.changedTouches[0].clientX;

    if(m._new_x - m._x > 10 && current_num< this.data.navTab.length -1){
      current_num=current_num+1;
    }

    if(m._new_x - m._x < -10 && current_num> 0){
      current_num-=1;
    }

    this.setData({
      currentNavtab: current_num
    });
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})

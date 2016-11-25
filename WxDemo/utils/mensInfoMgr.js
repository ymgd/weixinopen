let instance = null;

class MensInfoMgr {
  constructor() {
    if(!instance){
      instance = this;
    } else {
      throw "Cannot construct singleton";
    }

    this.lastDate = "";
    this.numberOfDays = 0;
    this.cycle = 0;
  }

  static getInstance() {
    if (!instance) {
      return new MensInfoMgr();
    }
    return instance;
  }

  loadData(success, failCallback) {
      var that = this;
      wx.getStorage({
        key: "kMenstruationInfo",
        success: function(res) {
          success(res.data);

          that.lastDate = res.data.lastDate;
          that.numberOfDays = res.data.numberOfDays;
          that.cycle = res.data.cycle;
        },
        fail: function() {
          failCallback && failCallback();
        }
    })
  }

  saveData(success, fail) {
      var obj = {};
      obj.lastDate = this.lastDate;
      obj.numberOfDays = this.numberOfDays;
      obj.cycle = this.cycle;

      wx.setStorage({
        key: 'kMenstruationInfo',
        data: obj,
        success: function(res){
          success && success();
        },
        fail: function() {
          fail && fail();
        },
        complete: function() {
          // complete
        }
      })
  }

  // loadLastDate(success, fail) {
  //   wx.getStorage({
  //     key: 'kLastDate',
  //     success: function(res){
  //       success && success(res.data);
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

  // saveLastDate(newLastDate, success, fail) {
  //   // this.lastDate = newLastDate;
  //   wx.setStorage({
  //     key: 'kLastDate',
  //     data: newLastDate,
  //     success: function(res){
  //       success && success();
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

  // loadNumberOfDays(success, fail) {
  //   wx.getStorage({
  //     key: 'kNumberOfDays',
  //     success: function(res){
  //       success && success(res.data);
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

  // saveNumberOfDays(newNumberOfDays, success, fail) {
  //   // this.numberOfDays = newNumberOfDays;
  //   wx.setStorage({
  //     key: 'kNumberOfDays',
  //     data: newNumberOfDays,
  //     success: function(res){
  //       success && success();
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

  // loadCycle(success, fail) {
  //   wx.getStorage({
  //     key: 'kCycle',
  //     success: function(res){
  //       success && success(res.data);
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

  // saveCycle(newCycle, success, fail) {
  //   // this.lastDate = newLastDate;
  //   wx.setStorage({
  //     key: 'kCycle',
  //     data: newCycle,
  //     success: function(res){
  //       success && success();
  //     },
  //     fail: function() {
  //       fail && fail();
  //     },
  //     complete: function() {
  //       // complete
  //     }
  //   })
  // }

};

export default MensInfoMgr;
// module.exports = {
//   MensInfoMgr: new MensInfoMgr()
// }
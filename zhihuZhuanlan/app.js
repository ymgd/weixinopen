
// var Promise = require('libs/bluebird/release/promise');
// var Promise = require('libs/bluebird/browser/bluebird.min');
import Util from "utils/util";
import Config from "config";
 

// console.log("root promise-->",Promise);
  


//app.js
App({

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次
  onLaunch: function () {
    //此时页面还未创建
    console.log("launch...");
  },

  //当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow : function(){
    //第一launch的会触发show
    console.log("show...");
  },

  //当小程序从前台进入后台，会触发 onHide
  onHide : function(){
    //两个重要点:
    //前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。
    //只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
    console.log("hide...");
  },

  // "Promise" : Promise,
  "Util" : Util,
  "Config" : Config
})



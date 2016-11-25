export default class UiUtil {
  /*
  * 去掉字符串左右空格、换行
  */
  static loading(toggle,title){
      if(toggle){
        wx.showToast({
                title : title || "正在加载...",
                icon : "loading",
                duration : 10000
            });
      }
      else{
          wx.hideToast();
      }  
  }

  static toast(text){
      wx.showToast({
        title: text,
        icon : false
    });
  }

  static preImage(obj){
      let urls = [];
      if(obj instanceof Array){
          urls = obj;
      }
      else{
           urls.push(obj);
      }
      wx.previewImage({
        urls: urls,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
}
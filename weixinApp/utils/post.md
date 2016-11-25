# request 

共用方法调用

```javascript
// 重写共用的方法。
function requestUrl(url){
  return new Promise(function(resolve, reject){    
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
// 调用
util.requestUrl(url)
   .then(function(data){
     //this.setData({
     //
     //});
     console.log(data);
   });
```




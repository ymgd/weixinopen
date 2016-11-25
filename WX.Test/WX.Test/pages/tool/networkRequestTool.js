///网络请求可以用一个方法就行，因为仅仅是请求的url不同，可以枚举url


//获取指定类型的新闻
function getNewsByType(newType){
var page = getCurrentPages()[getCurrentPages().length-1];
console.log('------------')
console.log(page.data)
  wx.request({
        url: 'http://v.juhe.cn/toutiao/index?key=c4bd290d9db68d19ef6422cb0519ef63&type='+newType,
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            console.info(res.data.result.data)
            var urls = new Array();
            for(var i=0; i<3; i++){  //没有轮播图数据，所以取出前三个数据当做轮播图数据
                urls.push(res.data.result.data[i])
            }
            var obj = {};
            obj.imgUrls = urls;
            obj.cells = res.data.result.data;
            page.setData(obj);
        }
    })
}
//获取美团数据
function getMeiTuanData(pageNum){
    return new Promise(function(resolve, reject){
        wx.request({
          url: 'http://api.meituan.com/meishi/filter/v4/deal/select/city/50/cate/'+pageNum+'?userid=314640000&__vhost=api.meishi.meituan.com',
          header: {
            'Content-Type': 'application/json'
        },
          success: function(res){
           resolve(res)
          },
          fail: function(res) {
            resolve(res)
          },
          complete: function() {
            console.log('完成');
          }
        })
    })
}
// 获取百思不得姐数据
function getDuanZinData(date){
    return new Promise(function(resolve, reject){
        wx.request({
          url: "http://s.budejie.com/topic/tag-topic/64/hot/bs0315-iphone-4.5/"+ date+ "-20.json",
          header: {
            'Content-Type': 'application/json'
        },
          success: function(res){
           resolve(res)
          },
          fail: function(res) {
            resolve(res)
          },
          complete: function() {
            console.log('完成');
          }
        })
    })
}
// 百思不得姐评论
function getDuanZiDetailData(date, id){
    return new Promise(function(resolve, reject){
        wx.request({
          url: "http://c.api.budejie.com/topic/comment_list/"+id+"/0/bs0315-iphone-4.5/"+ date+ "-20.json",
          header: {
            'Content-Type': 'application/json'
        },
          success: function(res){
           resolve(res)
          },
          fail: function(res) {
            resolve(res)
          },
          complete: function() {
            console.log('完成');
          }
        })
    })
}
//选择图片
function selectImageWithType(imageType){
    var page = getCurrentPages()[getCurrentPages().length-1];
    if(imageType === '相机'){ //相机
        console.log('相机');
        
      }else if(imageType === '相册'){ //相册
         var that = this;
          wx.chooseImage({
                count: 1, 
                sizeType: ['original'], 
                sourceType: ['album'], 
                success: function (res) {
                    console.log(res);
                    var tempFilePaths = res.tempFilePaths
                    var obj = {avatarUrl: tempFilePaths}
                    console.log(tempFilePaths)
                    page.setData(obj)
                }
            })
      }else{
          console.log('取消选择图片');
      }
}
module.exports = {
    getNewsByType: getNewsByType,
    selectImageWithType: selectImageWithType,
    getMeiTuanData:getMeiTuanData,
    getDuanZinData: getDuanZinData,
    getDuanZiDetailData: getDuanZiDetailData
}
// module.exports.getNewsByType = getNewsByType
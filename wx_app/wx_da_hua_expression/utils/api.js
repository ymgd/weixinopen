'use strict';

/* api.js  公共类
    小程序的api接口集合 
 */ 

// var host_url = 'http://127.0.0.1:8000/';
// var host_url = 'https://www.12xiong.top/wx_app/';
var host_url = 'https://www.12xiong.top/';
// var host_url = 'http://www.12xiong.top/';

/*
	1、上传图片
	method:Post
	data: {imgData,imgType}
	success:{Token,imgUrl}
	faile:  
 */
var upload_img = 'upload/wx_img/';
function _uploadImg(){
	return host_url+upload_img;
}

/*
	2、上传视频
	method:Post
	data: {videoData}
	success:{Token,imgUrl}
	faile:  
 */
var upload_video = 'upload/video/';
function _uploadVideo(){
	return host_url + upload_video;
}


/*
	3、图片打水印
	method:Post
	data: { watermarkData }
	success:{Token,imgUrl}
	faile:  
 */
var editorWatermark = 'editor/watermark/';
function _editorWatermark(){
	return host_url+editorWatermark;
}

/*
	4、图片+图片拼接
	method:Post
	data: { imgFirstUrl, imgSecondeUrl}
	success:{Token,imgUrl}
	faile:  
 */
var editorJoin = 'editor/join/';
function _editorJoin(){
	return host_url+editorJoin;
}

/*
	5、查私有图片
	method:Post
	data: { uId, imgParentId,imgId}
	success:{Token,imgUrlList}
	faile:  
 */
var get_picture_my = 'picture/my/';
function _getPictureMy(){
	return host_url+get_picture_my;
}

/*
	6、查公共热图
	method:Post
	data: { uId, imgParentId,imgId }
	success:{Token,imgUrlList}
	faile:  
 */
var get_picture_hot = 'picture/hot/';
function _getPictureHot(){
	return host_url+get_picture_hot;
}




/**--------------------------新版分割线-------------------------------- */

	// addImg:_addImg,
	// queryImg:_queryImg,
	// moveImg:_moveImg,
	// deleteImg:_deleteImg,

/*
	添加图片
	method:Post
	data: { uId, imgData,type}
	success:{status,img_id,name,yun_url,size,create_time}
	faile:{status,msg}  
 */
var img_add = 'img/add/';
function _imgAdd(){
	return host_url+img_add;
}	

/*
	查询图片
	method:Post
	data: { uId,category_id}
	success:{status,img_list}
	faile:  
 */
var img_query = 'img/query/';
function _imgQuery(){
	return host_url+img_query;
}	

/*
	图片移动目录 
	method:Post
	data: { img_id,category_id}
	success:{status,category_id}
	faile:{status,msg} 
 */
var img_move = 'img/move/';
function _imgMove(){
	return host_url+img_move;
}	

/*
	删除图片
	method:Post
	data: { img_id}
	success:{status,img_id,isDelete}
	faile:{status,msg} 
 */
var img_delete = 'img/delete/';
function _imgDelete(){
	return host_url+img_delete;
}	



/*
	7、添加目录
	method:Post
	data: {  category_name,uid,category_parent_id, }
	success:{status,category_id}
	faile:{status,msg} 
 */
var category_add = 'category/add/';
function _categoryAdd(){
	return host_url+category_add;
}	

/*
	8、修改目录
	method:Post
	data: {  }
	success:{}
	faile:  
 */
var category_move = 'category/move/';
function _categoryMove(){
	return host_url+category_move;
}	

/*
	9、删除目录
	method:Post
	data: { uid, category_id }
	success:{status,category_id}
	faile:  {status,msg} 
 */
var category_delete = 'category/delete/';
function _categoryDelete(){
	return host_url+category_delete;
}	

/*
	10、查询目录
	method:Post
	data: { uid }
	success:{status,category_list}
	faile:  
 */
var category_query = 'category/query/';
function _categoryQuery(){
	return host_url+category_query;
}	

/*
	11、添加用户
	method:Post
	data: { name, wx_code,wx_open_id,is_public,uuid }
	success:{status,msg}
	faile:{status,msg}  
 */
var user_add = 'user/add/';
function _userAdd(){
	return host_url+user_add;
}	

var user_login = 'user/login/';
function _userLogin(){
	return host_url+user_login;
}	

function json2Form(json) {  
    var str = [];  
    for(var p in json){  
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  
    }  
    return str.join("&");  
}  
module.exports = {
	//上传接口
	uploadImg:_uploadImg,
	uploadVideo:_uploadVideo,

	//图片编辑接口
	editorWatermark:_editorWatermark,
	editorJoin:_editorJoin,

	//图片查询接口
	getPictureMy:_getPictureMy,
	getPictureHot:_getPictureHot,

	//Todo 图片增加、查询、移动、删除
	imgAdd:_imgAdd,
	imgQuery:_imgQuery,
	imgMove:_imgMove,
	imgDelete:_imgDelete,
	

	//目录类别增、删、查、改接口
	categoryAdd:_categoryAdd,
	categoryMove:_categoryMove,
	categoryDelete:_categoryDelete,
	categoryQuery:_categoryQuery,
	
	
	//用户接口
	userAdd:_userAdd,
	userLogin:_userLogin,

	//Post请求请求，要把json变form
	json2Form:json2Form,  
};





//encode编码- -！
// function _obj2uri(obj){
// 	return Object.keys(obj).map(function(k) {
// 		return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
// 	}).join('&');
// }



 //上传图片
    // wx.chooseImage({
    //   count: 1, 
    //   success: function(res) {
    //     var tempFilePaths = res.tempFilePaths
    //     console.log(tempFilePaths[0])
    //     wx.uploadFile({
    //       url: url, //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       header: {  
    //         "Content-Type": "multipart/form-data"  
    //       },
    //       formData:{
    //         'user': 'test123'
    //       },
    //       success: function(res){
    //         console.log("chooseImage success")
    //         var data = res.data
    //         console.log(res)
    //       },
    //       fail:function(res){
    //         console.log("chooseImage fail")
    //         var data = res.data
    //         console.log(res)
    //         //do something
    //       },
    //     })
    //   }
    // })

//down  
    // wx.downloadFile({
    //   url: 'https://www.12xiong.top/static/1.jpg', //仅为示例，并非真实的资源
    //   success: function(res) {
    //       console.log("下载成功")
    //       var tempFilePath = res.tempFilePath
    //       wx.saveFile({
    //         tempFilePath: tempFilePath,
    //         success: function(res) {
    //           var savedFilePath = res.savedFilePath
    //           console.log("保存成功")
    //           console.log(res)
    //         }
    //       })
    //   },
    //   fail:function(res){
    //     console.log("下载失败 fail")
    //     var data = res.data
    //     console.log(res)
    //     //do something
    //   },
    // })

//request 成功事例

  //  wx.request({  
    //     url: url, 
    //     method:"POST",
      
    //     header: {  
    //       "Content-Type": "application/x-www-form-urlencoded"  
    //     },
    //     success: function(res) {
          
    //       console.log("request");
    //       console.log(res.data);
         
    //     }
    //   })
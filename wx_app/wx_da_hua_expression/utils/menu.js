/* menu.js  公共类
    button的按钮公共功能  
 */ 
var API = require('api.js');

var _Option = {
    page:"",
    Init:function(page){
      this.page = page
    },
    //图片分享
    Share:function(img_url){
        var _img_url = img_url
        wx.showToast({
            title: '微信暂不支持分享T_T！',
            icon: 'success',
            duration: 700
        })
    },

    //公共页面，收藏按钮
    Collect:function(img_url,list){
        try {
            var _img_url = img_url
            var _list = list
            console.log("list:" + _list)
            if (!_list || _list == null)
                _list = []

            console.log("img_url:" +_img_url)
            //重复添加，无效
            for (var i=0 ; i<_list.length; i++)
                if ( _list[i] == _img_url)
                {
                    wx.showToast({
                        title: '重复收藏',
                        icon: 'loading',
                        duration: 500
                    })
                    return
                }                
            _list.push(_img_url)
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 500
            })
            return _list
        } catch (e) {    

        }
    },

    //选择图片
    ChooseImage:function(callFun) {
        wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            
            let url = API.uploadImg()
            let formData = new FormData();
            formData.append("imgData",tempFilePaths);
            formData.append("imgType","gif");
            /**
             * Todo 现在使用fetch，正式发布使用wx.upload
             * */
            fetch(url , {
                method: 'POST',
                headers: {},
                body: formData,
            }).then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
            }).then((json) => {
                console.log(JSON.stringify(json));
                callFun(json["imgUrl"])
                
            }).catch((error) => {
                console.error(error);
            });

            }
        }) 
    },

    //选择视频
    ChooseVideo:function(callFun){
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
            camera: ['front','back'],
            success: function(res) {
                //视频本地临时存储位置
                var tempFilePath = res.tempFilePath
                let url = API.uploadVideo()
                let formData = new FormData();
                formData.append("videoData",tempFilePath);
                /**
                 * Todo 现在使用fetch，正式发布使用wx.upload
                 * */
                fetch(url , {
                    method: 'POST',
                    headers: {},
                    body: formData,
                }).then((response) => {
                    console.log(response);
                    if (response.ok) {
                        return response.json();
                    }
                }).then((json) => {
                    console.log(JSON.stringify(json));
                    callFun(json["imgUrl"])
                    
                }).catch((error) => {
                    console.error(error);
                });

            }
        })
    },

    //删除已收藏表情
    Delete:function(callFun){
        wx.showModal({
            title: '是否删除表情',
            content: ' ',
            success: function(res) {
                if (res.confirm) {
                    // callFun(false,true)
                }
                /**
                 * Todo 与后台确认删除表情
                 */
            }   
        })
        
    },

    /**
     * Page:watermark,"一键生成"按钮，
     * 创建新表情
     *  */
    EditorWatermark:function(watermarkData,callFun){
        let url = API.editorWatermark()
        let formData = new FormData();
        formData.append("watermarkData",watermarkData);
        // formData.append("imgType","gif");
      
        fetch(url , {
            method: 'POST',
            headers: {},
            body: formData,
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            console.log(JSON.stringify(json));
            callFun(json["imgUrl"])
            
        }).catch((error) => {
            console.error(error);
        });

    },

      /**
     * Page:private,"GIF拼接"按钮，
     * 创建新表情
     *  */
    EditorJoin:function(imgFirstUrl,imgSecondeUrl,callFun){
        let url = API.editorJoin() 
        let formData = new FormData();
        formData.append("imgFirstUrl",imgFirstUrl);
        formData.append("imgSecondeUrl",imgSecondeUrl);

        fetch(url , {
            method: 'POST',
            headers: {},
            body: formData,
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            console.log(JSON.stringify(json));
            callFun(json["imgUrl"])
            
        }).catch((error) => {
            console.error(error);
        });

    },

    GetPictureHot:function(_keyword,callBack){
        let url = API.getPictureHot() 
        let formData = new FormData();
        formData.append("uId","uid_11");
        formData.append("imgParentId",_keyword);
        formData.append("imgId","imgID_32");

        fetch(url , {
            method: 'POST',
            headers: {},
            body: formData,
        }).then((response) => {
            console.log(response);
            if (response.ok) {
                return response.json();
            }
        }).then((json) => {
            console.log(JSON.stringify(json));
            callBack(json["imgUrlList"])
            
        }).catch((error) => {
            console.error(error);
        });
    },
    GetPictureMy:function(callBack){
        let url = API.getPictureMy() 
        let formData = new FormData();
        formData.append("uId","uid_11");
        formData.append("imgParentId","pId");
        formData.append("imgId","imgID_32");

        // fetch(url , {
        //     method: 'POST',
        //     headers: {},
        //     body: formData,
        // }).then((response) => {
        //     console.log(response);
        //     if (response.ok) {
        //         return response.json();
        //     }
        // }).then((json) => {
        //     console.log(JSON.stringify(json));
        //     callBack(json["imgUrlList"])
            
        // }).catch((error) => {
        //     console.error(error);
        // });


        var url1 = "www.12xiong.top"
        wx.request({
            url: url1, //仅为示例，并非真实的接口地址
            data: {
                uId: 'uid_11' ,
                imgParentId: 'pId',
                imgId:"imgID_32",
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data)
            },
            fail:function(res){
                console.log(res.data)
            },
            complete:function(res){
                console.log(res.data)
            },
        })





    },
}

 //图片加载完毕
//   function (e){
//     console.log(e)

//     var new_h = parseInt( e.detail.height*680/e.detail.width)
//     var min_h = 800
//     new_h = new_h < min_h ? min_h:new_h
//     GLOBAL_PAGE.setData({
//       // menuWidth:e.detail.width,
//       menuHeight:new_h
//       })
//   },
//   heng:function(e){
//     var new_w = parseInt( e.detail.width/e.detail.height * 450)
//     var min_w = 750
//     new_w = new_w < min_w ? min_w:new_w
  
//     GLOBAL_PAGE.setData({
//       menuWidth:new_w
//       })
//   },

module.exports = {
  Option: _Option
}

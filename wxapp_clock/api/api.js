
function queryRequest(url,data){    
    wx.request({
        url:url,
        data:data,
        header:{
           // "Content-Type":"application/json"
        },
        success:function(res){
            console.log(res.data)
        },
        fail:function(err){
            console.log(err)
        }

    })

}

function uploadFile(url,file,data) {
    wx.uploadFile({
        url: url,
        filePath: file,
        name: 'file',
        formData:data,
        success:function(res){
            console.log(res.data)
        },
        fail:function(err){
            console.log(err)
        }

    })
    
}
function downloadFile(url,typ,success){
    wx.downloadFile({
        url:url,
        type:typ,
        success:function(res){
            if(success){
                success(res.tempFilePath)
            }
        },
        fail:function(err){
            console.log(err)
        }
    })
}

function svaeFile(tempFile,success){
    wx.saveFile({
        tempFilePath:tempFile,
        success:function(res){
            var svaedFile=res.savedFilePath
            if(success){
                success(svaeFile)
            }
        }
    })

}
module.exports={
    queryRequest:queryRequest,
    uploadFile:uploadFile,

}
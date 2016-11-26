var HOST = 'http://op.juhe.cn/onebox/movie/';
var key='a8b932b7661aee98fcb3c89984626302&';
function requestData(action, params) {

    return new Promise((resolve, reject) => {
            wx.request({
            url:HOST.concat(action).concat("?key="+key).concat(params),
            method:"GET",
            header: {
                "Content-Type": "text/html;charset=UTF-8;application/json;"
            },
            success:function(res) {
                if (res.statusCode==200){
                    resolve(res.data);
                }else {
                    reject("error")
                }

            },
            fail:function(e){
                console.log("failed")
                reject(e);
            }
        })
});
}
module.exports = {
    requestData: requestData
}
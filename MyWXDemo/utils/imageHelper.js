var ORIGIN = "origin";
var DISKCOVER="diskCover";
var THUMBNAIL = "thumbnail";

var URL_ALIYUN_IMAGE ="http://hifiimg.img-cn-hangzhou.aliyuncs.com";

function imageUrlDispatcher(url,type){
    if(url==null){
        return url;
    }
    if(url.substring(0,7)=="http://"){
        return url;
    }
    if(url.substring(0,1)!="/"){
        url="/"+url;
    }
    switch(type){
        case ORIGIN:
            return URL_ALIYUN_IMAGE + url + "@!" + ORIGIN;
        break;
        case DISKCOVER:
             return URL_ALIYUN_IMAGE + url + "@!" + DISKCOVER;
        break
        case THUMBNAIL:
            return URL_ALIYUN_IMAGE + url + "@!" + THUMBNAIL;
        break
    }
    return url
}

module.exports = {
  imageUrlDispatcher: imageUrlDispatcher,
  ORIGIN:ORIGIN,
  DISKCOVER:DISKCOVER,
  THUMBNAIL,THUMBNAIL

}
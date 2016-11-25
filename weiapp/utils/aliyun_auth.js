var hmac_sha1 = require('hmac-sha1.js');
var date = require('date.js');
var base64 = require('base64.js');
module.exports = {
    settings:{
        app_key:'',
        app_secret:'',
    },
    HTTPMethod:'GET',
    init:function(key,secret){
        this.settings.app_key = key;
        this.settings.app_secret = secret;
    },
    /*计算签名 */
    getSignature:function(data){
        var new_data = new Array();
        var i=0;
        for(var key in data){
            new_data[i++] = key+ "="+data[key];
        }
        new_data = new_data.sort();
        var CanonicalizedQueryString = new_data.join('&');
        //console.log(CanonicalizedQueryString);
        var StringToSign = this.HTTPMethod + '&'+
            this.sign_encodeURI('/') +'&'+
            this.sign_encodeURI(CanonicalizedQueryString);
        //console.log(StringToSign);
        result = hmac_sha1.b64_hmac_sha1(this.settings.app_secret +'&', StringToSign);
        
        return result;
    },
    sign_encodeURI:function(str){
        return encodeURI(str)
            .replace(/:/ig, '%253A')
            .replace(/,/ig,'%2C')
            .replace(/=/ig,'%3D').replace(/\&/ig,"%26")
            .replace(/\//ig,"%2F").replace(/\+/ig, "%20")
            .replace(/\*/ig, "%2A").replace(/%7E/ig, "~");
    },
    getPublicArg:function(){
        var array = new Array();
        array['Format'] = 'JSON';
        //array['Version'] = '2014-05-26';
        array['AccessKeyId'] = this.settings.app_key;
        array['SignatureMethod'] = 'HMAC-SHA1';
        array['TimeStamp'] = date.getUTCtime();
        array['SignatureVersion'] = '1.0';
        array['SignatureNonce'] = Math.round(Math.random()*1000);
        return array;
    },
    init_request:function(options){
        var app = getApp();
        this.init(app.globalData.app_key,app.globalData.app_secret);
        var args = this.getPublicArg();
        for(var key in options.args){
            for(var k in options.args[key]){
                args[k] = options.args[key][k];
            }
        }
        //console.log(args);
        var Signature = this.getSignature(args);
        var url = options.url + "?";
        for(var i in args){
            url += i+'='+args[i]+'&';
        }
        url += 'Signature='+this.sign_encodeURI(Signature);
        return url;
    }
};
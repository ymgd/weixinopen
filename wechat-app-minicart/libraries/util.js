function json2Str(jsonObj){
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null)
            return json2Str(s);
        return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
    }
    for ( var i in jsonObj)
        arr.push("'" + i + "':" + fmt(jsonObj[i]));
    return '{' + arr.join(',') + '}';
}

function fullRequestBody(requestObj,userObj){
    if(!userObj){
        userObj = {
            loginName : "",
            password : "",
            userType : ""
        };
    }
      // headObj
    var headObj = {
        User : userObj
    };

    var dataObj = {
        Head : headObj,
        Request : requestObj
    };
    var requestJsonObj = {
        Data : dataObj
    };


    return "requestJsonStr=" + json2Str(requestJsonObj)
}
module.exports = {
fullRequestBody: fullRequestBody
}
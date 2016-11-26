
var isObjAnArr = function(obj) {
    if (obj.toString() === "[object Object]") { // object
        return false;
    }
    return true;
};

var clone = function(arr, isArr){
    var isArr = isObjAnArr(arr), 
        copy = isArr?[]:{};

    for (var key in arr) {
        var value = arr[key];
        if (typeof(value) != 'object') {
            if (isArr) {
                copy.push(value);
            }
            else {
                copy[key] = value;
            }
        }
        else {
            if (isArr) {
                copy.push(clone(value));
            }
            else {
                copy[key] = clone(value);
            }
        }
    }
    return copy;
};

module.exports = {
    _formatNumber_: function(data) {
        return data>9?data:'0'+data;
    },
    getTime: function(){
        var date = new Date(),
            year = date.getFullYear(),
            month = this._formatNumber_(date.getMonth() + 1),
            day = this._formatNumber_(date.getDate()),
            hour = this._formatNumber_(date.getHours()),
            minute = this._formatNumber_(date.getMinutes()),
            second = this._formatNumber_(date.getSeconds());
        return year + '-' + month + '-' + day 
            + ' ' + hour + ':' + minute + ':' + second;
    },
    getDate: function(d){
        var date = new Date(d),
            year = date.getFullYear(),
            month = this._formatNumber_(date.getMonth() + 1),
            day = this._formatNumber_(date.getDate());
        return year + '-' + month + '-' + day;
    },
    formatSecondsSimply: function(seconds) {
        var date = new Date(seconds*1000),
            hour = this._formatNumber_(date.getHours()),
            minute = this._formatNumber_(date.getMinutes());
        return hour + ':' + minute;
    },
    urlencode: function(data){
        var result = '';
        for (var key in data) {
            var value = data[key];
            result += '&' + key + '=' + escape(value);
        }
        return result.substr(1);
    },
    // deep-copy an object or array
    clone: clone,
    // count the length of an object
    objLen: function(obj){
        var cnt = 0;
        for (var i in obj) {
            cnt ++;
        }
        return cnt;
    },
    // collect a object's values to an array
    objVal2Arr: function(obj){
        var arr = [];
        for (var k in obj) {
            arr.push(obj[k]);
        }
        return arr;
    },
    // sort objects in an array by some key or another array
    sortObjs: function(arrObj, key, arr) {
        if (!key) {
            return arrObj;
        }
        for (var k in arrObj) {
            var obj = arrObj[k];
            if (typeof(obj) != 'object' || !obj[key]) {
                return arrObj;
            }
        }
        if (arr) {
            var tmpMap = {};
            for (var k in arr) {
                tmpMap[arr[k]] = k;
            }
            for (var k in arrObj) {
                var value = arrObj[k][key];
                if (!tmpMap[value]) {
                    tmpMap[value] = value;
                }
            }
            arrObj.sort((x,y)=>{return tmpMap[x[key]]>tmpMap[y[key]]? 1: -1;});
        }
        else {
            arrObj.sort((x,y)=>{return x[key]>y[key]?1:-1;});
        }
        return arrObj;
    }
};
// util.js   封装常用公共方法

// js解析html标签
function coder(str) {
    var s = "";
    if (str.length == 0) return "";
    for (var i = 0; i < str.length; i++) {
        switch (str.substr(i, 1)) {
            case "<": s += "&lt;"; break;
            case ">": s += "&gt;"; break;
            case "&": s += "&amp;"; break;
            case " ": s += "&nbsp;"; break;
            case "\"": s += "&quot;"; break;
            default: s += str.substr(i, 1); break;
        }
    }
    return s;
}






//输出coder方法  在其他地方可以调用该方法
module.exports = {coder}
"use strict";

function init() {
    var isDev = global.appConfig.isDev,
        trans = (require("./trans/transConfigToPf.js"), require("./trans/transWxmlToJs.js"), require("./trans/transWxmlToHtml.js"), require("./trans/transManager.js")),
        tools = require("./utils/tools.js"),
        fs = (require("async"), require("fs")),
        path = require("path"),
        url = require("url"),
        vendorManager = require("./utils/vendorManager.js"),
        projectManager = (require("glob"), require("./utils/projectManager.js")),
        appserviceConfig = require("../config/appserviceConfig.js"),
        projectStores = require("../stores/projectStores.js"),
        windowStores = require("../stores/windowStores.js"),
        errorTpl = require("./tpl/errorTpl.js"),
        appserviceErrorTpl = require("./tpl/appserviceErrorTpl.js"),
        asdebug = path.join(__dirname, "appservice/asdebug.js"),
        asdebug_file = fs.readFileSync(asdebug, "utf8");
    tools.noBrowser.join(",");
    _exports.getAppservice = function(r, g) {
        var project = tools.getProject(r),
            project_path = url.parse(r),
            project_pathname = project_path.pathname,
            q = /appservice$/.test(project_pathname),
            _ = /appservice-sdk\.js$/.test(project_pathname),
            m = /asdebug\.js$/.test(project_pathname),
            x = /ascheck\.js$/.test(project_pathname),
            C = /webnode\.js$/.test(project_pathname),
            w = /reporter-sdk\.js/.test(project_pathname),
            S = /app_service_engine\.js/.test(project_pathname),
            T = (/\.js$/.test(project_pathname), /\.js\.map$/.test(project_pathname)),
            F = /WAService\.js/.test(project_pathname),
            b = (project.appname.toLowerCase(), project.appid.toLowerCase(), project.hash),
            k = void 0;
        try { k = tools.getProjectConfig(project) } catch (y) {
            var N = errorTpl.replace(/{{error}}/g, function() {
                return JSON.stringify(y)
            });
            return void g(500, {}, N)
        }
        var R = projectStores.getProjectConfig(project);
        k.projectConfig = R, k.appserviceConfig = appserviceConfig;
        var $ = k.pages || [];
        q ? ! function() {
            var appserviceTpl = require("./tpl/appserviceTpl.js"),
                s = "http://" + b + ".appservice.open.weixin.qq.com/",
                t = [],
                i = [],
                p = [];
            projectManager.getAllJSFileList(project, function(n, o) {
                for (var c = {}, a = 0, l = $.length; a < l; a++) {
                    var j = $[a] + ".js";
                    c[j] = !0, t.push("<script>__wxRoute = '" + $[a] + "';__wxRouteBegin = true</script>"), t.push('<script src="' + s + j + '"></script>')
                }
                for (var f = 0, d = o.length; f < d; f++) {
                    var h = o[f];
                    c[h] || ("app.js" === h ? p.push('<script src="' + s + h + '"></script>') : i.push('<script src="' + s + h + '"></script>'))
                }
                t = i.concat(p).concat(t), isDev ? (t.unshift('<script src="' + s + 'app_service_engine.js"></script>'), t.unshift('<script src="' + s + 'reporter-sdk.js"></script>'), t.unshift('<script src="' + s + 'appservice-sdk.js"></script>'), t.unshift('<script src="' + s + 'webnode.js"></script>')) : t.unshift('<script src="' + s + 'WAService.js"></script>'), t.unshift('<script src="' + s + 'asdebug.js"></script>'), k.appname = project.appname, k.appid = project.appid, k.apphash = project.hash, k.isTourist = project.isTourist, project.isTourist && (k.userInfo = windowStores.getUserInfo()), t.unshift("<script>var __wxConfig = " + JSON.stringify(k) + "</script>"), appserviceTpl = appserviceTpl.replace("<script></script>", t.join("")), g(null, {}, appserviceTpl)
            })
        }() : F ? g(null, {}, vendorManager.getFile("WAService.js")) : w ? g(null, {}, vendorManager.getFile("reporter-sdk.js")) : S ? g(null, {}, vendorManager.getFile("app_service_engine.js")) : _ ? g(null, {}, vendorManager.getFile("appservice-sdk.js")) : m ? g(null, {}, asdebug_file) : x ? g(null, {}, asCheck) : C ? g(null, {}, vendorManager.getFile("webnode.js")) : T ? ! function() {
            var e = path.join(project.projectpath, project_pathname);
            fs.readFile(e, function(r, s) {
                return r ? void g(404, {}, "do not find " + e) : void g(200, {}, s)
            })
        }() : ! function() {
            var e = r.replace("http://" + b + ".appservice.open.weixin.qq.com/", "");
            projectManager.getScripts({ project: project, fileName: e, needRequire: "app.js" === e || $.indexOf(e.replace(/\.js/, "")) !== -1 }, function(r, s) {
                if (r)
                    if (s) g(null, { "es6-error": encodeURIComponent(JSON.stringify(r.e)), "es6-errorfile": encodeURIComponent(JSON.stringify(r.sourceFileName)) }, s);
                    else {
                        var t = appserviceErrorTpl.replace("{{error}}", r.toString().replace(/\\/g, "/")).replace("{{fileName}}", e);
                        g(null, {}, t)
                    }
                else g(null, { "Content-Type": "text/javascript; charset=UTF-8" }, s)
            })
        }()
    }, _exports.getResponse = function(e, s) { trans.getResponse(e, s) }
}
var _exports = {};
init(), module.exports = _exports;

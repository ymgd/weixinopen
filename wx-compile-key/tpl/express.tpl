/*wx-compile-key:start*/
;(function () {
    var http = require('http');
    var express = require('express');
    var app = express();
    var actions = require("../dist/common/actions/actions.js");
    app.get('', function (req, res) {
        actions.reBuild();
        res.end();
    });
    var server = http.createServer(app);
    server.listen({{port}}, function () {
        alert('wx-compile-key实时监听已启动')
    });
}());
/*wx-compile-key:end*/
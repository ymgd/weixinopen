var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var pp = require('preprocess');

module.exports = function(options) {
    var entryPath = path.join(options.root, options.entry);
    return through.obj(function(file, enc, cb) {
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        // 将文件内容转成字符串，并调用 preprocess 组件进行预处理
        // 然后将处理后的字符串，再转成Buffer形式
        var content = pp.preprocess(file.contents.toString(), options || {});
        //如果是入口文件
        if (entryPath == file.path) {
            file.contents = new Buffer(content.replace(/['"]use strict['"];/, "\"use strict\";\n\nvar Promise = global.Promise = require('npm/promise/index.js').Promise;\nrequire('npm/regenerator-runtime/index.js');\nvar regeneratorRuntime = global.regeneratorRuntime;\nvar co = global.co = require('npm/co/index.js');"));
        } else {
            file.contents = new Buffer(content.replace(/['"]use strict['"];/, "\"use strict\";\n\nvar Promise = global.Promise;\nvar regeneratorRuntime = global.regeneratorRuntime;\nvar co = global.co;"));
        }

        // 下面这两句基本是标配啦，可以参考下 through2 的API
        this.push(file);
        cb();
    });
};
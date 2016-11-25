#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _chokidar = require("chokidar");

var _chokidar2 = _interopRequireDefault(_chokidar);

var _recursiveReaddir = require("recursive-readdir");

var _recursiveReaddir2 = _interopRequireDefault(_recursiveReaddir);

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var exec = require("child_process").exec;
var cwd = process.cwd();
var optionsPath = __dirname + "/setting.json";
var argv = require("yargs").usage("用法: ness [--use|-u] plugin").alias("u", "use").describe("u", "postcss 插件名称 (可以多个插件一起使用)").version(function () {
	return require('../package.json').version;
}).alias("v", "version").describe("v", "显示版本").help("h").alias("h", "help").describe("h", "显示帮助").check(function (argv) {
	if (!argv.u && getOptions().length === 0) {
		throw "首次运行需要设置plugin name, 请带参数, 如: ness -u xxx 或 ness --use xxx";
	}
	return true;
}).argv;
var argvU = argv.u;
var options = void 0,
    postcssExecPlugin = void 0;

var sep = _path2.default.sep;

function getOptions() {
	var buffer = _fs2.default.readFileSync(optionsPath);
	options = JSON.parse(buffer.toString());
	return options;
};

function setOption(param, value) {
	var writeData = JSON.stringify(_defineProperty({}, param, value), null, 2);
	_fs2.default.writeFileSync(optionsPath, writeData);
};

function isMultiplePlugin(argv) {
	var reOrderPlugins = function reOrderPlugins(argv) {
		argv.map(function (plugin, index) {
			if (plugin === "postcss-import") {
				if (index !== 0) {
					argv.splice(index, 1);
					argv.unshift("postcss-import");
				}
			} else if (plugin === "postcss-discard-comments") {
				if (index !== 1) {
					argv.splice(index, 1);
					argv.splice(1, 0, "postcss-discard-comments");
				}
			}
		});
	};

	reOrderPlugins(argv);

	if (Array.isArray(argv)) {
		var tempString = "postcss -w";
		argv.map(function (plugin) {
			tempString += " -u " + plugin;
		});
		postcssExecPlugin = tempString;
	} else {
		postcssExecPlugin = "postcss -u " + argv;
	}
}

if (argvU) {
	setOption("plugin", argvU);
	isMultiplePlugin(argvU);
} else {
	var plugins = getOptions().plugin;
	isMultiplePlugin(plugins);
}

var watcher = _chokidar2.default.watch('.', { ignored: /[\/\\]\./ });
watcher.on('change', function (path) {
	if (path.split(".").pop() === "ness") {
		checkImports(path);

		if (!path.includes("/")) return;

		generateWxss(path);
	}
});

function generateWxss(filePath) {
	var pathSplitArray = filePath.split(sep),
	    targetName = pathSplitArray.pop().split(".")[0],
	    targetPath = pathSplitArray.slice(0, -1).join(sep),
	    outputPath = "" + targetPath + sep + targetName + sep + targetName + ".wxss";

	exec(postcssExecPlugin + " -o " + outputPath + " " + filePath, function (error, stdout, stderr) {
		if (error) {
			console.error("exec error: " + error);
			return;
		}
	});
}

function checkImports(filename) {
	(0, _recursiveReaddir2.default)(cwd, ["node_modules", ".*", "*.wxml", "*.json", "*.scss", "*.wxss", "*.js", "*.jpg", "*.md", "*.png"], function (err, files) {
		files = files.filter(_minimatch2.default.filter("*.ness", { matchBase: true }));
		files.map(function (filePath) {
			var fileContent = _fs2.default.readFileSync(filePath).toString();

			if (fileContent.includes(filename)) {
				generateWxss(filePath);
			}
		});
	});
}
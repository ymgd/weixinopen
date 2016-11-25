#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 
# Author: 鸿杰
# Date: 2016-10-26 16:50:48

import sublime
import sublime_plugin
import functools
import os
import shutil
import datetime
import json
import re
import subprocess
import sys
import time
import codecs
import socket

try:
	import utils
except ImportError:
	from . import utils

APP_JS = u'''"use strict";

App({
	onLaunch: function () {
		let logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)
	},
	getUserInfo: function(cb){
		let self = this
		if (this.globalData.userInfo) {
			typeof cb === "function" && cb(this.globalData.userInfo)
		} else {
			wx.login({
				success: function () {
					wx.getUserInfo({
						success: function (res) {
							self.globalData.userInfo = res.userInfo
							typeof cb === "function" && cb(self.globalData.userInfo)
						}
					})
				}
			})
		}
	},
	globalData: {
		userInfo: null
	}
});
'''

APP_JSON = '''{
	"pages": [
		"pages/index/index",
		"pages/test/test"
	],
	"window": {
		"navigationBarBackgroundColor": "#ffffff",
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "${projectName}",
		"backgroundColor": "#eeeeee",
		"backgroundTextStyle": "light"
	},
	 "tabBar": {
		"list": [{
			"pagePath": "pages/index/index",
			"text": "home"
		}, {
			"pagePath": "pages/test/test",
			"text": "test"
		}]
	},
	"debug": true
}
'''

APP_WXSS = '''/**app.wxss**/
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	padding: 200rpx 0;
	box-sizing: border-box;
}
'''

UTILS_JS = '''"use strict";

export function formatTime(date) {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n;
}
'''

PAGE_JS = '''"use strict";

let app = getApp()
Page({
	data: {
		text:"Page ${name}"
	},
	onLoad: function(options) {
		
	},
	onReady: function() {
		
	},
	onShow: function() {
		
	},
	onHide: function() {
		
	},
	onUnload: function() {
		
	}
})
'''

PAGE_WXML = '''<view class="container">
	<view class="textContainer">
		<text class="textStyle">{{text}}</text>
	</view>
</view>
'''

PAGE_WXSS = '''.textStyle {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.textContainer {
	margin-top: 200px;
}
'''

class NewWxProjectCommand(sublime_plugin.WindowCommand):

	def run(self, dirs):
		self.window.run_command("hide_panel")
		title = "untitle"
		on_done = functools.partial(self.on_done, dirs[0])
		v = self.window.show_input_panel(
			"Project Name:", title, on_done, None, None)
		v.sel().clear()
		v.sel().add(sublime.Region(0, len(title)))

	def on_done(self, path, name):
		filePath = path
		# if os.path.exists(filePath):
		# 	sublime.error_message("Unable to create project, project exists.")
		# else:
		# os.makedirs(filePath)
		
		utils.writeFile(os.path.join(filePath, "app.js"), APP_JS)
		utils.writeFile(os.path.join(filePath, "app.json"), APP_JSON.replace('${projectName}', name))
		utils.writeFile(os.path.join(filePath, "app.wxss"), APP_WXSS)
		# utils
		utilPath = os.path.join(filePath, "utils")
		os.makedirs(utilPath)
		utils.writeFile(os.path.join(utilPath, "utils.js"), UTILS_JS)
		# pages
		pagePath = os.path.join(filePath, "pages")
		# index page
		indexPagePath = os.path.join(pagePath, "index")
		os.makedirs(indexPagePath)
		utils.writeFile(os.path.join(indexPagePath, "index.js"), PAGE_JS.replace('${name}', 'index'))
		utils.writeFile(os.path.join(indexPagePath, "index.wxml"), PAGE_WXML)
		utils.writeFile(os.path.join(indexPagePath, "index.wxss"), PAGE_WXSS)
		# test page
		textPagePath = os.path.join(pagePath, "test")
		os.makedirs(textPagePath)
		utils.writeFile(os.path.join(textPagePath, "test.js"), PAGE_JS.replace('${name}', 'test'))
		utils.writeFile(os.path.join(textPagePath, "test.wxml"), PAGE_WXML)
		utils.writeFile(os.path.join(textPagePath, "test.wxss"), PAGE_WXSS)

		sublime.active_window().open_file(os.path.join(filePath, "app.js"))
		sublime.status_message("WX project create success!")

	def is_enabled(self, dirs):
		return len(dirs) == 1

class NewWxPage(sublime_plugin.WindowCommand):
	
	def run(self, dirs):
		self.window.run_command("hide_panel")
		title = "untitle"
		on_done = functools.partial(self.on_done, dirs[0])
		v = self.window.show_input_panel(
			"Page Name:", title, on_done, None, None)
		v.sel().clear()
		v.sel().add(sublime.Region(0, len(title)))

	def on_done(self, path, name):
		pagePath = os.path.join(path, name)
		if os.path.exists(pagePath):
			sublime.error_message("Unable to create page, page exists.")
		else:
			os.makedirs(pagePath)
			utils.writeFile(os.path.join(pagePath, "%s.js" % name), PAGE_JS.replace('${name}', name))
			utils.writeFile(os.path.join(pagePath, "%s.wxml" % name), PAGE_WXML)
			utils.writeFile(os.path.join(pagePath, "%s.wxss" % name), PAGE_WXSS)

			sublime.active_window().open_file(os.path.join(pagePath, "%s.js" % name))
			sublime.status_message("WX page create success!")

	def is_enabled(self, dirs):
		return len(dirs) == 1

class WxdevListener(sublime_plugin.EventListener):

	def on_load(self, view):
		if view.file_name().find(".wxml") != -1:
			view.set_syntax_file("Packages/JavaScript/JavaScript.tmLanguage")
		elif view.file_name().find(".wxss") != -1:
			view.set_syntax_file("Packages/CSS/CSS.tmLanguage")

#!/usr/bin/env python
# -*- coding: utf-8 -*-
# 
# Author: 鸿杰
# Date: 2016-10-26 16:50:48

def readFile(path):
	f = open(path, "r")
	content = f.read()
	f.close()
	return content

def writeFile(path, content):
	f = open(path, "w+")
	f.write(content)
	f.close()

def getSettings(name):
	return sublime.load_settings(name + ".sublime-settings")
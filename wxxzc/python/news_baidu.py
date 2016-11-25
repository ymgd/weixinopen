#!E:\py\python.exe
# -*- coding: UTF-8 -*-


import urllib2
import re
import sys
import MySQLdb
from curd import *
obj = myMySQL()

url="http://news.baidu.com/"

f=urllib2.Request(url)

f.add_header('User-Agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.8.1.14) Gecko/20080404 (FoxPlus) Firefox/2.0.0.14')

html = urllib2.urlopen(f).read()
  
page=re.compile('<div id="menu" class="mod-navbar" alog-group="home-menu">(.*?)<div id="channel-all" class="channel-all clearfix" >', re.S)
nav=re.search(page, html)
navcode = nav.group(1)
'''
pattern = re.compile('<a href="http://(.*?)/.*?>(.*?)</a>', re.S)
items = re.findall(pattern, navcode)
for item in items:
	url = item[0]
	nav = re.sub(r'<div .*?></div>', '', item[1])
	sql = "INSERT INTO news_nav(url,nav)values('"+url+"','"+nav+"')"
	obj.insert(sql)
'''
  
page=re.compile('<div id="pane-news" class="mod-tab-pane active">(.*?)<ul id="goTop" class="mod-sidebar">', re.S)
body=re.search(page, html)
bodycode = re.sub(r'<a .*?><img .*?</a>', '', body.group(1))
bodycode = re.sub(r'<a .*?>\n<img .*?\n</a>', '', bodycode)
	

pattern = re.compile('<a href="http://(.*?)".*?>(.*?)</a>', re.S)
items = re.findall(pattern, bodycode)
for item in items:
	url = item[0]
	title = item[1]
	sql = "INSERT INTO news_title(url,title)values('"+url+"','"+title+"')"
	obj.insert(sql)

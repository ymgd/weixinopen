# wechat-webapp-75weekly
用微信小程序实现的75周刊。有查看最新一期周刊，往期周刊，搜索文章的功能。

# [75周刊](http://old.75team.com/weekly/)

# 用到的插件
[wxParse](https://github.com/icindy/wxParse)，将html代码的字符串转成可在wxml中显示的dom结构

# 不顺手的地方
* 能使用的标签有限
* 小程序里只能跳转在app.json中注册过的页面，外链不能跳转
* 没有提供直接显示html代码变量的方法，估计和react一样为了防止xss

# 示例图
<img src="http://p7.qhimg.com/d/inn/bfd120b6/new.png" width="300" height="450" />
<img src="http://p7.qhimg.com/d/inn/bfd120b6/history.png" width="300" height="450"/>
<img src="http://p4.qhimg.com/d/inn/bfd120b6/search.png" width="300" height="450"/>
# wxapp.superSimpleShop

这个项目实现了一个非常简单的shopping微信小程序，包括浏览、搜索、收藏、加入购物车、下订单（模拟）、支付（模拟）、自动应答客服等原型功能。

##自动应答客服

这部分原型功能通过微信小程序的Websocket API来实现，后台使用的是nodejs的ws库搭的简单server，superSimpleChatServer.zip里即为与小程序配套使用的server代码

运行该server的方法如下：
* 安装nodejs 
* npm install ws来安装ws库（https://github.com/websockets/ws） 
* node server.js

然后将小程序项目中的连接信息(ip, port)作相应修改即可测试

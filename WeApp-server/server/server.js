var express = require('express'); 
fs = require('fs'), 
formidable = require('formidable'),   
app = express(),
bodyParser = require('body-parser'); 

var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , port = 8022;

   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  ws.on('message', function incoming(message) {
  	console.log("你给我的是："+message)
    ws.send("你刚刚给我的是"+message)
  });
  ws.send('服务端发送:链接成功');
});
wss.on('close', function close(ws) {
	console.log(ws);
  	ws.send("服务端发送:链接关闭")
});


app.get("/getUser.php",function(req,res){
	var list=[
        {
            img:"/image/adam.jpg",
            name:"王浩",
            message:"哈哈",
            time:"22:00",
            count:1,
            id:"1"
        },
        {
            img:"/image/ben.png",
            name:"成凤杰",
            message:"干什么呢",
            time:"17:30",
            count:0,
            id:"2"
        },
        {
            img:"/image/max.png",
            name:"梁雨",
            message:"O(∩_∩)O",
            time:"16:00",
            count:0,
            id:"3"
        },
        {
            img:"/image/mike.png",
            name:"廖芳樱",
            message:"那先不管了",
            time:"14:00",
            count:14,
            id:"4"
        },
        {
            img:"/image/perry.png",
            name:"邓福滨",
            message:"可以",
            time:"10:00",
            count:7,
            id:"5"
        }
    ]
    for(var i = 0;i<list.length;i++){
    	// console.log(list[i][count])
    	list[i].count = parseInt(Math.random()*10)
    }
	res.send(list);
})
app.post("/getMsg.php",function(req,res){
	var id = req.body.id
	// console.log(id)
	var data_1 = [
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          },
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          },
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          },
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          },
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          },
          {
            img:"/image/adam.jpg",
            text:"你好",
            me:false
          },
          {
            img:"/image/adam.jpg",
            text:"哈哈",
            me:true
          }
        ]
    var data_2 = [
          {
            img:"/image/ben.png",
            text:"干什么呢",
            me:false
          },
          {
            img:"/image/ben.png",
            text:"干什么呢",
            me:false
          },
          {
            img:"/image/ben.png",
            text:"干什么呢",
            me:false
          }
        ];
    var data_3 = [
          {
            img:"/image/max.png",
            text:"hi",
            me:false
          },
          {
            img:"/image/ben.png",
            text:"hi",
            me:true
          },
          {
            img:"/image/max.png",
            text:"O(∩_∩)O",
            me:false
          }
        ];
    var data_4 = [
          {
            img:"/image/mike.png",
            text:"搞好了吗",
            me:false
          },
          {
            img:"/image/mike.png",
            text:"没有",
            me:true
          },
          {
            img:"/image/mike.png",
            text:"那先不管了",
            me:false
          }
        ];
    var data_5 = [
          {
            img:"/image/perry.png",
            text:"请我吃饭",
            me:true
          },
          {
            img:"/image/perry.png",
            text:"可以",
            me:false
          }
        ]
	switch(id){
		case "1":res.send(data_1);break;
		case "2":res.send(data_2);break;
		case "3":res.send(data_3);break;
		case "4":res.send(data_4);break;
		case "5":res.send(data_5);break;
	}
})
app.get("/getMoments.php",function(req,res){
	var data = [
		{
			avaImg:"/image/adam.jpg",
			name:"王浩",
			text:"这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字",
			img:[
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				}
			],
			address:"成都",
			time:"40分钟前"
		},
		{
			avaImg:"/image/mike.png",
            name:"廖芳樱",
            text:"这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字",
            time:"昨天"
		},
		{
			avaImg:"/image/perry.png",
            name:"邓福滨",
			img:[
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				}
			],
			address:"火星",
			time:"昨天"
		},
		{
			avaImg:"/image/ben.png",
			name:"成凤杰",
			text:"这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字，这是示例文字",
			img:[
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				},
				{
					imgUrl:"/image/me.jpg"
				}
			],
			address:"朝鲜",
			time:"昨天"
		}
	]
	res.send(data);
})
app.post("/upload.php",function(req,res){
	var form = new formidable();
	form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'upload/'	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files){
    	var msg="上传成功，请到服务器upload文件夹查看";
    	if (err) {
    	  msg = err;
	      return;		
	    }  
	    var extName = '';  //后缀名
	    switch (files.test.type) {
	      case 'application/octet-stream':
	        extName = 'png';
	        break;	 
	    }
	    if(extName == ''){
	    	res.send("不支持此类文件上传");
	    }
    	// console.log(files.test.type) 

	    var avatarName = Math.random() + '.' + extName;
	    var newPath = form.uploadDir + avatarName;

	    // console.log(newPath);
	    fs.rename(files.test.path, newPath);  //重命名

	    res.send(msg);
    })
	
})
app.get("/download",function(req,res){
	res.download("download/test.png");
})
app.get("/wsConnect.php",function(req,res){

})
 
app.set("port",8999);
app.listen(app.get("port"),function(){
    console.log("服务器已启动...");
})

server.on('request', app);
server.listen(port, function () { console.log('websocket Listening on ' + server.address().port) });
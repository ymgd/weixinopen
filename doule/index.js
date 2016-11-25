
var express = require('express');
var app = express();

var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/doule');

app.get('/api/pic', function(req,res){
	var dbs = db;
	var collection = dbs.get('pic');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});

app.get('/api/joke', function(req,res){
	var dbs = db;
	var collection = dbs.get('joke');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});

app.get('/api/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.find({},{},function(e,docs){
		if (e) {
			console.log(e);
			var err = {
				err: true
			}
            res.end(JSON.stringify(err))
		}else{
     		res.end(JSON.stringify(docs))
		}
	});
});

app.get('/api/updata/pic', function(req,res){
	var dbs = db;
	var collection = dbs.get('pic');
	collection.insert({
      "content": "好一部忍辱负重，深入敌后，斗智斗勇，大获全胜的谍战好戏~",
      "hashId":"607ce18b4bed0d7b0012b66ed201fb02",
      "unixtime":1418815449,
      "updatetime":"2014-12-19 10:23:59",
      "url":"http://mpic.spriteapp.cn/x/640x400/ugc/2016/11/24/58369949b210a_1.jpg",
      "zan": 1,
      "cai": 42
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

app.get('/api/updata/joke', function(req,res){
	var dbs = db;
	var collection = dbs.get('joke');
	collection.insert({
      "content": '女票一直是个女汉子，为了让我在朋友面前有面子，展现她阴柔娇弱的一面，吃夜宵摊时她说：“老公~帮人家拧开这个啤酒瓶盖嘛~”吓得我坐到地上！',
      "hashId":"607ce06b4bed0d7b0012b66ed201fb02",
      "unixtime":1418815449,
      "updatetime":"2014-12-19 10:23:59",
      "zan": 11,
      "cai": 2
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

app.get('/api/updata/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.insert({
      "content": '女票一直是个女汉子，为了让我在朋友面前有面子，展现她阴柔娇弱的一面，吃夜宵摊时她说：“老公~帮人家拧开这个啤酒瓶盖嘛~”吓得我坐到地上！',
      "hashId":"607ce06b4bed0d7b0012b66ed201fb02",
      "unixtime":1418815449,
      "updatetime":"2014-12-19 10:23:59",
      "zan": 11,
      "cai": 2
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

app.get('/api/del/collection', function(req,res){
	var dbs = db;
	var collection = dbs.get('collection');
	collection.remove({
      "hashId":"607ce06b4bed0d7b0012b66ed201fb02"
    },function(e,docs){
    	if (e) {
    		console.log(e)
    		var err = {
    			err: true
    		}
    		res.end(JSON.stringify(err))
    	}else{
    		res.end(JSON.stringify(docs))
    	}
    })
});

app.listen(4466)
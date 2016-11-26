"use strict";

var listData = require("data.js");

Page({
	data:{
		lists: []
	},
	onLoad:function(req){
		this.setData({
			lists: listData.data.list
		});
	}
});
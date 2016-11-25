import {repayDate} from '../../utils/util'
Page({
	data:{
		maxAmount:2001,
		moneyList: [
			{name: 500, value: 500, disabled:false},
			{name: 1000, value: 1000, disabled:false},
			{name: 2000, value: 2000, disabled:false},
			{name: 3000, value: 3000, disabled:true}
		],
		typeList:[
			{name:'生活费',value:0},
			{name:'考试培训',value:1},
			{name:'社会实践',value:2},
			{name:'兴趣爱好',value:3},
			{name:'旅行',value:4},
			{name:'其他',value:5}
		],
		dateList: [
			{value: 1},
			{value: 2},
			{value: 3},
			{value: 4},
			{value: 5},
			{value: 6}
		],
		interest: 0.06,
		loanloanDate: 1,
		moneyAll : 500,
		moneyIndex: 0,
		dateIndex: 0,
		typeIndex: 0,
		repayTime: 0,
    	loading: false,
		disabled:false
	},
	moneyChange(e) {
		var activeArray = {500:0,1000:1,2000:2,3000:3};
		this.setData({
			moneyIndex: activeArray[e.detail.value],
			moneyAll: e.detail.value
		})
	},
	dateChange(e) {
		this.setData({
			dateIndex: e.detail.value-1,
			loanloanDate: e.detail.value,
			repayTime: repayDate(+e.detail.value)
		})
	},
	typeChange(e){
		this.setData({
			typeIndex: +e.detail.value
		})
	},
	onLoad:function(options){
		// 页面初始化 options为页面跳转所带来的参数
		this.setData({
			repayTime: repayDate(1)
		})
	},
	onReady:function(){
		// 页面渲染完成
		
	},
	onShow:function(){
		// 页面显示
		
	},
	onHide:function(){
		// 页面隐藏
		
	},
	onUnload:function(){
		// 页面关闭
		
	}
})
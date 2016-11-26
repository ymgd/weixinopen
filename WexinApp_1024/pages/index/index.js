
var util = require('../../utils/util.js')
Page({
	data: {
	  chessboardDatas: [
	      [2,0,2,0],
	      [0,2,0,0],
	      [2,4,2,0],
	      [0,0,2,4]
	   ],
	   current_score: 0,
	   best_score : 0,
	   toast2Hidden: true,
	},
	getCurrentBestScore: function(){
		var best_score = this.data.best_score;
		var current_score = this.data.current_score;

		best_score = current_score>best_score?current_score:best_score;
		return best_score;
	},
	judgeSuccess: function(){
		var chessboardDatas = this.data.chessboardDatas;

		for (var i = 0; i < chessboardDatas.length; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				if (chessboardDatas[i][j]>=2048) {
					this.recordState();
					this.setData({
						toast2Hidden: false
					});
					break;
				}
			}
		}
	},
	recordState: function(){
		var best_score = this.getCurrentBestScore();
		this.setData({
			best_score: best_score
		});
		wx.setStorageSync("uncompleteState",this.data);
	},
	reset: function(){
		var chessDefaultDatas = [
		      [0,0,0,0],
		      [0,0,0,0],
		      [0,0,0,0],
		      [0,0,0,0]
		   ] ;

		var maxInitNum = util.getRandomNum(1,8);
		while(maxInitNum>0){
			var num = util.getRandomNum(0,15);
			this.setChessboardCellNum(chessDefaultDatas,num,2);
			maxInitNum--;
		}

		this.setData({
			chessboardDatas: chessDefaultDatas,
			current_score: 0,
			toast2Hidden: true
		});
	},
	getChessboardCellNum: function(array,index){
		var loopCount = 0;
		var cell;
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (index == loopCount++) {
					cell = array[i][j];
				}
			}
		}
		return cell;
	},
	setChessboardCellNum: function(array,index,num){
		var loopCount = 0;
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (index == loopCount++) {
					array[i][j] = num;
				}
			}
		}
	},
	generateNewCellNum: function(chessboardDatas){
		// 1.求出所有剩余空元素
		var remainNullCellNum = 0;
		for (var i = 0; i < chessboardDatas.length; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				if (chessboardDatas[i][j]==0) {
					remainNullCellNum++;
				}
			}
		}
		// 2.随机位置产生一个数
		var newCellNumIndex = util.getRandomNum(0,remainNullCellNum);
		var count = 0;
		for (var i = chessboardDatas.length-1; i >= 0; i--) {
			for (var j = chessboardDatas[i].length-1 ; j >= 0; j--) {
				if (chessboardDatas[i][j]!=0) {
					continue;
				}
				if (newCellNumIndex == count) {
					chessboardDatas[i][j] = 2;
				}
				count++;
			}
		}
	},
	onLoad: function(options) {
		// wx.onAccelerometerChange(function (res) {
		//   console.log(res.x)
		//   console.log(res.y)
		//   console.log(res.z)
		// })
   		var data = wx.getStorageSync("uncompleteState");
   		if (!!data) {
	   		this.setData(data);
   		}

	},
	onUnload: function(){
		this.recordState();
	},
	onHide: function(){
		this.recordState();
	},
	turnEnd: function(chessboardDatas,addScore){
		this.generateNewCellNum(chessboardDatas);

		var best_score = this.getCurrentBestScore();
        this.setData({
        	chessboardDatas:chessboardDatas,
        	current_score: this.data.current_score + addScore,
			best_score: best_score
      	});

        this.judgeSuccess();

        util.scan_array(this.data.chessboardDatas);
	},
	turnUp: function(){
		var chessboardDatas = this.data.chessboardDatas;
		var addScore = 0;
        this.reorder_up(chessboardDatas); 
		for (var i = 0; i < chessboardDatas.length-1; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				if(chessboardDatas[i][j] == chessboardDatas[i+1][j]){
					addScore += chessboardDatas[i][j];
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i+1][j];  
	                chessboardDatas[i+1][j]=0;  
				}
			}
		}
        this.reorder_up(chessboardDatas); 
		this.turnEnd(chessboardDatas,addScore);
	},
	turnDown: function(){
		var chessboardDatas = this.data.chessboardDatas;
		var addScore = 0;
		this.reorder_down(chessboardDatas); 
		for (var i = chessboardDatas.length-1; i >= 1; i--) {
			for (var j = chessboardDatas[i].length-1 ; j >= 0; j--) {
				if(chessboardDatas[i][j] == chessboardDatas[i-1][j]){
					addScore += chessboardDatas[i][j];
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i-1][j];  
	                chessboardDatas[i-1][j]=0;  
				}
			}
		}
		this.reorder_down(chessboardDatas); 
		this.turnEnd(chessboardDatas,addScore);
	},
	turnLeft: function(){
		var chessboardDatas = this.data.chessboardDatas;
		var addScore = 0;
        this.reorder_left(chessboardDatas); 
		for (var j = 0; j < chessboardDatas.length - 1; j++) {
			for (var i = 0; i < chessboardDatas.length ; i++) {
				if(chessboardDatas[i][j] == chessboardDatas[i][j+1]){
					addScore += chessboardDatas[i][j];
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i][j+1];  
	                chessboardDatas[i][j+1]=0;  
				}
			}
		}
        this.reorder_left(chessboardDatas); 
		this.turnEnd(chessboardDatas,addScore);
	},
	turnRight: function(){
		var addScore = 0;
		var chessboardDatas = this.data.chessboardDatas;
		this.reorder_right(chessboardDatas); 
		for (var j = chessboardDatas.length-1 ; j >= 0; j--) {
			for (var i = chessboardDatas.length-1; i >= 1; i--) {
				if(chessboardDatas[i][j] == chessboardDatas[i][j-1]){
					addScore += chessboardDatas[i][j];
					chessboardDatas[i][j]=chessboardDatas[i][j]+chessboardDatas[i][j-1];  
	                chessboardDatas[i][j-1]=0;  
				}
			}
		}
		this.reorder_right(chessboardDatas); 
		this.turnEnd(chessboardDatas,addScore);
	},
	reorder_up: function(chessboardDatas){
		for (var i = 0; i < chessboardDatas.length; i++) {
			for (var j = 0; j < chessboardDatas[i].length; j++) {
				var rowIndex = i;
				while(rowIndex - 1 >=0 && chessboardDatas[rowIndex-1][j]==0){
					chessboardDatas[rowIndex-1][j] = chessboardDatas[rowIndex][j];
					chessboardDatas[rowIndex][j] = 0;
					rowIndex--;
				}
			}
		}
	},
	reorder_down: function(chessboardDatas){
		for (var i = chessboardDatas.length - 2; i >= 0; i-- ) {
			for (var j = chessboardDatas[i].length - 1; j >= 0; j--) {
				var rowIndex = i;
				while(rowIndex + 1 <= chessboardDatas.length - 1 && chessboardDatas[rowIndex+1][j]==0){
					chessboardDatas[rowIndex+1][j] = chessboardDatas[rowIndex][j];
					chessboardDatas[rowIndex][j] = 0;
					rowIndex++;
				}
			}
		}
	},
	reorder_left: function(chessboardDatas){
		for (var j = 0; j < chessboardDatas.length ; j++) {
			for (var i = 0; i <chessboardDatas[j].length; i++) {
				var rowIndex = j;
				while(rowIndex - 1 >=0 && chessboardDatas[i][rowIndex-1]==0){
					chessboardDatas[i][rowIndex-1] = chessboardDatas[i][rowIndex];
					chessboardDatas[i][rowIndex] = 0;
					rowIndex--;
				}
			}
		}
	},
	reorder_right: function(chessboardDatas){
		for (var j = chessboardDatas.length - 2; j >= 0; j--) {
			for (var i = chessboardDatas.length - 1; i >= 0; i-- ) {
				var rowIndex = j;
				while(rowIndex + 1 <= chessboardDatas.length - 1 && chessboardDatas[i][rowIndex+1]==0){
					chessboardDatas[i][rowIndex+1] = chessboardDatas[i][rowIndex];
					chessboardDatas[i][rowIndex] = 0;
					rowIndex++;
				}
			}
		}
	}
})
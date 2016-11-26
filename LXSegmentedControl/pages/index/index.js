Page({
	data: {
		radioValues: [
			{'value': '男','selected': false},
			{'value': '女','selected': true},
			{'value': '保密','selected': false},
		],
		clazz: []
	},
	indexChanged: function(e){
		// 点中的是组中第个元素
		var index = e.target.dataset.index;
		// 读取原始的数组
		var radioValues = this.data.radioValues;
		for (var i = 0; i < radioValues.length; i++){
			// 全部改为非选中
			radioValues[i].selected = false;
			// 当前那个改为选中
			radioValues[index].selected = true;
		}
		// 写回数据
		this.setData({
			radioValues: radioValues
		});
		// clazz状态
		this.clazzStatus();
	},
	onLoad: function(){
		// onLoad 比 onReady 更早调用，后者为选中时屏幕闪动一下
		this.clazzStatus();
	},
	clazzStatus: function(){
		/* 此方法分别被加载时调用，点击某段时调用 */
		// class样式表如"selected last","selected"
		var clazz = [];
		// 参照数据源
		var radioValues = this.data.radioValues;
		for (var i = 0; i < radioValues.length; i++){
			// 默认为空串，即普通按钮
			var cls = '';
			// 高亮，追回selected
			if (radioValues[i].selected) {
				cls += 'selected ';
			}
			// 最后个元素, 追加last
			if (i == radioValues.length - 1) {
				cls += 'last ';
			}
			//去掉尾部空格
			cls = cls.replace(/(\s*$)/g,'');
			clazz[i] = cls;
		}
		// 写回数据
		this.setData({
			clazz: clazz
		});
	}
})

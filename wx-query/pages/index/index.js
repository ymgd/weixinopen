var app = getApp();

Page({
	name : 'index', /** 如果绑定事件 需要注册一个name属性 */
 	data : {
		 list : [],
		 modal : {
			 hidden : true
		 }
 	},
 	onLoad : function () {
		/** 注册事件源 */
		app.wxQuery.register(this);

		/** 初始化列表 */
		var list = [{
			id : 0,
			name : '查看样例',
			url : '../example/example'
		}];
		for (var i = 1; i <= 10; i++) {
			list.push({
				id : i,
				name : '列表绑定事件 第 ' + i + ' 行'
			});
		}
		app.$('list').setValue(null, list);
 	},
 	onShow : function () {
		/** 重新注册事件源 */
		app.wxQuery.register(this);

		var $modal = app.$('modal');
		$modal.bind('confirm', function (e) {
			$modal.setValue('hidden', true);
		});

		var _this = this;

		for (var i = 0; i < this.data.list.length; i++) {
			var item = this.data.list[i];
			var $item = app.$(item.id);
			$item.bind('tap', function (e) {
				var url = e.currentTarget.dataset.url;
				if (url) {
					wx.navigateTo({
						url : url
					});
				} else {
					$modal.text('点击了第 ' + e.currentTarget.dataset.index + ' 行').setValue('hidden', false);
				}
			});
		}
 	},
	/**
	 * 事件处理
	 */
	eventManage : function (e) {
		app.wxQuery.callEvent(e);
	}
})
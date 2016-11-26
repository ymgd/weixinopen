var app = getApp();

Page({
    name : 'example',  /** 如果绑定事件 需要注册一个name属性 */
    data : {
        methods : [
            {
                id : '1',
                name : '隐藏'
            },
            {
                id : '2',
                name : '显示'
            },
            {
                id : '3',
                name : '显示/隐藏'
            },
            {
                id : '4',
                name : '添加样式'
            },
            {
                id : '5',
                name : '移除样式'
            },
            {
                id : '6',
                name : '添加/移除样式'
            },
            {
                id : '7',
                name : '添加class'
            },
            {
                id : '8',
                name : '移除class'
            },
            {
                id : '9',
                name : '添加/移除class'
            },
            {
                id : '10',
                name : '绑定事件'
            },
            {
                id : '11',
                name : '移除事件'
            },
            {
                id : '12',
                name : '...'
            }
        ],
        modal : {
			hidden : true
		}
    },
    onLoad : function () {
        /** 注册事件源 */
		app.wxQuery.register(this);

        var $modal = app.$('modal');
        $modal.bind('confirm', function (e) {
			$modal.setValue('hidden', true);
		});

        var $block = app.$('block');

        /** 隐藏 */
        app.$('1').bind('tap', function (e) {
            $block .hide();
        });

        /** 显示 */
        app.$('2').bind('tap', function (e) {
            $block .show();
        });

        /** 显示/隐藏 */
        app.$('3').bind('tap', function (e) {
            $block .toggle();
        });

        /** 添加样式 */
        app.$('4').bind('tap', function (e) {
            $block .addStyle({"background-color" : '#1AAD16'}).show();
        });

        /** 移除样式 */
        app.$('5').bind('tap', function (e) {
            $block .removeStyle({"background-color" : '#1AAD16'}).show();
        });

        /** 添加/移除样式 */
        app.$('6').bind('tap', function (e) {
            $block .toggleStyle({"background-color" : '#1AAD16'}).show();
        });

        /** 添加class */
        app.$('7').bind('tap', function (e) {
            $block.addClass('round', 'transform').show();
        })

        /** 移除class */
        app.$('8').bind('tap', function (e) {
            $block.removeClass('round', 'transform').show();
        })

        /** 添加/移除class */
        app.$('9').bind('tap', function (e) {
            $block.toggleClass('round', 'transform').show();
        })

        /** 绑定事件 */
        app.$('10').bind('tap', function (e) {
            $block.bind('tap', function (e) {
                $modal.text('我绑定了事件').setValue('hidden', false);
            }).show();
        })

        /** 移除事件 */
        app.$('11').bind('tap', function (e) {
            $block.unbind('tap').show();
            $modal.text('我的事件移除了').setValue('hidden', false);
        })

        /** 待添加 */
        app.$('12').bind('tap', function (e) {
            console.log('coding...');
        })
    },
    onShow : function () {
        /** 重新注册事件源 */
		app.wxQuery.register(this);
    },
    /**
	 * 事件处理
	 */
	eventManage : function (e) {
		app.wxQuery.callEvent(e);
	}
});
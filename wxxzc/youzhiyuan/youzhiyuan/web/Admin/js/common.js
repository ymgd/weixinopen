$(function(){
	/******  删除确认  *******/
	$('.delAffirm').click(function(){
		if(!confirm('你确定要删除吗?')){
			return false;
		}
	})
	//分页按钮样式
	$('#page a').addClass('btn');
	$('#page strong').addClass('btn btn-info').css({marginRight:'5px'});
	/******  层级显示切换   ******/
	(function(){
		var aTr = $('#table tbody tr');
		var aUnfold = $('#table tbody tr .unfold');
		aTr.each(function(){
			//取得class名称
			var sClass = $(this).attr('class');
			//查询等级的正则
			var preg = /\d+/;
			//查询tr等级
			var level = sClass.match(preg);
		//	alert(level);
			if(level>1){
				$(this).addClass('hide');
			}
		})
		/**** 切换层级显示隐藏  ****/
		aUnfold.toggle(function(){
			var aSonList = getSonList.call(this);
			if(aSonList.size()){
				$(this).html('-').removeClass('btn-info');
				aSonList.removeClass('hide');
			}
		},function(){
			var aSonList = getSonList.call(this);
			if(aSonList.size()){
				$(this).html('+').addClass('btn-info');;
				aSonList.addClass('hide');
			}	
		});
		/**** 获取子集列表  ****/
		function getSonList(){
			var oParent = $(this).parents('tr');
			var pid = oParent.attr('cid');
			var sClass = '.pid_'+pid;
			return $('#table tbody').find(sClass);
		}
	}())
})

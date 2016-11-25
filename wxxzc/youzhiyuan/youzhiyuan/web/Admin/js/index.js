$(function(){
	sidebarControl();
})
/**
 * 左侧,侧边栏相关
 */
function sidebarControl(){
	var oSidebar = $('#sidebar');
	var aMenu = oSidebar.find('.menu');
	var aTitle = aMenu.find('.title'),oMenuList;
	// 菜单显示隐藏切换
	aTitle.toggle(function(){
		oMenuList =  $(this).parent().find('.menuList');
		$(this).addClass('active');
		oMenuList.hide();
	},function(){
		$(this).removeClass('active');
		oMenuList.show();
	})
	// 导航点击切换
	var aNavList = $('#header .nav a');
	var aMenuItem =  $('#sidebar .menuItem');
	aNavList.each(function(index){
		$(this).click(function(){
			aNavList.removeClass('active');
			$(this).addClass('active');
			aMenuItem.hide();
			aMenuItem.eq(index).show();
		})
	})
}
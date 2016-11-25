$(function(){
	$("#shopForm").validation({
		shopname: {
			 rule: {
				 maxlen:20,
				 required: true
			 },
			 error: {
				 maxlen: "不能大于20个字符 ",
		         required: "不能为空 "
		     },
		     message: "商铺名称长度 1到 10 位 ",
		     success: "商铺名称正确"
		 },
		 shopaddress: {
			 rule: {
				 maxlen:40,
				 required: true
			 },
			 error: {
				 maxlen: "不能大于40个字符 ",
		         required: "不能为空 "
		     },
		     message: "商铺地址长度 1到 10 位 ",
		     success: "商铺地址正确"
		 },
		 metroaddress: {
			 rule: {
				 maxlen:40,
				 required: true
			 },
			 error: {
				 maxlen: "不能大于40个字符 ",
		         required: "不能为空 "
		     },
		     message: "地铁地址长度 1到 10 位 ",
		     success: "地铁地址正确"
		 },
		 shoptel:{
			 rule: {
				 tel:true,
				 required: true
			 },
			 error: {
				 tel: "不符合电话规则 ",
		         required: "不能为空 "
		     },
		     message: "请填写一个固定电话的号码",
		     success: "电话填写正确"
		 }
	})
	/**
	 * 点击获取坐标
	 */
	$('#getPoint').click(function(){
		if($('#shopcoord').val() == ''){
			alert('请填写一个地址')
		}
		var adds = $('#shopcoord').val();
		getPoint(adds);
	})
})
function getPoint(adds){
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(adds, function(point){
		$('#shopcoord').val(JSON.stringify(point));
	}, "北京市");
}

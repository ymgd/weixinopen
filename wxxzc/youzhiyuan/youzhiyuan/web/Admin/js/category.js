$(function(){
	
	var validate={
		checkcname:false,
		checktitle:false,
		checkkeywords:false,
		checkdescription:false,
		checksort:false
	};
	$("input[name='cname']").blur(function(){
		$(this).next().remove();
		var cname=$(this).val();
		if(cname==""){
			$(this).after("<span style='color:red;margin-left:5px;'>分类名称不能为空</span>");
			validate.checkcname=false;
			return false;
		}
		if(cname.length>=20){
			$(this).after("<span style='color:red;margin-left:5px;'>分类名称长度不能超过20</span>");
			validate.checkcname=false;
			return false;
		}else{
			$.ajax({
				type:"post",
				url:checkCname,
				data:{
					"cname":cname
				},
				success:function(data){
					if(data==1){
						$("input[name='cname']").after("<span style='color:red;margin-left:5px;'>分类名称已经存在</span>");
						validate.checkcname=false;
						return false;
					}else{
						$("input[name='cname']").after("<span style='color:green;margin-left:5px;'>分类名称可以填写</span>");
						validate.checkcname=true;
					}
				}
			});
		}
	});
	//验证分类标题
	$("textarea[name='title']").blur(function(){
		$(this).next().remove();
		var title = $(this).val();
		if(title==""){
			$(this).after("<span style='color:red;margin-left:5px;'>分类标题不能为空</span>");
			validate.checktitle=false;
			return false;
		}
		if(title.length >= 50){
			$(this).after("<span style='color:red;margin-left:5px;'>分类标题不能超过50位</span>");
			validate.checktitle=false;
			return false;
		}
		validate.checktitle=true;
	});
	//验证分类关键字
	$("textarea[name='keywords']").blur(function(){
		$(this).next().remove();
		var keywords = $(this).val();
		if(keywords==""){
			$(this).after("<span style='color:red;margin-left:5px;'>分类关键字不能为空</span>");
			validate.checkkeywords=false;
			return false;
		}
		if(keywords.length >= 50){
			$(this).after("<span style='color:red;margin-left:5px;'>分类关键字不能超过50位</span>");
			validate.checkkeywords=false;
			return false;
		}
		validate.checkkeywords=true;
	});
	//验证简介
	$("textarea[name='description']").blur(function(){
		$(this).next().remove();
		var description = $(this).val();
		if(description==""){
			$(this).after("<span style='color:red;margin-left:5px;'>分类简介不能为空</span>");
			validate.checkdescription=false;
			return false;
		}
		if(description.length >= 100){
			$(this).after("<span style='color:red;margin-left:5px;'>分类简介不能超过100位</span>");
			validate.checkdescription=false;
			return false;
		}
		validate.checkdescription=true;
	});
	//验证排序
	$('input[name="sort"]').blur(function(){
		$(this).next().remove();
		var sort=$(this).val();
		if(sort==""){
			$(this).after("<span style='color:red;margin-left:5px;'>分类排序不能为空</span>");
			validate.checksort=false;
			return false;
		}
		if(isNaN(parseInt(sort))){
			$(this).after("<span style='color:red;margin-left:5px;'>分类排序必须为整数</span>");
			validate.checksort=false;
			return false;
		}
		validate.checksort=true;
	});

	//提交时执行
	$("#categoryForm").submit(function(){
		$("input[name='cname']").trigger("blur");
		$("textarea[name='title']").trigger("blur");
		$("textarea[name='keywords']").trigger("blur");
		$("textarea[name='description']").trigger("blur");
		$('input[name="sort"]').trigger("blur");
		if(!validate.checkcname ||!validate.checktitle||!validate.checkkeywords||!validate.checkdescription||validate.sort){
			return false;
		}
	});
	//展示的效果
	$('tr["pid!=0"]').hide();

});
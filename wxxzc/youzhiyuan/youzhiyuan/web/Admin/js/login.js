$(function(){
	//遮罩层+提示性错误
	/*
	function createDreg(error){
		$(document).css('position','relative');
		var width =$(document).width();
		var height=$(document).height();
		var cover = $("<div id='cover'></div>").css({
			'background':'#777',
			'z-index':10,
			'width':width,
			'height':height,
			'position':'fixed',
			'top':'0px',
			'left':'0px',
			'opacity': 0.4,
		});
		$("#loginBox").append(cover);
		errtips(error,400,80,2000);
		$("#error").slideUp(2000).delay();

		$("#cover").fadeOut(2000);
	}
	function errtips(error,divwidth,divheight,time){
		var width =parseInt($(document).width());
		var height=parseInt($(document).height());
		var tips  = $("<div id='error'>"+error+"</div>").css({
			'z-index':200,
			'width':divwidth,
			'height':divheight,
			'position':'relative',
			'left':(width-divwidth)/2+"px",
			'top':(height-divheight)/2+'px',
			'text-align':"center",
			'line-height':divheight+"px",
			'color':'red',
		});
		$("#cover").append(tips);
		$("#error").css({
			"background":"#fff",
			'opacity': 1,
			'filter':"alpha(opacity=100)",
		});
	}
	
	*/
	
	
	//点击验证码改变
	
	$('#code').click(function(){
		$(this).attr('src',codeUrl+"/"+Math.random());
	});

	//验证用户名
	//用一个对象来存储一个验证项的状态值
	var validate={
		checkuser:false,
		checkpwd:false,
		checkcode:false
	};

	$('input[name="username"]').blur(function(){
		$(this).next().remove();
		var username = $(this).val();
		if(username==""){
			$(this).after("<span style='color:red;margin-left:5px;'>用户名不得为空</span>");
			validate.checkuser = false;
			return false;
		}else{
			validate.checkuser=true;
		}
	});
	//验证密码
	$('input[name="password"]').blur(function(){
		$(this).next().remove();
		var password = $(this).val();
		if(password==""){
			$(this).after("<span style='color:red;margin-left:5px;'>密码不得为空</span>");
			validate.checkpwd=false;
			return false;
		}else{
			validate.checkpwd=true;
		}
	});
	//验证验证码
	//验证密码
	$('input[name="code"]').blur(function(){
		$(this).next().next().remove();
		var code = $(this).val();
		if(code==""){
			$(this).parent().append("<span style='color:red;margin-left:5px;'>验证码不得为空</span>");
			validate.checkcode=false;
			return false;
		}else{
			validate.checkcode=true;
		}
	});
	//验证表单提交
	$('.btn').click(function(){
		$('input[name="username"]').trigger("blur");
		$('input[name="password"]').trigger("blur");
		$('input[name="code"]').trigger("blur");

		if(validate.checkuser && validate.checkpwd  && validate.checkcode){
			$.ajax({
				type:"post",
				url:login_do,
				data:{
					username:$('input[name="username"]').val(),
					pwd:$('input[name="password"]').val(),
					code:$('input[name="code"]').val()
				},
				success:function(data){
					if(data==1){
						location.href=index;
					}else if(data==-1){
						alert("验证码错误");
						$('#code').trigger('click');
					}else{
						alert("用户名或密码错误");
						$('#code').trigger('click');
					}
				}
			});
		}
	});
});
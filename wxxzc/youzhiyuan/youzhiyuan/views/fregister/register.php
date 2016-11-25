<!DOCTYPE HTML>
<html>
<head>
    <script id="allmobilize" charset="utf-8" src="http://localhost/sixgroup/web/assets/style/js/allmobilize.min.js"></script>
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="alternate" media="handheld"  />
    <!-- end 云适配 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>登录-拉勾网-最专业的互联网招聘平台</title>
    <meta property="qc:admins" content="23635710066417756375" />
    <meta content="拉勾网是3W旗下的互联网领域垂直招聘网站,互联网职业机会尽在拉勾网" name="description">
    <meta content="拉勾,拉勾网,拉勾招聘,拉钩, 拉钩网 ,互联网招聘,拉勾互联网招聘, 移动互联网招聘, 垂直互联网招聘, 微信招聘, 微博招聘, 拉勾官网, 拉勾百科,跳槽, 高薪职位, 互联网圈子, IT招聘, 职场招聘, 猎头招聘,O2O招聘, LBS招聘, 社交招聘, 校园招聘, 校招,社会招聘,社招" name="keywords">

    <meta name="baidu-site-verification" content="QIQ6KC1oZ6" />

    <!-- <div class="web_root"  style="display:none">h</div> -->
    <script type="text/javascript">
        var ctx = "h";
        console.log(1);
    </script>
    <link rel="Shortcut Icon" href="h/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="http://localhost/sixgroup/web/assets/style/css/style.css"/>

    <script src="http://localhost/sixgroup/web/assets/style/js/jquery.1.10.1.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/jquery.lib.min.js"></script>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/core.min.js"></script>


    <script type="text/javascript">
        var youdao_conv_id = 271546;
    </script>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/conv.js"></script>
</head>

<body id="login_bg">
	<div class="login_wrapper">
		<div class="login_header">
        	
            <div id="cloud_s"></div>
            <div id="cloud_m"></div>
        </div>
        
    	<input type="hidden" id="resubmitToken" value="9b207beb1e014a93bc852b7ba450db27" />
		<div class="login_box">
        	<form id="loginForm" method="post" action="index.php?r=fregister/register">
                <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
        		<ul class="register_radio clearfix">
		            <li>
		            	找工作
		              	<input type="radio" value="0" name="u_type" />
		            </li>
		            <li>
		           	           招人
		              	<input type="radio" value="1" name="u_type" />
		            </li>
		        </ul> 
            	<input type="text" id="email" name="email" tabindex="1" placeholder="请输入常用邮箱地址" />
                <span class="error" style="display:none;" id="beError"></span>
                <input type="password" id="password" name="password_hash" tabindex="2" placeholder="请输入密码" />
            	<!--<label class="fl registerJianJu" for="checkbox">
            		<input type="checkbox" id="checkbox" name="checkbox" checked  class="checkbox valid" />我已阅读并同意<a href="h/privacy.html" target="_blank">《拉勾用户协议》</a>
           		</label>-->
                <input type="submit" id="submitLogin" value="注 &nbsp; &nbsp; 册" />

            </form>
            <div class="login_right">
            	<div>已有拉勾帐号</div>
            	<a  href="index.php?r=flogin/index"  class="registor_now">直接登录</a>
                <div class="login_others">使用以下帐号直接登录:</div>
                <a  href="h/ologin/auth/sina.html"  target="_blank" class="icon_wb" title="使用新浪微博帐号登录"></a>
               	<a  href="h/ologin/auth/qq.html"  class="icon_qq" target="_blank" title="使用腾讯QQ帐号登录" ></a>
            </div>
        </div>
        <div class="login_box_btm"></div>
    </div>
    
    <script type="text/javascript">
    
    $(document).ready(function(e) {
    	$('.register_radio li input').click(function(e){
    		$(this).parent('li').addClass('current').append('<em></em>').siblings().removeClass('current').find('em').remove();
    	});
    	
    	$('#email').focus(function(){
    		$('#beError').hide();
    	});
    	//验证表单
	    	 $("#loginForm").validate({
	    	        rules: {
	    	        	type:{
	    	        		required: true
	    	        	},
			    	   	email: {
			    	    	required: true,
			    	    	email: true
			    	   	},
			    	   	password: {
			    	    	required: true,
			    	    	rangelength: [6,16]
			    	   	},
			    	   	checkbox:{required:true}
			    	},
			    	messages: {
			    		type:{
	    	        		required:"请选择使用拉勾的目的"
	    	        	},
			    	 	email: {
			    	    	required: "请输入常用邮箱地址",
			    	    	email: "请输入有效的邮箱地址，如：vivi@lagou.com"
			    	   	},
			    	   	password: {
			    	    	required: "请输入密码",
			    	    	rangelength: "请输入6-16位密码，字母区分大小写"
			    	   	},
			    	   	checkbox: {
			    	    	required: "请接受拉勾用户协议"
			    	   	}
			    	},
			    	errorPlacement:function(label, element){/*
			    		if(element.attr("type") == "radio"){
			    			label.insertAfter($(element).parents('ul')).css('marginTop','-20px');
			    		}else if(element.attr("type") == "checkbox"){
			    			label.inserresult.contenttAfter($(element).parent()).css('clear','left');
			    		}else{
			    			label.insertAfter(element);
			    		} */
			    		/*modify nancy*/
			    		if(element.attr("type") == "radio"){
			    			label.insertAfter($(element).parents('ul')).css('marginTop','-20px');
			    		}else if(element.attr("type") == "checkbox"){
			    			label.insertAfter($(element).parent()).css('clear','left');
			    		}else{
			    			label.insertAfter(element);
			    		};	
			    	}
			    	/*submitHandler:function(form){
			    		var type =$('input[type="radio"]:checked',form).val();
			    		var email =$('#email').val();
			    		var password =$('#password').val();
			    		var resubmitToken = $('#resubmitToken').val();
			    		var _csrf=$('#_csrf').val();
			    		var callback = $('#callback').val();
			    		var authType = $('#authType').val();
			    		var signature = $('#signature').val();
			    		var timestamp = $('#timestamp').val();
			    		
			    		$(form).find(":submit").attr("disabled", true);

			            $.ajax({
			            	type:'POST',
			            	data: {email:email,password_hash:password,u_type:type,_csrf:_csrf*//*,resubmitToken:resubmitToken, callback:callback, authType:authType, signature:signature, timestamp:timestamp*//*},
			            	url:'index.php?r=fregister/register',
			            	dataType:'json'
			            }).done(function(result) {
		            		$('#resubmitToken').val(result.resubmitToken);
			            	if(result.success){
			            		window.location.href=result.content;			            		
			            	}else{
								$('#beError').text(result.msg).show();
			            	}
			            	$(form).find(":submit").attr("disabled", false);			           		
			            });
			        }*/
	    	});
    });
    </script>
</body>
</html>

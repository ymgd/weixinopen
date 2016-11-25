<!DOCTYPE HTML>
<html>
<head>
     <style>
        body {
            margin: 50px 0;
            text-align: center;
        }
        .inp {
            border: 1px solid gray;
            padding: 0 10px;
            width: 200px;
            height: 30px;
            font-size: 18px;
        }
        .btn {
            border: 1px solid gray;
            width: 100px;
            height: 30px;
            font-size: 18px;
            cursor: pointer;
        }
        #embed-captcha {
            width: 300px;
            margin: 0 auto;
        }
        .show {
            display: block;
        }
        .hide {
            display: none;
        }
        #notice {
            color: red;
        }
        /* 以下遮罩层为demo.用户可自行设计实现 */
        #mask {
            display: none;
            position: fixed;
            text-align: center;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            overflow: auto;
        }
        /* 可自行设计实现captcha的位置大小 */
        .popup-mobile {
            position: relative;
        }
        #popup-captcha-mobile {
            position: fixed;
            display: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            z-index: 9999;
        }
    </style>
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
<!-- <div class="popup">
    
    <input class="btn" id="popup-submit" type="submit" value="提交">

    <div id="popup-captcha"></div>
</div> -->

<body id="login_bg">
	<div class="login_wrapper">
		<div class="login_header">
        	<a href="h/"><img src="http://localhost/sixgroup/web/assets/style/images/logo_white.png" width="285" height="62" alt="拉勾招聘" /></a>
            <div id="cloud_s"><img src="http://localhost/sixgroup/web/assets/style/images/cloud_s.png" width="81" height="52" alt="cloud" /></div>
            <div id="cloud_m"><img src="http://localhost/sixgroup/web/assets/style/images/cloud_m.png" width="136" height="95"  alt="cloud" /></div>
        </div>
    

    	<input type="hidden" id="resubmitToken" value="" />		
		 <div class="login_box">
    <!--              <div class="popup">
        
        <input class="btn" id="popup-submit" type="submit" value="提交">
    
        <div id="popup-captcha"></div>
    </div> -->
        	<form id="loginForm" action="index.php?r=flogin/login" method="post">
                <input name="_csrf" type="hidden" id="_csrf" value="<?= Yii::$app->request->csrfToken ?>">
				<input type="text" id="email" name="email" value="" tabindex="1" placeholder="请输入手机号/邮箱地址" />
			  	<input type="password" id="password" name="password" tabindex="2" placeholder="请输入密码" />
				<span class="error" style="display:none;" id="beError"></span>
			    <label class="fl" for="remember"><input type="checkbox" id="remember" value="" checked="checked" name="autoLogin" /> 记住我</label>
			    <a href="index.php?r=flogin/reset" class="fr" >忘记密码？</a>
			    
				<!--<input type="submit" id="submitLogin" value="登 &nbsp; &nbsp; 录" />-->
<!--				<a style="color:#fff;" href="index.html" class="submitLogin" title="登 &nbsp; &nbsp; 录"/>登 &nbsp; &nbsp; 录</a>-->
                <input type="submit" class="submitLogin" value="登录">
	
			    <input type="hidden" id="callback" name="callback" value=""/>
                <input type="hidden" id="authType" name="authType" value=""/>
                <input type="hidden" id="signature" name="signature" value=""/>
                <input type="hidden" id="timestamp" name="timestamp" value=""/>
			</form>

            
   

			<div class="login_right">
				<div>还没有拉勾帐号？</div>
				<a  href="index.php?r=fregister/index"  class="registor_now">立即注册</a>
			    <div class="login_others">使用以下帐号直接登录:</div>
			        <span id="hzy_fast_login"></span>
			</div>
        </div>
        <div class="login_box_btm" ></div>
    </div>
<script type="text/javascript" src="http://open.51094.com/user/myscript/157de3625cda00.html"></script>
<!-- 为使用方便，直接使用jquery.js库，如您代码中不需要，可以去掉 -->
<script src="http://code.jquery.com/jquery-1.12.3.min.js"></script>
<!-- 引入封装了failback的接口--initGeetest -->
<script src="http://static.geetest.com/static/tools/gt.js"></script>
<script>
    var handlerPopup = function (captchaObj) {
        // 成功的回调
        captchaObj.onSuccess(function () {
            var validate = captchaObj.getValidate();
            $.ajax({
                url: "http://localhost/sixgroup/webyzm/VerifyLoginServlet.php", // 进行二次验证
                type: "post",
                dataType: "json",
                data: {
                    type: "pc",
                    username: $('#username1').val(),
                    password: $('#password1').val(),
                    geetest_challenge: validate.geetest_challenge,
                    geetest_validate: validate.geetest_validate,
                    geetest_seccode: validate.geetest_seccode
                },
                success: function (data) {
                    if (data && (data.status === "success")) {
                        $(document.body).html('<h1>登录成功</h1>');
                    } else {
                        $(document.body).html('<h1>登录失败</h1>');
                    }
                }
            });
        });
        $("#popup-submit").click(function() {

            alert(1)
            captchaObj.show();
        });
        // 将验证码加到id为captcha的元素里
        captchaObj.appendTo("#popup-captcha");
        // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
    };
    // 验证开始需要向网站主后台获取id，challenge，success（是否启用failback）
    $.ajax({
        url: "http://localhost/sixgroup/webyzm/StartCaptchaServlet.php?type=pc&t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
            }, handlerPopup);
        }
    });
</script>
</body>
</html>
<!DOCTYPE HTML>
<html>
<head>
    <script id="allmobilize" charset="utf-8" src="assets/style/js/allmobilize.min.js"></script>
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="alternate" media="handheld"  />
    <!-- end 云适配 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>找回密码-拉勾网-最专业的互联网招聘平台</title>
    <meta property="qc:admins" content="23635710066417756375" />
    <meta content="拉勾网是3W旗下的互联网领域垂直招聘网站,互联网职业机会尽在拉勾网" name="description">
    <meta content="拉勾,拉勾网,拉勾招聘,拉钩, 拉钩网 ,互联网招聘,拉勾互联网招聘, 移动互联网招聘, 垂直互联网招聘, 微信招聘, 微博招聘, 拉勾官网, 拉勾百科,跳槽, 高薪职位, 互联网圈子, IT招聘, 职场招聘, 猎头招聘,O2O招聘, LBS招聘, 社交招聘, 校园招聘, 校招,社会招聘,社招" name="keywords">

    <meta name="baidu-site-verification" content="QIQ6KC1oZ6" />

    <!-- <div class="web_root"  style="display:none">http://www.lagou.com</div> -->
    <script type="text/javascript">
        var ctx = "http://www.lagou.com";
        console.log(1);
    </script>
    <link rel="Shortcut Icon" href="http://www.lagou.com/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="assets/style/css/style.css"/>

    <script src="assets/style/js/jquery.1.10.1.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="assets/style/js/jquery.lib.min.js"></script>
    <script type="text/javascript" src="assets/style/js/core.min.js"></script>
    <script type="text/javascript" src="assets/style/js/analytics.js"></script>

    <script type="text/javascript">
        var youdao_conv_id = 271546;
    </script>
    <script type="text/javascript" src="assets/style/js/conv.js"></script>
</head>

<body id="login_bg">
<div class="login_wrapper">
    <div class="login_header">
        <a href="index.html"><img src="assets/style/images/logo_white.png" width="285" height="62" alt="拉勾招聘" /></a>
        <div id="cloud_s"><img src="assets/style/images/cloud_s.png" width="81" height="52" alt="cloud" /></div>
        <div id="cloud_m"><img src="assets/style/images/cloud_m.png" width="136" height="95"  alt="cloud" /></div>
    </div>

    <input type="hidden" id="resubmitToken" value="" />
    <div class="find_psw">
        <h3 align="center"><b>找回密码第二步</b></h3>
        <p align="center" >邮箱已发送！</p>
        <a id="submitLogin" href="http://mail.qq.com" target="_blank">点击进入邮箱 </a>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function() {
        $('#pswForm input[type="text"]').focus(function(){
            $(this).siblings('.error').hide();
        });
        //验证表单

        $("#pswForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "请输入注册时使用的邮箱地址",
                    email: "请输入有效的邮箱地址，如：vivi@lagou.com"
                }
            },
            submitHandler:function(form){
                $(form).find(":submit").attr("disabled", true);
                form.submit();
            }
        });
    });
</script>
</body>
</html>

<!DOCTYPE HTML>
<html xmlns:wb="http://open.weibo.com/wb">
<head>
    <script id="allmobilize" charset="utf-8" src="http://localhost/sixgroup/web/assets/style/js/allmobilize.min.js"></script>
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="alternate" media="handheld"  />
    <!-- end 云适配 -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>拉勾网-最专业的互联网招聘平台</title>
    <meta property="qc:admins" content="23635710066417756375" />
    <meta content="" name="description">
    <meta content="" name="keywords">
    <meta name="baidu-site-verification" content="QIQ6KC1oZ6" />

    <!-- <div class="web_root"  style="display:none">h</div> -->
    <script type="text/javascript">
        var ctx = "h";
       </script>
    <link rel="Shortcut Icon" href="h/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="http://localhost/sixgroup/web/assets/style/css/style.css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/sixgroup/web/assets/style/css/external.min.css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/sixgroup/web/assets/style/css/popup.css"/>
    <script src="http://localhost/sixgroup/web/assets/style/js/jquery.1.10.1.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/jquery.lib.min.js"></script>
    <script src="http://localhost/sixgroup/web/assets/style/js/ajaxfileupload.js" type="text/javascript"></script>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/additional-methods.js"></script>
    <!--[if lte IE 8]>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/excanvas.js"></script>
    <![endif]-->
    <script type="text/javascript">
        var youdao_conv_id = 271546;
    </script>
    <script type="text/javascript" src="http://localhost/sixgroup/web/assets/style/js/conv.js"></script>
</head>
<body>
<div id="body">
    <div id="header">
        <div class="wrapper">
            <a href="index.html" class="logo">
                <img src="http://localhost/sixgroup/web/assets/style/images/logo.png" width="229" height="43" alt="拉勾招聘-专注互联网招聘" />
            </a>
            <ul class="reset" id="navheader">
                <li class="current"><a href="?r=findex/index">首页</a></li>
                <li ><a href="?r=fcompanylist/index" >公司</a></li>
                <li ><a href="#" target="_blank">论坛</a></li>
                <li ><a href="?r=fjianli/index" rel="nofollow">我的简历</a></li>
                <li ><a href="?r=fcreate/index" rel="nofollow">发布职位</a></li>
            </ul>
            <?php
            $session= Yii::$app->session;
          
             if(empty($session['email'])){  ?>
            
         <ul class="loginTop">
                <li><a href="?r=flogin/index" >登录</a></li>
                <li>|</li>
                <li><a href="?r=fregister/index" >注册</a></li>
            </ul>

          <?php   
        }else{
            
            ?>
          
                <dl class="collapsible_menu">


                <dt>
                    <span><?= $session['email'];?>&nbsp;</span> 
                    <span class="red dn" id="noticeDot-1"></span>
                    <i></i>
                </dt>

                        <?php
             if($session['u_type']==1){  ?> 
                                    <dd><a href="?r=fcreate/index">我发布的职位</a></dd>
                    <dd><a href="positions.html">我收到的简历</a></dd>
                    <dd class="btm"><a href="?r=fcompany/index01">我的公司主页</a></dd>
                      <?php
            
            }else{
            ?>
                
                    <dd><a href="http://localhost/sixgroup/web/index.php?r=findex/index">我要找工作</a></dd>

                    <?php
                    }
                    
                    ?>
                                                <dd><a href="accountBind.html">帐号设置</a></dd>
                                <dd class="logout"><a rel="nofollow" href="?r=flogin/out">退出</a></dd>
            </dl>
            <?php
            
            }
            ?>
        </div>
    </div>
    <!-- end #header -->田
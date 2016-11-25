<?php 
/**
 * 输出二次验证结果,本文件示例只是简单的输出 Yes or No
 */
// error_reporting(0);
require_once dirname(dirname(__FILE__)) . '/webyzm/class.geetestlib.php';
require_once dirname(dirname(__FILE__)) . '/webyzm/config.php';
session_start();
if($_POST['type'] == 'pc'){
    $GtSdk = new GeetestLib(CAPTCHA_ID, PRIVATE_KEY);
}elseif ($_POST['type'] == 'mobile') {
    $GtSdk = new GeetestLib(MOBILE_CAPTCHA_ID, MOBILE_PRIVATE_KEY);
}

$user_id = $_SESSION['user_id'];
if ($_SESSION['gtserver'] == 1) {   //服务器正常
    $result = $GtSdk->success_validate($_POST['geetest_challenge'], $_POST['geetest_validate'], $_POST['geetest_seccode'], $user_id);
    if ($result) {
        echo '{"status":"success"}';
    } else{
        echo '{"status":"fail"}';
    }
}else{  //服务器宕机,走failback模式
    if ($GtSdk->fail_validate($_POST['geetest_challenge'],$_POST['geetest_validate'],$_POST['geetest_seccode'])) {
        echo '{"status":"success"}';
    }else{
        echo '{"status":"fail"}';
    }
}
?>

<?php

namespace app\controllers;

use yii\web\Controller;

// 第三方登录类
class FbackController extends  Controller
{
    public function actionIndex()
    {
    	

	$open = new OtherLogin();
	$code = $_GET['code'];
	var_dump( $open->me($code));


}
}
?>

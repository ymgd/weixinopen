<?php

/*
*后台主页控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;

class BadminController extends BcommonController
{
    
    // 后台展示
    public function actionIndex()
    {
    	
         // echo  $val=Tool::encrytion('12wqwew3',1);
        // echo "<br/>";
          // echo Tool::encrytion($val);
                 // die;


          $info=$this->info();
               
        return $this->render('index',['info'=>$info]);
    }



   // 后台用户信息展示 
	public function Info(){

		// var_dump($_SESSION['admin_user']);die;
		$logintime=date('y-m-d H:i',$_SESSION['login_time']);
		$time = date('y-m-d H:i');
		$ip = $_SERVER["REMOTE_ADDR"];
		$info = <<<str
		<font color='red'>{$_SESSION['admin_user']}</font>您好！<br/>
	    您的上一次登录时间是：{$logintime}<br/>
		您本次的登录时间是：{$time}<br/>
		您的上一次登录IP是：{$_SESSION['loginip']}<br/>
		您的本次登录IP是：{$ip}
str;
		 return $info;
	}


}

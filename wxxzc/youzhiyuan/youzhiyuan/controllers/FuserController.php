<?php
/*
*应聘者用户控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;


class FuserController extends Controller
{
   // 登陆页面展示
    public function actionIndex()
    {
        return $this->render('index');
    }

  

}
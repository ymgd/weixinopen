<?php
// 前台首页控制
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\User_info;
use app\models\ContactForm;

class FautoController extends Controller{
     public function actionIndex(){

         return $this->render('auto.html');

     }
    public function actionSel(){

        $request = \Yii::$app->request;
        $name = $request->get('aa');
        $db = Yii::$app->db;
        $sql = "select * from user_info as u join user as us join study_exp as s on u.uid= us.id=s.user_id where experience='$name'";
        $res =  $db->createCommand($sql)->queryAll();

        echo json_encode($res);

    }
    public function actionSel2()
    {

        $request = \Yii::$app->request;
        $user_des = $request->get('aa');
        $arr = "应届毕业生";
        $db = Yii::$app->db;
        $sql = "select * from user_info as u join user as us join study_exp as s on u.uid= us.id=s.user_id where experience='$arr'and user_des='$user_des'";
        $res = $db->createCommand($sql)->queryAll();

        echo json_encode($res);


    }






        
















}




?>
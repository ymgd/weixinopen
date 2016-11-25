<?php
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class FregisterController extends Controller
{
    //展示注册页面
    public function actionIndex()
    {
        return $this->renderPartial('register');
    }

    //接受注册信息 入库
    public function actionRegister()
    {
        $request = Yii::$app->request;
        $data = $request->post();
      // var_dump($data);die;
        if ($data) {
            $data['password_hash'] = md5($data['password_hash']);
            $email=$data['email'];
            unset($data['_csrf']);
            $db = Yii::$app->db;
            $arr = $db->createCommand("select * from user WHERE email='$email'")->queryOne();
            if ($arr) {
                echo "<script>alert('邮箱已存在')</script>";
            } else {
                $res = $db->createCommand()->insert('user', $data)->execute();
                if($res) {
                    
                    return $this->redirect(array('flogin/index'));
                } else {
                 echo "<script> alert('注册失败');location.href='?r=fregister%2Findex'</script>";
                    //$this->redirect(array('flogin/index'));
                }
            }
        }
    }
}

?>
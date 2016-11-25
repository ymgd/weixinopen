<?php
/*
*前台登陆控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\AccessControl;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use yii\web\Session;

class FloginController extends Controller
{
   // 登陆页面展示
    public function actionIndex()
    {
        return $this->renderPartial('login');
    }
    //接收登录信息  验证
    public function actionLogin()
    {
        $request=Yii::$app->request;
        $data=$request->post();
        $email=$data['email'];
        $pwd=md5($data['password']);
        unset($data['_csrf']);
        $db=Yii::$app->db;
        $res=$db->createCommand("SELECT * FROM  user  WHERE email='$email' AND password_hash='$pwd'")->queryOne();
 
        if($res)
        {
            $session = Yii::$app->session;
            $session['email']=$email;
            $session['id']=$res['id'];
            $session['u_type']=$res['u_type'];
            // var_dump($_SESSION['email']);die;
            return $this->redirect(array('findex/index'));
        }else{

        echo "<script> alert('登陆失败');location.href='?r=flogin%2Findex'</script>";
        }
    }
    //找回密码页面
    public function actionReset()
    {
        $requset=Yii::$app->request;
        $data=$requset->post();
        // var_dump($data);die;
        if($data)
        {

            // var_dump($data);die;
            unset($data['_csrf']);
            $session = Yii::$app->session;
            $session['email']=$data['email'];
            $session['id']=12;
            //发邮件  生成连接  改密码
            $mail = Yii::$app->mailer->compose();
            //var_dump($data['email']);die;
            $mail->setTo($data['email']);   //接收人邮箱
            $mail->setSubject("找回密码");  //邮件标题
            $content="拉勾已经收到了你的找回密码请求，请点击 <a target='_blank' href='http://localhost/sixgroup/web/index.php?r=flogin/resetpwd'>此链接重置密码</a>。</br>（本链接将在1天后失效）<br><br>拉勾团队<br>".date("Y-m-d H:i:s");
            $mail->setHtmlBody($content);   //发送内容(可写HTML代码)
            if ($mail->send()){
                //echo "成功";
               return $this->renderPartial('emailtest');
            }else{
                echo "失败";
            }
        }else
        {
            return $this->renderPartial('reset');
        }
    }
    //重置密码
    public function actionResetpwd()
    {
        $requset=Yii::$app->request;
        $data=$requset->post();
        if($data)
        {
            unset($data['_csrf']);
            $pwd=md5($data['password']);
            $session = Yii::$app->session;
            $email=$session['email'];
            $db=Yii::$app->db;
            $res=$db->createCommand("update user set password_hash='$pwd' WHERE email='$email'")->execute();
            $arr=$db->createCommand("select id from user WHERE email='$email'")->queryOne();
            $session['id']=$arr['id'];
            if($res)
            {
                return $this->redirect(array('findex/index'));
            }
        }else
        {
            return $this->renderPartial('resetpwd');
        }
    }
    //退出
    public function actionOut()
    {
        //删除全部session
        // Yii::$app->session->clear();  //删除session变量
        Yii::$app->session->destroy(); //删除服务器的session信息
        return $this->redirect(array('flogin/index'));
    }

}
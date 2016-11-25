<?php

/*
*后台登陆控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;


class BloginController extends Controller
{
    
    // 后台登陆
    public function actionIndex()
    {
        return $this->render('login');
    }



      // 登陆信息验证
        public function actionLogin()
    {



       // 信息返回
      $res=[];
      $res=['sta'=>0,'res'=>'用户名和密码错误'];
      $request=\YII::$app->request;
      // var_dump($request);die;
      $user=$request->post('user', '');
      $pwd=$request->post('pwd','');
      $time=time();
      $loginip=$_SERVER["REMOTE_ADDR"];
       // var_dump($request->post('check'));die;

         if($user==null || $pwd==null){


         $res['res']='用户名和密码都不为空';

         echo json_encode($res);die;


      }
    // 查询表执行sql语句
      $db=Yii::$app->db;
      $sql="select *from admin where admin_user='$user' and admin_pwd='$pwd' ";
      $re=$db->createCommand($sql)->queryone();
       // var_dump($re);die;
       if (!$re) {
        $res['res']='用户名和密码错误';     
      echo json_encode($res);die;
       }

  if ($request->post('check')) {
            $val=$re['id'].','.$re['admin_user'].','.$re['loginip'];
           
            $val=Tool::encrytion($val,1);
            // echo $val;die;
            $c_time= time() + 3600 * 24 * 7;
                @setcookie('val',$val,$c_time,'/');


               // setcookie('val');
                // unset($_COOKIE['val']);
             // var_dump($_COOKIE);die;
          }

        //把信息存入session
        $session= \Yii::$app->session;
        $session->open();
        $session->set('admin_user',$user);
        $session->set('admin_id',$re['id']);
        $session->set('login_time',$re['login_time']);
        $session->set('loginip',$re['loginip']);
        
        // var_dump($session['admin_user']);die;
     //更新登陆时间
      $sql="update admin set  loginip='$loginip',`login_time`='$time' where admin_user='$user'";
      $re=$db->createCommand($sql)->execute();
       
       $res['res']='';     
       $res['sta']=1;     
       echo json_encode($res);die;


    }


    //退出
    public function actionOut()
    {
      session_start();
      unset($_SESSION['admin_user']);
      unset($_COOKIE['val']);
      return $this->redirect(array('blogin/index'));
    }



}

<?php

/*
*后台权限管理控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;


class BprivilegeController extends BcommonController
{
    
    // 后台权限展示
    public function actionPri()
    {
       // 查询表执行sql语句
      $db=Yii::$app->db;

      $sql="SELECT pid,pname,parent_id FROM  privilege";       
      $sql1="SELECT  *  FROM  role";       
      $arr=$db->createCommand($sql)->queryall();
      $arr1=$db->createCommand($sql1)->queryall();
      $arr=$this->recursive($arr);
         foreach ($arr1 as $k => $v) {
          
            $va=$v['rid'];
// var_dump($va);die;
    // 获取当前用户id查询当前用户的角色，根据角色查询当前的权限
      $sql2="SELECT p.pid from  `role` r  INNER JOIN `r-p` on `r-p`.rid=r.rid  INNER JOIN `privilege` p on `r-p`.pid=p.pid where r.rid=$va";
      $arr2[$va]=$db->createCommand($sql2)->queryall(); 

         }
  
      // var_dump($arr2);die;

      return $this->render('pri.html',['arr'=>$arr,'arr1'=>$arr1,'arr2'=>$arr2]);
    }

    // 后台管理员列表
    public function actionShow()
    {
      
      $uid= Yii::$app->session['admin_id'];
     

    // 查询表执行sql语句
     $db=Yii::$app->db;
     // 获取当前用户id查询当前用户的角色，根据角色查询当前的权限
      $sql="SELECT admin_user,rname from admin u INNER JOIN `u-r` on u.id=`u-r`.uid INNER JOIN `role` r on `u-r`.rid=r.rid";
      $arr=$db->createCommand($sql)->queryall();
      $sql1="SELECT rname,rid from `role`";
      $arr1=$db->createCommand($sql1)->queryall();
       // var_dump($arr);die;
      return $this->render('show',['arr'=>$arr,'arr1'=>$arr1]);
    }


      // 后台管理员修改
    public function actionGup()
    {

        $user=Yii::$app->request->get('user','');
        $user=trim($user);

        $rid=Yii::$app->request->get('rid','');
     // echo $rid;die;
     
     // 查询表执行sql语句
      $db=Yii::$app->db;

      $sql="SELECT id FROM admin WHERE  admin_user='$user'";
      $arr=$db->createCommand($sql)->queryone();
      $id=$arr['id'];
      $sql1="UPDATE `u-r` SET `u-r`.rid='$rid' WHERE  uid='$id'";
      $arr1=$db->createCommand($sql1)->execute();
       
       if ($arr1) {
          echo 1;die;
       }else{

        echo 2;die;
       }

    }  

   // 权限列表的修改
      
  public function actionPup(){
     
          // echo 1;die;
        $req=yii::$app->request->post();    
          unset($req['_csrf']);
         $rid=@$req["pid"];
           // var_dump($rid);die;

     $db=Yii::$app->db;    
    $sql1="truncate `r-p`";  
    $arr1=$db->createCommand($sql1)->execute();
foreach ($rid as $k => $v) {
 
foreach ($v as $ke => $va) {
  // var_dump($va);die;
  $sql1="insert into `r-p` values ('$k','$va')";

    $arr1=$db->createCommand($sql1)->execute();

}
  

}
// var_dump($arr1);die;
if ($arr1==1) {
 
   return $this->redirect('?r=bprivilege/pri');
}else{
   return $this->redirect('?r=bprivilege/pri');

}
  }














}

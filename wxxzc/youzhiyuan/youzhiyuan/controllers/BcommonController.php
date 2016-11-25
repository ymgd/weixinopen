<?php
/*
*后台公共控制器
*/
namespace app\controllers;
use Yii;
//use app\models\Admin;
use yii\web\Controller;
use yii\web\UploadedFile;
use yii\data\Pagination;
use yii\web\Session;


// header("content-type:text/html;charset=utf-8");
class BCommonController extends Controller{	
    public $menu = null ; //	//定义一个属性，让layout访问
    public function init(){
        parent::init();

      $session = \Yii::$app->session;
    // 自动登录


        if (@$_COOKIE['val'] && !$session['admin_user']) {
           // $val=Tool::encrytion($_COOKIE['val']);
           $val = explode(',', Tool::encrytion(@$_COOKIE['val']));
               // var_dump($val);die;
           if ($val['2']==$_SERVER['REMOTE_ADDR']) {
             
              $session['admin_user']=$val['1'];
           }

          }  
          
     // var_dump($session['admin_user']);die;
        
        if(empty($session['admin_user'])){
            
         $this->redirect('?r=blogin/index');
        }


               /*
                *添加权限
                */
                // 获取当前用户id
                $uid=@$_SESSION['admin_id'];
                // echo $uid;die;
                // 查询表执行sql语句
                $db=Yii::$app->db;
                // 获取当前用户id查询当前用户的角色，根据角色查询当前的权限
                $sql="SELECT admin_user,pname,pcontroller,paction,parent_id,p.pid from admin u INNER JOIN `u-r` on u.id=`u-r`.uid INNER JOIN `role` r on `u-r`.rid=r.rid INNER JOIN `r-p` on `r-p`.rid=r.rid  INNER JOIN `privilege` p on `r-p`.pid=p.pid where u.id=$uid";
                $arr=$db->createCommand($sql)->queryall();
             
                  // $this->menu = $this->recursive($arr);
               Yii::$app->params['menu'] =$this->recursive($arr);
                   // var_dump($arr);die;
              
     }
             // 递归展示后台左边的菜单栏
               function recursive($data,$parent_id=0,$level=0){
                 $arr=[];
                  foreach ($data as $k => $v) {
                       if ($parent_id==$v['parent_id']) { 
                        
                        $v['level']=$level;
                        $v['child']=$this->recursive($data,$v['pid'],$level+1);
                          $arr[]=$v;

                       }
                   } 
                 
                  return $arr;
               }




}

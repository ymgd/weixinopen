<?php
namespace app\controllers;

use Yii;
use yii\web\Controller;

header('content-type:text/html;charset=utf-8');
class FcompanyController extends Controller{
    public $enableCsrfValidation = false;
     public function actionIndex(){
         return $this->render('companylist.html');

     }
    //公司基本信息第一页
    public function actionIndex01(){
        return $this->render('index01.html');

    }
    //第一页信息添加
    public function actionIndex01add(){

        $arr=\Yii::$app->request->post();
       // var_dump($arr);die;
         $session = \Yii::$app->session;
        $uid=isset($session['id'])?$session['id']:'';
        $cname=$arr['data']["cname"];
        $cname_sort=$arr['data']['cname_sort'];
        $cmail=$arr['data']['cmail'];
        $caddr=$arr['data']['caddr'];
        $trade_field=$arr['data']['trade_field'];
        $c_scale=$arr['data']['c_scale'];
        $stage=$arr['data']['stage'];
        $invest=$arr['data']['invest'];
        $introduce=$arr['data']['introduce'];

        if($arr){
            $db=Yii::$app->db;
            $sql="insert into company (cname,cname_sort,cmail,caddr,trade_field,c_scale,stage,invest,introduce,uid)  VALUES ('$cname','$cname_sort','$cmail','$caddr','$trade_field','$c_scale','$stage','$invest','$introduce','$uid')";
            $re=$db->createCommand($sql)->execute();
            if($re){
                $sql="select cid from company where cname='$cname'";
                $res=$db->createCommand($sql)->queryAll();
                echo $res[0]['cid'];
            }else{
                echo 0;
            }
        }else{
            echo 0;
        }

    }
    //公司标签
    public function actionTag(){
        return $this->render('tag.html');
    }
    //公司标签添加
    public function actionTagadd(){
        $arr=\Yii::$app->request->post();
        //var_dump($arr);die;
        $reg="#<li><span>(.*)</span><i></i></li>#isU";
        preg_match_all($reg,$arr['label'],$brr);
        //var_dump($brr);die;
        $crr=serialize($brr[1]);
        //var_dump(json_decode($crr,true));die;
        if($arr) {
            $db = Yii::$app->db;
            $sql = "insert into label (label,cid)  VALUES ('$crr','$arr[cid]')";
            $re = $db->createCommand($sql)->execute();
            if($re){
                echo $arr['cid'];
            }else{
                echo 0;
            }
        }else{
            echo 0;
        }

    }
    //公司详细介绍
    public function actionIndex03(){
        return $this->render('index03.html');
    }
    //公司详细介绍添加
    public function actionDetailed(){
        $arr=\Yii::$app->request->post();
        //var_dump($arr['cid']);die;
        if($arr) {
            $db = Yii::$app->db;
            $sql = "update company set detailed='$arr[detailed]' where cid=$arr[cid]";
            $re = $db->createCommand($sql)->execute();
            if($re){
                echo $arr['cid'];
            }else{
                echo 0;
            }
        }else{
            echo 0;
        }
    }
    //用户公司页面
    public function actionMyhome(){
    $session = \Yii::$app->session;
        $uid=isset($session['id'])?$session['id']:'';
        $db = Yii::$app->db;
        $sql="select * from company where uid='$uid'";
        $res=$db->createCommand($sql)->queryAll();
        $cid=$res[0]['cid'];

        $sql1="select * from label where cid=$cid";
        $res1=$db->createCommand($sql1)->queryAll();
        $label=$res1[0]['label'];
        //var_dump($label);die;
        $label2=unserialize($label);
        //var_dump($label2);die;
        return $this->render('myhome.html',array('res'=>$res[0],'label'=>$label2));
    }



}

?>
<?php

/*
*后台主页控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\data\Pagination;

class BjobController extends BcommonController
{

    // 后台展示
    public function actionIndex()
    {
        header('content-type:text/html;charset=utf-8');
        $db=\Yii::$app->db;
        $array=$db->createCommand("select * from position_fid")->queryAll();
        $arr=$this->actionRecursive($array);
        //var_dump($arr);die;
        return $this->render('show.php',['arr'=>$arr]);
    }
    public function actionAdd(){
        $post=\Yii::$app->request->post();
        //var_dump($post);die;
        $db=\Yii::$app->db;
        $res=$db->createCommand("insert into position_fid(fname,fid) VALUES ('$post[fname]','$post[fid]')")->execute();
        if($res){
            return $this->redirect(array('bjob/show'));
        }else{
            echo"<script>alert('添加失败！')</script>";
            return $this->redirect(array('bjob/index'));
        }
    }
    //列表展示
    public function actionShow(){
        header('content-type:text/html;charset=utf-8');
        $db=\Yii::$app->db;
        $array=$db->createCommand("select * from position_fid")->queryAll();
        $arr=$this->actionRecursive($array);
        /* var_dump($arr);
         die;*/
        return $this->render('list.php',['arr'=>$arr]);
    }
    //添加子类
    public function actionAddSon(){
        /*return $this->render('addson.php');*/
    }
    //递归
    function actionRecursive ($array, $fid=0, $level=0) {
        $arr = array();
        foreach ($array as $v) {
            if ($v['fid'] == $fid) {
                $v['level'] = $level;
                $v['html'] = str_repeat('--', $level);
                $res=$this->actionRecursive($array,$v['pid'],$level+1);
                $arr[] = $v;
                //$arr = array_merge($arr, actionRecursive($array, $v['id'], $level + 1));
                $arr = array_merge($arr,$res);
            }
        }
        return $arr;
    }







}


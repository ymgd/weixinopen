<?php
namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\User_info;
use app\models\Work_exp;
use app\models\Study_exp;


class FjianliController extends Controller
{
    public function actionIndex()
    {
        return $this->render('jianli.html');
    }

    public function actionForm1()
    {
        //获取session id
        $db = Yii::$app->db;
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;
        $name = $request->get('name');
        $sex = $request->get('age');
        $des = $request->get('des');
        $workyear = $request->get('workyear');
        $tel = $request->get('tel');
        $currentstate = $request->get('currentstate');
        $sql = "update user SET  username ='$name'WHERE id = '$id'";
        $db->createCommand($sql)->query();
        $user = new User_info();
        $user->experience = $workyear;
        $user->tel = $tel;
        $user->status = $currentstate;
        $user->uid = $id;
        $user->sex = $sex;
        $user->user_des = $des;
        //   $user->save();

        /*     //返回数据显示
             $sql = "select username,email,user_des,age,tel,experience,i.status from user as u JOIN user_info as i on u.id=i.uid";
             $arr =  $db->createCommand($sql)->queryAll();
             echo $arr;*/
    }

    public function actionForm2()
    {
        //获取session id
        $db = Yii::$app->db;
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;

        //期望城市
        $expectCity = $request->get('expectCity');
        //期望职位
        $expectPosition = $request->get('expectPosition');
        //期望月薪
        $pay = $request->get('expectSalary');

        $sql = "update user_info SET  city = '$expectCity',position='$expectPosition',pay='$pay'  WHERE uid = '$id'";
        $db->createCommand($sql)->query();
    }

    public function actionForm3()
    {
        //获取session id
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;

        //公司名字
        $companyName = $request->get('companyName');
        //职位名称
        $positionName = $request->get('positionName');
        //开始年份
        $select_company = $request->get('select_company');
        //开始月份
        $MonthStart = $request->get('MonthStart');
        //结束年份
        $die = $request->get('die');
        //结束月份
        $yue = $request->get('yue');
        $day = "$select_company" . "-" . " $MonthStart" . " $die" . "-" . " $yue";
        $user = new Work_exp();
        $user->company = $companyName;
        $user->position = $positionName;
        $user->user_id = $id;
        $user->time = $day;
        $user->save();

    }

    public function actionForm4()
    {
        //获取session id
        $db = Yii::$app->db;
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;

        //项目名称
        $project = $request->get('projectName');
        //担任职务
        $post = $request->get('thePost');

        $sql = "update work_exp set project='$project',post='$post' WHERE user_id = '$id'";
        $db->createCommand($sql)->query();
    }

    public function actionForm5()
    {
        //获取session id
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;

        //学校名称
        $schoolName = $request->get('schoolName');
        //学历
        $education = $request->get('education');
        //专业名称
        $professionalName = $request->get('professionalName');
        //开始年份
        $xyear = $request->get('xyear');
        //结束年份
        $oxyear = $request->get('oxyear');
        $ti = "$xyear" . "$oxyear";

        $user = new Study_exp();
        $user->school = $schoolName;
        $user->qualifications = $education;
        $user->professional = $professionalName;
        $user->user_id = $id;
        $user->g_time = $ti;
        $user->save();

    }


    public function actionForm6()
    {
        //获取session id
        $db = Yii::$app->db;
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;
        //自我描述
        $sel = $request->get('sel');

        $sql = "update study_exp set content='$sel' WHERE user_id = '$id'";
        $db->createCommand($sql)->query();
    }

    public function actionForm7()
    {
        //获取session id
        $db = Yii::$app->db;
        $session = Yii::$app->session;
        $id = $session['id'];
        $request = \Yii::$app->request;
        //作品链接
        $worklink = $request->get('workLink');
        //作品描述
        $work = $request->get('work');
        $sql = "update work_exp set explian='$work',production='$worklink'  WHERE user_id = '$id'";
        $db->createCommand($sql)->query();
    }


public function actionForm8(){
    $db = Yii::$app->db;
    $request = \Yii::$app->request;

    $id = $request->get('id');


    $sql = "select * from user_info as u join user as us join study_exp as s join work_exp as w on u.uid= us.id=s.user_id=w.user_id where uid='$id'  ";

    $res =  $db->createCommand($sql)->queryOne();
 //  var_dump($res);die;
    return $this->render('auto.html',['res'=>$res]);



}





}

?>






<?php
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class FcreateController extends Controller
{
    public function actionIndex()
    {
        header('content-type:text/html;charset=utf-8');
        $arr = $this->get_cat_array();
         //var_dump($arr);die;
        return $this->render('create.html', ['arr' => $arr]);
    }
    public function actionFcreate_add(){
       $get=\Yii::$app->request;
        $positionName1=$get->get('positionName1');
        $db=\Yii::$app->db;
        $select=$db->createCommand("select fid from position_fid WHERE fname='$positionName1'")->queryAll();
        $positionName1=$select[0]['fid'];
        $positionName2=$get->get('positionName2');
        $department=$get->get('department');
        $jobNature=$get->get('jobNature');
        $salaryMin=$get->get('salaryMin');
        $salaryMax=$get->get('salaryMax');
        $workAddress=$get->get('workAddress');
        $select_experience=$get->get('select_experience');
        $select_education=$get->get('select_education');
        $positionAdvantage=$get->get('positionAdvantage');
        $editor=$get->get('editor');
        $positionAddress=$get->get('positionAddress');
        $forwardEmail=$get->get('forwardEmail');
        $time=date('Y-m-d H:i:s');
       //echo  $time;die;
        $uid='1';
        //echo $uid;die;

        $sql="insert into `position`(fid,pname,department,job_nature,salary_max,salary_min,work_city,work_exp,min_edu,work_attract,work_des,work_addr,forward_email,delivery_time,cid)
 VALUES ('1','$positionName2','$department','$jobNature','$salaryMax','$salaryMin','$workAddress','$select_experience','$select_education',
'$positionAdvantage','$editor' ,'$positionAddress','$forwardEmail','$time','$uid')";
        $res=$db->createCommand($sql)->execute();
        if($res){
            echo 1;
        }else{
            echo 0;
        }

    }
    //发布新职位成功
    public function actionSuccess(){
        return $this->render('index06.html');
    }

    //层次递归

        public function get_cat_array($fid = 0)
        {
            $category = (new \yii\db\Query())->select(['pid', 'fname', 'fid'])->from('position_fid')->all();
            $arr = array();
            //var_dump($category);die;
            foreach ($category as $index => $row) {
                // 对每个分类进行循环。
                if ($category[$index]['fid'] == $fid) {
                    //如果有子类
                    $row['child'] = $this->get_cat_array($category[$index]['pid']);
                    //调用函数，传入参数，继续查询下级
                    $arr[] = $row; //组合数组
                }
            }
            return $arr;
        }
    }

?>
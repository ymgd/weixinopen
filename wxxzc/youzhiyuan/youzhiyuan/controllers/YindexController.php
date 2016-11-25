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

header("content-type:text/html;charset=utf-8");
class YindexController extends Controller
{
    //首页数据获取
    public function actionIndex()
    {
        //调轮播图片
        $url="http://www.hefei.com/public/index.php/you";
        $str= file_get_contents($url);
        if($str){
            $arr=json_decode($str,true);
            //var_dump($arr);die;
            if($arr['code']==200){
                $arr=$arr['data'];
            }
        }
        //调简介信息
        $url="http://www.hefei.com/public/index.php/youintro";
        $str= file_get_contents($url);
        if($str){
            $intro=json_decode($str,true);
            //var_dump($intro);
            if($intro['code']==200){
                $intro=$intro['data'];
            }
        }
        //调资讯
        $url="http://www.hefei.com/public/index.php/youinfo";
        $str= file_get_contents($url);
        if($str){
            $info=json_decode($str,true);
            //var_dump($intro);
            if($info['code']==200){
                $info=$info['data'];
            }
        }

        return $this->render('index.html',array('arr'=>$arr,'intro'=>$intro,'info'=>$info));
    }
    //自助报到
    public function actionSelfreport(){
        return $this->render('self-report.html');
    }
    //绿色通道
    public function actionGreen(){
        return $this->render('green.html');
    }
    //抵校登记
    public function actionArrive(){
        return $this->render('arrive.html');
    }
    //推迟报到
    public function actionDelay(){
        return $this->render('delay.html');
    }
    //入学须知
    public function actionMustknow(){
        return $this->render('must-know.html');
    }
    //通知公告
    public function actionNotice(){
        return $this->render('notice.html');
    }
    //通知公告详情
    public function actionNoticedetail($notice_id){
        return $this->render('noticeDetail.html',array('notice_id'=>$notice_id));
    }
    //资料下载
    public function actionData(){
        return $this->render('data.html');
    }
    //下载中心
    public function actionUploadata($data_id){
        return $this->render('uploaDate.html',array('data_id'=>$data_id));
    }
    //咨询帮助
    public function actionAsk(){
        return $this->render('ask.html');
    }
    //自助入学
    public function actionEntrance(){
        return $this->render('entrance.html');
    }
    //个人中心
    public function actionUsercenter(){
        return $this->render('user-center.html');
    }
    //到校路线
    public function actionRoute(){
        return $this->render('route.html');
    }
    //常见问题
    public function actionCommonquestion(){
        return $this->render('commonquestion.html');
    }
    //咨询解答
    public function actionAnswer(){
        return $this->render('answer.html');
    }
    //我的提问
    public function actionMyanswer(){
        return $this->render('myanswer.html');
    }
    //我要提问
    public function actionTiwen(){
        return $this->render('tiwen.html');
    }
    //个人信息
    public function actionUserinfo(){
        return $this->render('user-info.html');
    }
    //修改密码
    public function actionChangepsw(){
        return $this->render('changepsw.html');
    }
    //宿舍预定
    public function actionDormbook(){
        return $this->render('dorm-book.html');
    }
    //报到单
    public function actionReportcard(){
        return $this->render('reportCard.html');
    }
    //登录
    public function actionLogin(){
        return $this->render('login.html');
    }





}

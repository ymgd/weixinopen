<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\User;
use DB;
use App\libs\response\Response;
use App\libs\jsonp\Jsonp;
use Memcache;

header('content-type:text/html;charset=utf-8');
class YouController extends Controller
{
    //查询轮播图
    public function index()
    {
        $imgs = DB::table('bannerimg')->get();
        $obj=new Response();
        return $obj->show('200','ok',$imgs) ;
        }
    //查询学校简介
    public function intro()
    {
        $intro= DB::table('introduce')->get();
        //echo $intro=json_encode($intro[0]);
        $obj=new Response();
        return $obj->show('200','ok',$intro[0]) ;
    }
    //查询学校资讯
    public function info()
    {
        $info= DB::table('information')->get();
        //echo $info=json_encode($info);
        $obj=new Response();
        return $obj->show('200','ok',$info) ;
    }
    //查询通知公告
    public function notice()
    {

        $html=$_GET['strPage'];
        $j=new Jsonp();
        echo $j->select('notice',$_GET['callback'],$html);

    }
    //查询通知公告详情
    public function noticedetail()
    {
        $notice_id=$_GET['notice_id'];
        $notice= DB::table('notice')->where('notice_id',$notice_id)->get();
        //var_dump($notice);die;
        $data=array('code'=>'200','message'=>'ok','notice'=>$notice[0]);
        $notice=json_encode($data);
        echo $_GET["callback"]."($notice)";
        /*$obj=new Response();
        $result= $obj->show('200','ok',$notice) ;*/

    }
    //基本信息添加
    public function userinfo()
    {
           $data= ['name' => $_GET['name'], 'mail' => $_GET['mail'],'telphone' => $_GET['telphone'],'phone' => $_GET['phone'],
                'mobile' => $_GET['mobile'],'touchone' => $_GET['touchone'],'relationone' => $_GET['relationone'],
                'touchtwo' => $_GET['touchtwo'],'relationtwo' => $_GET['relationtwo'],'addr' => $_GET['addr'],
                'addrdetail' => $_GET['addrdetail'],];
        $obj=new Jsonp();
        echo $obj->insert('userinfo',$data,$_GET["callback"]) ;

    }
    //宿舍预定
    public function dormbook()
    {
            $data=['xiaoqu' => $_GET['xiaoqu'], 'dongid' => $_GET['dongid'],'dormattr' => $_GET['dormattr'],
                'roomid' => $_GET['roomid'],'puid' => $_GET['puid'],];
        $obj=new Jsonp();
        echo $obj->insert('dormbook',$data,$_GET["callback"]) ;

    }
    //抵校登记
    public function arrive()
    {
           $data= ['trans' => $_GET['trans'], 'station' => $_GET['station'],'timestart' => $_GET['timestart'],
            'timearrival' => $_GET['timearrival'],'together' => $_GET['together'],'togethercount' => $_GET['togethercount'],];
        $obj=new Jsonp();
        echo $obj->insert('arrive',$data,$_GET["callback"]) ;

    }
    //绿色通道
    public function green()
    {

               $data= ['applicationtype' => $_GET['applicationtype'],
                'name' => $_GET['name'],
                'minzu' => $_GET['minzu'],
                'tel' => $_GET['tel'],
                'birth' => $_GET['birth'],
                'idnumber' => $_GET['idnumber'],
                'addrdetail' => $_GET['addrdetail'],
                'memberone' => $_GET['memberone'],
                'relationone' => $_GET['relationone'],
                'unitsone' => $_GET['unitsone'],
                'incomeone' => $_GET['incomeone'],
                'applyreason' => $_GET['applyreason'],];
        $obj=new Jsonp();
        echo $obj->insert('green',$data,$_GET["callback"]) ;

    }
    //推迟报道
    public function delay()
    {
            $data=['delaytype' => $_GET['delaytype'],
                'name' => $_GET['name'],
                'number' => $_GET['number'],
                'college' => $_GET['college'],
                'profession' => $_GET['profession'],
                'idnumber' => $_GET['idnumber'],
                'delaytime' => $_GET['delaytime'],
                'delayreason' => $_GET['delayreason'],
                ];
        $obj=new Jsonp();
        echo $obj->insert('delay',$data,$_GET["callback"]) ;

    }
    //查询入学须知
    public function mustknow()
    {
        $html=$_GET['strPage'];
        $obj=new Jsonp();
        echo $obj->select('mustknow',$_GET["callback"],$html) ;
    }
    //查询资料下载
    public function data()
    {
        $html=$_GET['strPage'];
        $obj=new Jsonp();
        echo $obj->select('data',$_GET["callback"],$html) ;
    }
    //查询资料下载详情
    public function uploadata()
    {
        $data_id=$_GET['data_id'];
        $data= DB::table('data')->where('data_id',$data_id)->get();
        $data=array('code'=>'200','message'=>'ok','data'=>$data[0]);
        $data=json_encode($data);
        echo $_GET["callback"]."($data)";

    }
    //登录
    public function login()
    {
        $name=$_GET['name'];
        $pwd=$_GET['pwd'];
        $data= DB::table('user')->where('name',$name)->where('pwd',$pwd)->get();
        if($data){
            $data=array('code'=>'200','message'=>'ok','data'=>$data[0]);
            $data=json_encode($data);
            echo $_GET["callback"]."($data)";
        }else{
            $data=array('code'=>'300','message'=>'no');
            $data=json_encode($data);
            echo $_GET["callback"]."($data)";
        }


    }
    //报告单
    public function reportcard()
    {
        $data = DB::table('user')
            ->join('dormbook', 'user.token', '=', 'dormbook.token')
            ->join('cost', 'user.token', '=', 'cost.token')
            ->where('user.token',1)
            ->get();
        $data=array('code'=>'200','message'=>'ok','data'=>$data[0]);
        $data=json_encode($data);
        echo $_GET["callback"]."($data)";

    }
    //查询常见问题
    public function commonquestion()
    {
        $html=$_GET['strPage'];
        $obj=new Jsonp();
        echo $obj->select('comquestion',$_GET["callback"],$html) ;
    }
    //查询咨询解答
    public function answer()
    {
        $html=$_GET['strPage'];
        $obj=new Jsonp();
        echo $obj->select('answer',$_GET["callback"],$html) ;
    }
    //查询我的提问
    public function myanswer()
    {
        $html=$_GET['strPage'];
        $obj=new Jsonp();
        echo $obj->select('myanswer',$_GET["callback"],$html) ;
    }
    //我要提问
    public function tiwen()
    {
            $data=['question' => $_GET['question'],
                'token' => $_GET['token'],
                'time' => $_GET['time'],
                ];
        $obj=new Jsonp();
        echo $obj->insert('myanswer',$data,$_GET["callback"]) ;

    }
    //修改密码
    public function changepsw(){


    }


}

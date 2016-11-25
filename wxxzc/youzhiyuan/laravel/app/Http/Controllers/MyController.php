<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\User;
use DB;
header('content-type:text/html;charset=utf-8');
class MyController extends Controller
{
    public function test(){
        $user=new User;
        $res= $user->all();
        return view('test',compact('res'));
    }
    public function testdel(){
        echo  $_GET['id'];die;
      //  return request::all();
        /*$user=new User;
        $user->delete()->find($id);*/
    }
    public function index(){

        return view('my_welcome');
    }
    //接口
    public function jiekou(){
        $name=$_GET['name'];
        $pwd=$_GET['pwd'];
        $token=$_GET['token'];
        $t=$_GET['t'];
        //echo $token;die;
        $sign=$_GET['sign'];

        $arr=array('name'=>$name,'pwd'=>$pwd,'token'=>$token,'t'=>$t);
        $arr=array_filter($arr);
        ksort($arr);
        //var_dump($arr);die;
        $arg  = "";
        while (list ($key, $val) = each ($arr)) {
            $arg.=$key."=".$val."&";
        }
        //去掉最后一个&字符
        $arg = substr($arg,0,count($arg)-2);

        //如果存在转义字符，那么去掉转义
        if(get_magic_quotes_gpc()){$arg = stripslashes($arg);}

        $newsign= md5($arg);
        //echo $newsign;die;

        $time=time();
        if($time-$t>=1000*120){
            echo 'time false';die;
        }

        if($newsign!=$sign){
            echo 'sign false';die;
        }
       /* if($token!='123'){
            echo 'token false';die;
        }*/
        //die;
        //echo $pwd;die;
        //return 'ok';
        /*$pdo=new PDO('mysql:host=localhost;dbname=php9','root','root');
        $data=$pdo->query("select * from zk1008user where name='$name'and pwd='$pwd'")->fetchAll(PDO::FETCH_ASSOC);
        var_dump($data);die;*/
        $users = DB::table('zk1008user')->where('name','=',$name)->where('pwd','=',$pwd)->get();
        //var_dump($users);die;
       // print_r($users);die;
        //echo json_encode($data);
        if($users){
            echo json_encode($users);
        }



        //return view('my_welcome');
    }
}

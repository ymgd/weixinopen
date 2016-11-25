<?php
namespace App\libs\jsonp;

use DB;
use Memcache;

class Jsonp
{
    /**
     * 输出通讯数据
     * * @ param inteage $callback jsonp请求
     * @ param inteage $table 表名
     * @ param inteage $html 缓存名称
     */
    //查询
    public static function select($table,$callback,$html)
    {
        $mem = new Memcache;
        $mem->connect("127.0.0.1",11211);
        $res=$mem->get($html);
        if($res){
            return $res;
        }else{
            $data = DB::table($table)->get();
            $data=array('code'=>'200','message'=>'ok',$data);
            $data=json_encode($data);
            return $res=$callback . "(" . $data . ")";
            $mem->set($html,$res);
        }


    }
    //添加
    public static function insert($table,$data,$callback)
    {
        $data=DB::table($table)->insert($data);
        $data=json_encode($data);
        return $callback . "(" . $data . ")";
    }
}
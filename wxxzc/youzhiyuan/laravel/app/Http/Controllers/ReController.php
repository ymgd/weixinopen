<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\User;
use DB;
header('content-type:text/html;charset=utf-8');
class Re extends Controller
{
    const JSON='json';
    /**
     * 综合方式方式输出通讯数据
     * @ param inteage $code 状态码
     * @ param string $message 提示信息
     * @ param array $data 数据
     * @ param string $type 数据输出类型
     * @ return string
     */
    public static function show($code,$message='',$data=array(),$type=self::JSON){
        if(!is_numeric($code)){
            echo '';exit;
        }
        $type=isset($_GET['format'])?$_GET['format']:self::JSON;
        $result=array(
            'code'=>$code,
            'message'=>$message,
            'data'=>$data
        );
        if($type=='json'){
            self::json($code,$message,$data);exit;
        }elseif($type=='array'){
            var_dump($result);exit;
        }elseif($type=='xml'){
            self::xmlEncode($code,$message,$data);exit;
        }
    }
    /**
     * 按json方式输出通讯数据
     * @ param inteage $code 状态码
     * @ param string $message 提示信息
     * @ param array $data 数据
     * @ return string
     */
    public static function json($code,$message='',$data=array()){
        if(!is_numeric($code)){
            echo '';exit;
        }
        $result=array(
            'code'=>$code,
            'message'=>$message,
            'data'=>$data
        );
        echo json_encode($result);exit;
    }
    /**
     * 按xml方式输出通讯数据
     * @ param inteage $code 状态码
     * @ param string $message 提示信息
     * @ param array $data 数据
     * @ return xml
     */
    public static function xmlEncode($code,$message='',$data=array()){
        if(!is_numeric($code)){
            echo '';exit;
        }
        $result=array(
            'code'=>$code,
            'message'=>$message,
            'data'=>$data
        );
        header("Content-Type:text/xml");
        $xml="<?xml version='1.0' encoding='UTF-8'?>";
        $xml.="<root>";
        $xml.=self::xmlToEncode($result);
        $xml.="</root>";
        echo $xml;
    }

    public static function xmlToEncode($data){
        $xml=$attr="";
        foreach($data as $key=>$val){
            if(is_numeric($key)){
                $attr="id='{$key}'";
                $key="item";
            }
            $xml.="<{$key} {$attr}>";
            $xml.=is_array($val)?self::xmlToEncode($val):$val;
            $xml.="</{$key}>";
        }
        return $xml;
    }

}

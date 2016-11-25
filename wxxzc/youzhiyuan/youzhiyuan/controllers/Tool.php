<?php

/*
*公共函数控制器
*/
namespace app\controllers;


class Tool 
{
    
 /**
 * 异位或加密
 */
   static function encrytion($val, $type=0, $key='1410a') {
	$key = md5($key);
	if ($type) {
		return   base64_encode($val ^ $key);
	}
	$val = base64_decode($val);
	return $val ^ $key;
}

  static function Test(){

        return 1;

  }






}

<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test','MyController@test');
Route::get('testdel',function(){
    $id= Input::get('id');
    //echo $id;
  /*  $user=new App\User;
    $user->testdel($id);
    $res= $user->all();*/
    $res=DB::table('zk1008user')->where('id', '=', $id)->delete();
    return view('test',['res'=>$res]);

});

Route::get('/about','MyController@getAbout');
Route::get('/jiekou','MyController@jiekou');
//查询合肥学院首页轮播图
Route::get('/you','YouController@index');
//查询合肥学院首页简介
Route::get('/youintro','YouController@intro');
//查询合肥学院首页资讯
Route::get('/youinfo','YouController@info');
//查询合肥学院通知公告
Route::get('/younotice','YouController@notice');
//查询合肥学院通知公告详情
Route::get('/younoticedetail','YouController@noticedetail');
//个人信息添加
Route::get('/youuserinfo','YouController@userinfo');
//宿舍预定添加
Route::get('/youdormbook','YouController@dormbook');
//抵校登记
Route::get('/youarrive','YouController@arrive');
//绿色通道
Route::get('/yougreen','YouController@green');
//推迟报到
Route::get('/youdelay','YouController@delay');
//入学须知
Route::get('/youmustknow','YouController@mustknow');
//资料下载
Route::get('/youdata','YouController@data');
//下载中心
Route::get('/youuploadata','YouController@uploadata');
//用户登录
Route::get('/youlogin','YouController@login');
//报告单
Route::get('/youreportcard','YouController@reportcard');
//常见问题
Route::get('/youcommonquestion','YouController@commonquestion');
//咨询解答
Route::get('/youanswer','YouController@answer');
//我的提问
Route::get('/youmyanswer','YouController@myanswer');
//我要提问
Route::get('/youtiwen','YouController@tiwen');
//修改密码
Route::get('/youchangepsw','YouController@changepsw');
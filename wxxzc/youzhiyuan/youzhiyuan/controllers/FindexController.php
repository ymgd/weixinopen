<?php
// 前台首页控制
namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use SphinxClient;
class FindexController extends Controller{
     public function actionIndex(){

     	  $arr=$this->get_cat_array();
         $open = new OtherLogin();
        // var_dump($open);die;
         $code = @$_GET['code'];
        // var_dump($code);die;
       // var_dump( $open->me($code));die;

        if ($code) {
         $session = Yii::$app->session;
         $session['email']= $open->me($code)["name"];
        }
    

      //展示最新职位
          $db=yii::$app->db;
          $data=$db->createCommand("select * from fposition join company  on fposition.cid=company.cid order by add_time desc limit 5")->queryAll();
          //print_R($data);die;
          //获取计算添加计算与当前时间的时间差
          foreach ($data as $k => $v) {
          $a = strtotime($data[$k]['add_time']);
          $b = time();
          $c = $b-$a;
          $day = floor($c/3600/24);
          if($day>0)
          {
          $d = $c-($day*3600*24);
          }
          else
          {
          $d = $c-(3600*24);
          }
          //print_R($d);die;
          $mou = floor($d/3600);
          if($mou>0)
          {
            $f = $d-($mou*3600);
          }
          else
          {
            $f=$d-3600;
          }
          $fen = floor($f/60);

       $data[$k]['jitime'] = $day."天".$mou."时".$fen."分";
     }
        //显示最热职位
       $datahot=$db->createCommand("select * from fposition join company  on fposition.cid=company.cid order by clike_num desc limit 5")->queryAll();
       //var_dump($datahot);die;  
        //获取计算添加计算与当前时间的时间差
          foreach ($datahot as $k => $v) {
          $a = strtotime($data[$k]['add_time']);
          $b = time();
          $c = $b-$a;
          $day = floor($c/3600/24);
          if($day>0)
          {
          $d = $c-($day*3600*24);
          }
          else
          {
          $d = $c-(3600*24);
          }
          //print_R($d);die;
          $mou = floor($d/3600);
          if($mou>0)
          {
            $f = $d-($mou*3600);
          }
          else
          {
            $f=$d-3600;
          }
          $fen = floor($f/60);

       $datahot[$k]['jitime'] = $day."天".$mou."时".$fen."分";
     }
             


         return $this->render('index.html',['arr'=>$arr,'data'=>$data,'datahot'=>$datahot]);



     }



  /**
     * 层次递归
     * @param  integer $pid [description]
     * @return [type]       [description]
     */
    public function get_cat_array($fid = 0) { 
     $category=(new \yii\db\Query())->select(['pid','fname','fid'])->from('position_fid')->all();  
     $arr = array(); 
     foreach($category as $index => $row){ 
     // 对每个分类进行循环。 
     if($category[$index]['fid'] == $fid){
      //如果有子类 
      $row['child'] = $this->get_cat_array($category[$index]['pid']); 
      //调用函数，传入参数，继续查询下级 
      $arr[] = $row; //组合数组
       }
        } 
        return $arr; 
     }


 //采用sphinx进行搜索
       public function actionSearch(){
         //判断是否是POST提交  
          if(\Yii::$app->request->isPost){  
              $usearch = \Yii::$app->request->post('usearch');
               // var_dump($usearch);die;
          include'sphinxapi.php'; //包含sphinxapi类
          $sphinx= new SphinxClient(); //实例化
          $sphinx->SetServer('127.0.0.1',9312);//链接
            //SPH_MATCH_ALL匹配所有查询词（默认模式）  
            $sphinx->SetMatchMode ( SPH_MATCH_ALL);  
            //匹配查询词中的任意一个  
            $sphinx->SetMatchMode ( SPH_MATCH_ANY);  
            //将整个查询看作一个词组，要求按顺序完整匹配  
            $sphinx->SetMatchMode ( SPH_MATCH_PHRASE);   

          $res=$sphinx->Query("$usearch","*");//查询的字段第二参数是你配置文件里面写得规则这里是*就会匹配所有规则
           // var_dump($res["matches"]);die;

            //判断键值是否存在  
        if(!array_key_exists("matches",$res)){  
                exit("没有检索到您需要的信息");  
            }  

                        // 1.Matches中就是查询的结果了，但是仿佛不是我们想要的数据。  
            // 2.根据官方的说明是Sphinx并没有连接到MySQL去取数据，只是根据它自己的索引内容进行计算;  
            // 3.因此如果想用Sphinx提供的API去取得我们想要的数据，还必须以查询的结果为依据(也就是ID为依据);  
            // 4.根据ID再次查询MySQL从而得到我们想要的数据。  
            //获取主键 （这里的主键就是数据在数据库中的自增ID） 通过ID在根据数据库 查询出数据  
            $key = array_keys($res['matches']); 
            //var_dump($key);die; 
            //把数组元素组合为一个字符串  
              $key=implode(',',$key);
            //$key = join(',',$key);
             // var_dump($key);die;   
            //根据获取到的ID在查询数据库  
              $db=yii::$app->db;
              $data=$db->createCommand("select * from fposition join company  on fposition.cid=company.cid where pos_id in ($key)")->queryAll();
             //var_dump($data);die;
             //获取计算添加计算与当前时间的时间差
                foreach ($data as $k => $v) {
                $a = strtotime($data[$k]['add_time']);
                $b = time();
                $c = $b-$a;
                $day = floor($c/3600/24);
                if($day>0)
                {
                $d = $c-($day*3600*24);
                }
               
                $data[$k]['jitime'] = $day."天前发布";
                 }
               // var_dump($data);die;
             return $this->render('list.html',['data'=>$data,'usearch'=>$usearch]);
            //$query = new \yii\db\Query();  
            //使用框架中的in 哈希格式 来检索  
           // $blogInfo = $query->from(['b'=>'ex_blog','bt'=>'ex_blog_type'])->where(['id'=>[$key]])->all(); 
              //var_dump($blogInfo);die;
            //将数组转换为Json类型  
            //echo json_encode($blogInfo);  


         }else{
          echo "非法提交";
         }





     } 
        















}




?>
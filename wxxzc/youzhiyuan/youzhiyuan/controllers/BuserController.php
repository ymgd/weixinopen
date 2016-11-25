<?php

/*
*后台主页控制器
*/
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\data\Pagination;


class BuserController extends BcommonController
{
    
    // 后台展示
    public function actionIndex()
    {
        return $this->render('index');
    }

   // 后台企业招聘管理
    public function actionShow()
    {

    
       
         $db=Yii::$app->db;
        $sql="select cname,pname,fname,delivery_time, ctel from position p inner join  position_fid   f  on  p.fid=f.pid inner join  company c on  p.cid=c.cid order by delivery_time desc ";
      

        $pagination = new Pagination([
            'defaultPageSize' => 2,
            'totalCount' => $db->createCommand($sql)->query()->rowCount,
        ]); 
       $offset=$pagination->offset;
       $limit=$pagination->limit;
        $sql1=$sql."limit ".$offset.",".$limit;
       $countries=$db->createCommand($sql1)->queryall();
        return $this->render('show', [
            'countries' => $countries,
            'pagination' => $pagination,
        ]);
    }

      


    // 后台用户简历管理
    public function actionJl()
    {

        $db=Yii::$app->db;
        $sql="select username,user_des,sex,age,w.company,time,w.position from user u inner join user_info f on  u.id=f.uid inner join  work_exp w on  f.uid=w.wid ";
        $pagination = new Pagination([
            'defaultPageSize' => 2,
            'totalCount' => $db->createCommand($sql)->query()->rowCount,
        ]);
        $offset=$pagination->offset;
        $limit=$pagination->limit;
        $sql1=$sql."limit ".$offset.",".$limit;
        $countries=$db->createCommand($sql1)->queryall();
        return $this->render('jqgrid.html', [
            'res' => $countries,
            'pages' => $pagination,
        ]);
    }



/*
*生成excel表格
*/

    public function actionExcel(){  

                // echo dirname(__FILE__);die;
             
               ob_end_clean();  
                              // 下载的数据
                 $db=Yii::$app->db;
                 $sql="select cname,pname,fname,delivery_time, ctel from position p inner join  position_fid   f  on  p.fid=f.pid inner join  company c on  p.cid=c.cid order by delivery_time desc ";        
                 $data=$db->createCommand($sql)->queryall();
                /** PHPExcel */  
                // Yii::import('application.vendors.*');  

                // echo dirname(dirname(__FILE__)).'/vendor/PHPExcel/PHPExcel.php';die;
                include_once(dirname(dirname(__FILE__)).'/vendor/PHPExcel/PHPExcel.php');  
                include_once(dirname(dirname(__FILE__)).'/vendor/PHPExcel/PHPExcel/Writer/Excel2007.php');  
                  $objPHPExcel = new \ PHPExcel();
                  $sheet = $objPHPExcel->getActiveSheet(); 
                  $sheet->getColumnDimension('A')->setWidth(20); 
                  $sheet->getColumnDimension('B')->setWidth(20); 
                  $sheet->getColumnDimension('C')->setWidth(20); 
                  $sheet->getColumnDimension('D')->setWidth(20); 
                  $sheet->getColumnDimension('E')->setWidth(20); 
                  $objPHPExcel->getProperties()->setCreator("Maarten Balliauw")  
                                             ->setLastModifiedBy("Maarten Balliauw")  
                                             ->setTitle("Office 2007 XLSX Test Document")  
                                             ->setSubject("Office 2007 XLSX Test Document")  
                                             ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")  
                                             ->setKeywords("office 2007 openxml php")  
                                             ->setCategory("Test result file");  
                  
                   $objPHPExcel->setActiveSheetIndex(0)  
                            ->setCellValue('A1', '招聘职位')  
                            ->setCellValue('B1', '所属分类')  
                            ->setCellValue('C1', '发布公司')  
                            ->setCellValue('D1', '公司电话')  
                            ->setCellValue('E1', '发布时间');  
                if(!empty($data)){  
                    $i =2;  
                    foreach ($data as  $one){  

                        $objPHPExcel->setActiveSheetIndex(0)  
                            ->setCellValue("A$i", $one['pname'])  
                            ->setCellValue("B$i", $one['fname'])  
                            ->setCellValue("C$i", $one['cname'])  
                            ->setCellValue("D$i", $one['ctel'])  
                            ->setCellValue("E$i", $one['delivery_time']);  
                       $i++;          
                    }  
                }   
       
                $objPHPExcel->getActiveSheet()->setTitle('企业资料');  
                $objPHPExcel->setActiveSheetIndex(0);  
            //  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');  
               //$objWriter->save(str_replace('.php', '.xlsx', __FILE__));  
                $objWriter = new  \ PHPExcel_Writer_Excel5($objPHPExcel); 
               // var_dump($objWriter);die;
                    // header("Pragma: public");  
                   // header("Expires: 0");  
                   // header('Content-Type: application/vnd.ms-excel;charset=utf8');  
                   // header("Cache-Control:must-revalidate, post-check=0, pre-check=0");  
                   // header("Content-Type:application/force-download");  
                   // header("Content-Type:application/vnd.ms-execl");  
                // header("Content-Type:application/octet-stream");  
                  // header("Content-Type:application/download");  
                $fireName ="/zl".rand(100,1000).'.xls';  
                 // header("Content-Disposition:attachment;filename=test.xls");  
                //header("Content-Transfer-Encoding:binary");  
                  $dir_path =dirname(dirname(__FILE__)).'/data'.$fireName; 
                 $download="http://localhost/sixgroup/data".$fireName;
                  $objWriter->save($dir_path);
                  // var_dump($objSave);die; 
                  // header('Location:'.$download);

                  $res=['sta'=>'0','res'=>'失败','url'=>''];
                  if (file_exists($dir_path)) {
                    $res['sta']=1;
                    $res['res']='成功';
                    $res['url']=$fireName;
                    echo   json_encode($res);die;
                          }else{
                         $res['sta']=0;
                        $res['res']='失败';
                        $res['url']='';
                     echo   json_encode($res);die;   
                          }
                        die;
               // spl_autoload_register(array('YiiBase','autoload'));  
        }  


}

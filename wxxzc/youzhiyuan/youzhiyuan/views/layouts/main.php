<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>

<?php $this->beginBody() ?>

<?php


     $name = Yii::$app->controller->id;

     //控制器判断函数 
  function judge($haystack, $needle) {
    //防止$needle 位于开始的位置
   $haystack = '-_-!' . $haystack;
   return (bool)strpos($haystack, $needle);
   } 
  

       if (judge($name,'b')) {
            
            if (!judge( $name,'blog') ) {


        include 'header.php';
             }


       }else if(judge($name,'f')){


if (!judge( $name,'flog')  ) {

    if(!judge( $name,'freg')){
        include 'fheader.php';

    }

}


       }

?>


      
        <?= $content





        ?>


</div>




<?php $this->endBody() ?>

<?php $this->endPage() ?>
